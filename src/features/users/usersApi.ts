import { baseApi } from '@/services/baseApi';

type Envelope<T> = { data: T };
export interface PublicUser { id: string; username: string; email: string; role: string | null }
export interface UserInput { username: string; email: string; password: string; firstName: string; lastName: string }
export type AdminUserInput = UserInput & (
  { roleCode: 'PHARMACIST'; pharmacyId: string } |
  { roleCode: 'ADMIN' | 'CUSTOMER'; pharmacyId?: null }
);
export const usersApi = baseApi.enhanceEndpoints({ addTagTypes: ['Users'] }).injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<PublicUser, string>({
      query: id => '/users/' + encodeURIComponent(id),
      transformResponse: (r: Envelope<PublicUser>) => r.data,
      providesTags: ['Users'],
    }),
    createUser: builder.mutation<PublicUser, AdminUserInput>({
      query: body => ({ url: '/users', method: 'POST', body }),
      transformResponse: (r: Envelope<PublicUser>) => r.data,
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<PublicUser, { id: string; body: Partial<UserInput> }>({
      query: ({ id, body }) => ({ url: '/users/' + encodeURIComponent(id), method: 'PUT', body }),
      transformResponse: (r: Envelope<PublicUser>) => r.data,
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<null, string>({
      query: id => ({ url: '/users/' + encodeURIComponent(id), method: 'DELETE' }),
      transformResponse: (r: Envelope<null>) => r.data,
      invalidatesTags: ['Users'],
    }),
  }),
});
export const { useGetUserQuery, useLazyGetUserQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = usersApi;
