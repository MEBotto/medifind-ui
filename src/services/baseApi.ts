import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { clearSession, setSession } from '@/features/auth/authSlice';
import type { AuthState, Session } from '@/features/auth/authSlice';

const rawQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { auth: AuthState }).auth.session?.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});
type Query = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;
const current = (api: Parameters<Query>[1]) => (api.getState() as { auth: AuthState }).auth.session;
let refreshing: Promise<boolean> | undefined;

function refresh(api: Parameters<Query>[1], options: Parameters<Query>[2], token: string): Promise<boolean> {
  if (!refreshing) {
    const run = async () => {
      if (current(api)?.token !== token) return false;
      const controller = new AbortController();
      const result = await rawQuery({ url: '/auth/refresh', method: 'POST' }, { ...api, signal: controller.signal, abort: () => controller.abort() }, options);
      if (current(api)?.token !== token) return false;
      if (result.data) {
        const data = (result.data as { data?: Session }).data;
        if (data?.token && data.user?.id === current(api)?.user.id) {
          api.dispatch(setSession(data));
          return true;
        }
      }
      if (result.error?.status === 401 || result.error?.status === 403) {
        api.dispatch(clearSession());
        api.dispatch(baseApi.util.resetApiState());
      }
      return false;
    };
    refreshing = Promise.resolve(typeof navigator !== 'undefined' && navigator.locks
      ? navigator.locks.request('medifind-auth', run)
      : run()).finally(() => { refreshing = undefined; });
  }
  return refreshing;
}

const baseQuery: Query = async (args, api, options) => {
  const session = current(api);
  const result = await rawQuery(args, api, options);
  if (result.error?.status !== 401 || !session || ['login', 'register', 'refresh', 'logout'].includes(api.endpoint)) return result;
  const latest = current(api);
  if (!latest || latest.user.id !== session.user.id) return result;
  if (latest.token === session.token && !await refresh(api, options, session.token)) return result;
  if (api.signal.aborted || current(api)?.user.id !== session.user.id) return result;
  return rawQuery(args, api, options);
};
export const baseApi = createApi({ reducerPath: 'api', baseQuery, endpoints: builder => ({
  renewSession: builder.mutation<boolean, void>({
    queryFn: async (_arg, api, options) => {
      const token = current(api)?.token;
      return { data: token ? await refresh(api, options, token) : false };
    },
  }),
}) });
