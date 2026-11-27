import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser { id: string; username: string; email: string; role: string | null }
export interface Session { user: AuthUser; token: string }
export interface AuthState { session: Session | null }
export function tokenExpiry(token: string): number {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const exp = JSON.parse(atob(payload)).exp;
    return typeof exp === 'number' && Number.isFinite(exp) ? exp * 1000 : 0;
  } catch { return 0; }
}
const initialState: AuthState = { session: null };
const slice = createSlice({
  name: 'auth', initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session>) => { state.session = action.payload; },
    clearSession: state => { state.session = null; },
  },
});
export const { setSession, clearSession } = slice.actions;
export default slice.reducer;
