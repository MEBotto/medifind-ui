import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { clearSession, setSession, tokenExpiry, type Session } from './authSlice';
import { baseApi } from '@/services/baseApi';

let restoration: Promise<Session | null> | undefined;
function restore() {
  if (!restoration) {
    const run = async () => {
      const response = await fetch((import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '') + '/auth/refresh', {
        method: 'POST', credentials: 'include', signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) return null;
      const body = await response.json() as { data: Session };
      return body.data;
    };
    restoration = (navigator.locks ? navigator.locks.request('medifind-auth', run) : run()).catch(() => null);
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
    // Expired access tokens are renewed by the shared API client on demand.
    // Clear malformed tokens rather than sending them to the server.
    if (!tokenExpiry(session.token)) {
      dispatch(clearSession());
      dispatch(baseApi.util.resetApiState());
    }
  }, [session, dispatch]);
  return null;
}
