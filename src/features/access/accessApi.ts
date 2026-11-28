import { baseApi } from '@/services/baseApi';

type Envelope<T> = { data: T };
export interface Role { id: string; code: string; name: string | null; description: string | null }
export interface Permission { id: string; code: string; name: string | null; description: string | null }
export interface RoleInput { code: string; name: string; description?: string }
export interface PermissionInput { code: string; name?: string; description?: string }
export interface RolePermission { id: string; role?: Role; permission?: Permission }

export const accessApi = baseApi.enhanceEndpoints({ addTagTypes: ['Roles', 'Permissions', 'RolePermissions'] }).injectEndpoints({
  endpoints: builder => ({
    getRoles: builder.query<Role[], void>({
      query: () => '/roles',
      transformResponse: (r: Envelope<Role[]>) => r.data,
      providesTags: ['Roles'],
    }),
    getRole: builder.query<Role, string>({
      query: id => '/roles/' + encodeURIComponent(id),
      transformResponse: (r: Envelope<Role>) => r.data,
      providesTags: ['Roles'],
    }),
    createRole: builder.mutation<Role, RoleInput>({
      query: body => ({ url: '/roles', method: 'POST', body }),
      transformResponse: (r: Envelope<Role>) => r.data,
      invalidatesTags: ['Roles'],
    }),
    updateRole: builder.mutation<Role, { id: string; body: Partial<Omit<RoleInput, 'code'>> }>({
      query: ({ id, body }) => ({ url: '/roles/' + encodeURIComponent(id), method: 'PUT', body }),
      transformResponse: (r: Envelope<Role>) => r.data,
      invalidatesTags: ['Roles', 'RolePermissions'],
    }),
    deleteRole: builder.mutation<null, string>({
      query: id => ({ url: '/roles/' + encodeURIComponent(id), method: 'DELETE' }),
      transformResponse: (r: Envelope<null>) => r.data,
      invalidatesTags: ['Roles', 'RolePermissions'],
    }),
    getPermissions: builder.query<Permission[], void>({
      query: () => '/permissions',
      transformResponse: (r: Envelope<Permission[]>) => r.data,
      providesTags: ['Permissions'],
    }),
    getPermission: builder.query<Permission, string>({
      query: id => '/permissions/' + encodeURIComponent(id),
      transformResponse: (r: Envelope<Permission>) => r.data,
      providesTags: ['Permissions'],
    }),
    createPermission: builder.mutation<Permission, PermissionInput>({
      query: body => ({ url: '/permissions', method: 'POST', body }),
      transformResponse: (r: Envelope<Permission>) => r.data,
      invalidatesTags: ['Permissions'],
    }),
    updatePermission: builder.mutation<Permission, { id: string; body: Partial<Omit<PermissionInput, 'code'>> }>({
      query: ({ id, body }) => ({ url: '/permissions/' + encodeURIComponent(id), method: 'PUT', body }),
      transformResponse: (r: Envelope<Permission>) => r.data,
      invalidatesTags: ['Permissions', 'RolePermissions'],
    }),
    deletePermission: builder.mutation<null, string>({
      query: id => ({ url: '/permissions/' + encodeURIComponent(id), method: 'DELETE' }),
      transformResponse: (r: Envelope<null>) => r.data,
      invalidatesTags: ['Permissions', 'RolePermissions'],
    }),
    getRolePermission: builder.query<RolePermission, string>({
      query: id => '/rolepermissions/' + encodeURIComponent(id),
      transformResponse: (r: Envelope<RolePermission>) => r.data,
      providesTags: ['RolePermissions'],
    }),
    deleteRolePermission: builder.mutation<null, string>({
      query: id => ({ url: '/rolepermissions/' + encodeURIComponent(id), method: 'DELETE' }),
      transformResponse: (r: Envelope<null>) => r.data,
      invalidatesTags: ['RolePermissions', 'Roles', 'Permissions'],
    }),
  }),
});
export const {
  useGetRolesQuery, useLazyGetRolesQuery, useGetRoleQuery, useCreateRoleMutation, useUpdateRoleMutation, useDeleteRoleMutation,
  useGetPermissionsQuery, useLazyGetPermissionsQuery, useGetPermissionQuery, useCreatePermissionMutation, useUpdatePermissionMutation, useDeletePermissionMutation,
  useGetRolePermissionQuery, useDeleteRolePermissionMutation,
} = accessApi;
