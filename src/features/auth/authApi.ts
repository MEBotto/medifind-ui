import { baseApi } from '@/services/baseApi';
import type { Session } from './authSlice';

interface LoginInput { email: string; password: string }
interface RegisterInput extends LoginInput { username: string; firstName: string; lastName: string }
interface AuthResponse { status: 'success'; data: Session }
export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<Session, LoginInput>({
      query: body => ({ url: '/auth/login', method: 'POST', body }),
      transformResponse: (response: AuthResponse) => response.data,
    }),
    register: builder.mutation<Session, RegisterInput>({
      query: body => ({ url: '/auth/register', method: 'POST', body }),
      transformResponse: (response: AuthResponse) => response.data,
    }),
  }),
});
export const { useLoginMutation, useRegisterMutation } = authApi;
export function authError(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    if (error.status === 401) return 'Credenciales incorrectas';
    if (error.status === 'FETCH_ERROR' || error.status === 'TIMEOUT_ERROR') return 'No se pudo conectar con el servidor';
    if (error.status === 409) return 'La cuenta ya existe';
    if (error.status === 400) return 'Revisá los datos ingresados';
  }
  return 'No se pudo completar la operación. Intentá nuevamente.';
}
