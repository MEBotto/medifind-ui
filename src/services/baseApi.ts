import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { clearSession } from '@/features/auth/authSlice';
import type { AuthState } from '@/features/auth/authSlice';

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
const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, options) => {
  const token = (api.getState() as { auth: AuthState }).auth.session?.token;
  const result = await rawQuery(args, api, options);
  if (result.error?.status === 401 && token && api.endpoint !== 'login' && api.endpoint !== 'register' &&
      (api.getState() as { auth: AuthState }).auth.session?.token === token) {
    api.dispatch(clearSession());
    api.dispatch(baseApi.util.resetApiState());
  }
  return result;
};
export const baseApi = createApi({ reducerPath: 'api', baseQuery, endpoints: () => ({}) });
