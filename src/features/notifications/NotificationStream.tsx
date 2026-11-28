import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { notificationsApi } from './notificationsApi';

export default function NotificationStream() {
  const token = useAppSelector(state => state.auth.session?.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    let timer: number | undefined;
    let delay = 1000;
    const invalidate = () => dispatch(notificationsApi.util.invalidateTags(['Notifications']));
    const connect = async () => {
      try {
        const response = await fetch(
          (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '') + '/notifications/stream',
          { headers: { Authorization: 'Bearer ' + token, Accept: 'text/event-stream' },
            credentials: 'include', signal: controller.signal },
        );
        if (response.status === 401 || response.status === 403) return;
        if (!response.ok || !response.body) throw new Error('Notification stream unavailable');
        if (controller.signal.aborted) return;
        invalidate();
        delay = 1000;
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        try {
          while (!controller.signal.aborted) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            let boundary: number;
            while ((boundary = buffer.indexOf('\n\n')) !== -1) {
              const event = buffer.slice(0, boundary);
              buffer = buffer.slice(boundary + 2);
              if (event.split('\n').includes('event: notification:new') && !controller.signal.aborted) invalidate();
            }
            if (buffer.length > 65536) throw new Error('Invalid notification stream');
          }
        } finally {
          await reader.cancel().catch(() => undefined);
          reader.releaseLock();
        }
      } catch {
        // Reconnect after transient network failures.
      }
      if (!controller.signal.aborted) {
        timer = window.setTimeout(() => { void connect(); }, delay);
        delay = Math.min(delay * 2, 30000);
      }
    };
    void connect();
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [token, dispatch]);
  return null;
}
