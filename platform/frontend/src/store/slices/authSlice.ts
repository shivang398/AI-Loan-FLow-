import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'ADMIN' | 'RM' | 'OPERATIONS' | 'TEAM_LEADER' | 'CONNECTOR' | 'PARTNER_MANAGER';

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

// Remove any legacy tokens left in localStorage from previous sessions
localStorage.removeItem('token');
localStorage.removeItem('refreshToken');

// Restore session from sessionStorage (cleared on tab/browser close)
const storedToken = (() => {
  try { return sessionStorage.getItem('token') || null; } catch { return null; }
})();
const storedUser = (() => {
  try {
    const raw = localStorage.getItem('user');
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
      localStorage.setItem('user', JSON.stringify(user));
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
      localStorage.removeItem('user');
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
