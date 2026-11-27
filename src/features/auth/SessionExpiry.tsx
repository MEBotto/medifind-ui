import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { clearSession, tokenExpiry } from './authSlice';
import { baseApi } from '@/services/baseApi';
export default function SessionExpiry() {
  const token = useAppSelector(state => state.auth.session?.token);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!token) return;
    const expire = () => { dispatch(clearSession()); dispatch(baseApi.util.resetApiState()); };
    const remaining = tokenExpiry(token) - Date.now();
    if (remaining <= 0) { expire(); return; }
    const timer = window.setTimeout(expire, remaining);
    return () => window.clearTimeout(timer);
  }, [token, dispatch]);
  return null;
}
