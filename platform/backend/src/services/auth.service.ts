import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { authDb } from '../config/prisma';
import { revokeToken, isTokenRevoked, setPasswordResetToken, getPasswordResetEmail, deletePasswordResetToken } from '../config/redis';

const JWT_SECRET = () => process.env.JWT_SECRET!;
const JWT_EXPIRY_MS = () => parseInt(process.env.JWT_EXPIRY_MS ?? '900000');

function signToken(userId: string, email: string, roles: string): string {
  const jti = uuidv4();
  return jwt.sign({ sub: email, id: userId, roles, jti }, JWT_SECRET(), {
    algorithm: 'HS256',
    expiresIn: Math.floor(JWT_EXPIRY_MS() / 1000),
  });
}

export async function registerUser(email: string, password: string, roleName: string) {
  const existingUser = await authDb.user.findUnique({ where: { email } });
  if (existingUser) throw Object.assign(new Error('Email already registered'), { status: 409 });

  // Upsert role so valid platform roles are auto-created on first use
  const VALID_ROLES = ['ADMIN', 'PARTNER_MANAGER', 'RM', 'TEAM_LEADER', 'CONNECTOR', 'OPERATIONS', 'TELECALLER'];
  if (!VALID_ROLES.includes(roleName))
    throw Object.assign(new Error(`Invalid role: ${roleName}`), { status: 400 });
  const role = await authDb.role.upsert({
    where: { name: roleName },
    update: {},
    create: { id: uuidv4(), name: roleName },
  });

  const passwordHash = await bcrypt.hash(password, 12);
  const userId = uuidv4();

  await authDb.user.create({
    data: {
      id: userId,
      email,
      passwordHash,
      status: 'ACTIVE',
      createdAt: new Date(),
      userRoles: { create: { roleId: role.id } },
    },
  });

  return { userId, email };
}

export async function authenticateUser(email: string, password: string, ip?: string) {
  const user = await authDb.user.findUnique({
    where: { email },
    include: { userRoles: { include: { role: true } } },
  });

  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    throw Object.assign(new Error('Account is locked. Try again later.'), { status: 423 });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    const attempts = user.failedLoginAttempts + 1;
    const lockedUntil = attempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null;
    await authDb.user.update({ where: { id: user.id }, data: { failedLoginAttempts: attempts, lockedUntil } });
    throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  }

  if (user.status !== 'ACTIVE') {
    throw Object.assign(new Error('Account is not active'), { status: 403 });
  }

  await authDb.user.update({ where: { id: user.id }, data: { failedLoginAttempts: 0, lockedUntil: null } });

  const roles = user.userRoles.map((ur) => ur.role.name).join(',');
  const token = signToken(user.id, email, roles);

  await authDb.auditLog.create({
    data: { id: uuidv4(), userId: user.id, action: 'LOGIN', ipAddress: ip, createdAt: new Date() },
  });

  return { token, role: user.userRoles[0]?.role.name ?? '', email, id: user.id };
}

export async function refreshToken(existingToken: string) {
  try {
    const secret = JWT_SECRET();
    let payload: { sub: string; roles: string; jti: string };
    try {
      payload = jwt.verify(existingToken, secret, { algorithms: ['HS256'] }) as typeof payload;
    } catch (err) {
      if ((err as { name: string }).name !== 'TokenExpiredError') throw err;
      payload = jwt.decode(existingToken) as typeof payload;
      const decoded = jwt.decode(existingToken, { complete: true }) as { payload: { exp: number } } | null;
      if (!decoded) throw new Error('Malformed token');
      const expiredMs = decoded.payload.exp * 1000;
      if (Date.now() - expiredMs > 5 * 60 * 1000) {
        throw Object.assign(new Error('Refresh window expired'), { status: 401 });
      }
    }

    if (payload.jti && (await isTokenRevoked(payload.jti))) {
      throw Object.assign(new Error('Token has been revoked'), { status: 401 });
    }

    const user = await authDb.user.findUnique({
      where: { email: payload.sub },
      include: { userRoles: { include: { role: true } } },
    });
    if (!user) throw Object.assign(new Error('User not found'), { status: 401 });

    const roles = user.userRoles.map((ur) => ur.role.name).join(',');
    const newToken = signToken(user.id, payload.sub, roles);
    return { token: newToken, role: user.userRoles[0]?.role.name ?? '', email: payload.sub };
  } catch (err: unknown) {
    if ((err as { status?: number }).status) throw err;
    throw Object.assign(new Error('Invalid token'), { status: 401 });
  }
}

export async function revokeAccessToken(token: string) {
  try {
    const decoded = jwt.decode(token, { complete: true }) as { payload: { jti: string; exp: number } } | null;
    if (decoded?.payload.jti) {
      await revokeToken(decoded.payload.jti, decoded.payload.exp * 1000);
    }
  } catch { /* ignore malformed token */ }
}

export async function lookupUserByEmail(email: string) {
  const user = await authDb.user.findUnique({
    where: { email },
    include: { userRoles: { include: { role: true } } },
  });
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  return { id: user.id, email: user.email, role: user.userRoles[0]?.role.name ?? '', status: user.status };
}

export async function updateUserStatus(userId: string, status: string) {
  const user = await authDb.user.findUnique({ where: { id: userId } });
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  await authDb.user.update({ where: { id: userId }, data: { status, updatedAt: new Date() } });
}

export async function forgotPassword(email: string) {
  const user = await authDb.user.findUnique({ where: { email } });
  if (!user) return; // silent — prevent email enumeration
  const token = uuidv4();
  await setPasswordResetToken(token, email);
  // TODO: send reset link via SMTP — token must never be logged
  console.log(`[Auth] Password reset requested for user ${user.id}`);
}

export async function resetPassword(token: string, newPassword: string) {
  const email = await getPasswordResetEmail(token);
  if (!email) throw Object.assign(new Error('Invalid or expired reset token'), { status: 400 });
  const user = await authDb.user.findUnique({ where: { email } });
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  const passwordHash = await bcrypt.hash(newPassword, 12);
  await authDb.user.update({ where: { id: user.id }, data: { passwordHash, updatedAt: new Date() } });
  await deletePasswordResetToken(token);
}

export async function getCurrentUser(email: string) {
  const user = await authDb.user.findUnique({
    where: { email },
    include: { userRoles: { include: { role: true } } },
  });
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  return { id: user.id, email: user.email, status: user.status, roles: user.userRoles.map((ur) => ur.role.name) };
}
