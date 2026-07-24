import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'ADMIN' | 'RM' | 'OPERATIONS' | 'TEAM_LEADER' | 'CONNECTOR' | 'PARTNER_MANAGER' | 'TELECALLER' | 'CREDIT_BUREAU';

interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;   // access token — stored in sessionStorage, cleared on tab close
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Remove legacy tokens and any stale user with a non-allowed email domain
localStorage.removeItem('token');
localStorage.removeItem('refreshToken');
try {
  const _u = localStorage.getItem('user');
  if (_u) {
    const _parsed = JSON.parse(_u);
    const _domain = (_parsed?.email ?? '').split('@')[1]?.toLowerCase();
    if (_domain !== 'realmoneygroups.in' && _domain !== 'realfinserv.com') {
      localStorage.removeItem('user');
    }
  }
} catch { localStorage.removeItem('user'); }

// Restore session from sessionStorage (cleared on tab/browser close)
const storedToken = (() => {
  try { return sessionStorage.getItem('token') || null; } catch { return null; }
})();
const storedUser = (() => {
  try {
    const raw = sessionStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
})();

const initialState: AuthState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!(storedToken && storedUser),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      // user metadata in sessionStorage (cleared on tab close) — not localStorage (HIGH-3/LOW-4)
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', token);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      sessionStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCredentials, setToken, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
