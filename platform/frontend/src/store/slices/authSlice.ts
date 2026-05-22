import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'ADMIN' | 'RM' | 'OPERATIONS' | 'TEAM_LEADER' | 'CONNECTOR';

interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;   // access token — kept in memory only, never persisted
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Restore only non-sensitive user profile from localStorage (no tokens)
const storedUser = (() => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

// Remove any legacy tokens left in localStorage from previous sessions
localStorage.removeItem('token');
localStorage.removeItem('refreshToken');

const initialState: AuthState = {
  user: storedUser,
  token: null,         // always starts null; obtained via /auth/refresh on page load
  isAuthenticated: false,
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
      state.token = token;           // memory only
      state.isAuthenticated = true;
      // Persist only the non-sensitive user profile
      localStorage.setItem('user', JSON.stringify(user));
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
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
