import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { clearSession, setSession, tokenExpiry, type Session } from './authSlice';
import { baseApi } from '@/services/baseApi';

let restoration: Promise<Session | null> | undefined;
function restore(): Promise<Session | null> {
  if (!restoration) {
    const run = async () => {
      const response = await fetch((import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '') + '/auth/refresh', {
        method: 'POST', credentials: 'include', signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) return null;
      const body = await response.json() as { data: Session };
      return body.data;
    };
    restoration = Promise.resolve(navigator.locks ? navigator.locks.request('medifind-auth', async () => await run()) : run()).catch(() => null);
  }
  return restoration;
}

export default function SessionExpiry() {
  const { session, initialized } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (initialized) return;
    let active = true;
    void restore().then(data => {
      if (!active) return;
      if (data?.token && data.user?.id) dispatch(setSession(data));
      else dispatch(clearSession());
    });
    return () => { active = false; };
  }, [initialized, dispatch]);
  useEffect(() => {
    if (!session) return;
    const expiry = tokenExpiry(session.token);
    if (!expiry) {
      dispatch(clearSession());
      dispatch(baseApi.util.resetApiState());
      return;
    }
    let active = true;
    let timer: number;
    const renew = async () => {
      const request = dispatch(baseApi.endpoints.renewSession.initiate(undefined, { track: false }));
      const result = await request.unwrap().catch(() => false);
      if (active && !result) timer = window.setTimeout(renew, 30000);
    };
    timer = window.setTimeout(renew, Math.max(0, expiry - Date.now() - 60000));
    return () => { active = false; window.clearTimeout(timer); };
  }, [session, dispatch]);
  return null;
}
