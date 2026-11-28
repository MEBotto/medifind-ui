import { baseApi } from '@/services/baseApi';

type Envelope<T> = { data: T };
export type Category = { id: string } & { name: string | null };
export type CategoryInput = { name?: string };
export type Laboratory = { id: string } & { name: string | null };
export type LaboratoryInput = { name?: string };
export type MedicalInsurance = { id: string } & { description: string | null };
export type MedicalInsuranceInput = { description?: string };
export type InsurancePlan = { id: string } & { description: string | null; active: boolean | null; medicalInsurance?: MedicalInsurance | null };
export type InsurancePlanInput = { description?: string; active?: boolean; idMedicalInsurance?: string | null };

export const masterDataApi = baseApi.enhanceEndpoints({ addTagTypes: ['Category', 'Laboratory', 'MedicalInsurance', 'InsurancePlan'] }).injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<Category[], void>({
      query: () => '/categorys',
      transformResponse: (response: Envelope<Category[]>) => response.data,
      providesTags: ['Category'],
      keepUnusedDataFor: 300,
    }),
    getCategory: builder.query<Category, string>({
      query: id => '/categorys/' + encodeURIComponent(id),
      transformResponse: (response: Envelope<Category>) => response.data,
      providesTags: ['Category'],
    }),
    createCategory: builder.mutation<Category, CategoryInput>({
      query: body => ({ url: '/categorys', method: 'POST', body }),
      transformResponse: (response: Envelope<Category>) => response.data,
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation<Category, { id: string; body: CategoryInput }>({
      query: ({ id, body }) => ({ url: '/categorys/' + encodeURIComponent(id), method: 'PUT', body }),
      transformResponse: (response: Envelope<Category>) => response.data,
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation<null, string>({
      query: id => ({ url: '/categorys/' + encodeURIComponent(id), method: 'DELETE' }),
      transformResponse: (response: Envelope<null>) => response.data,
      invalidatesTags: ['Category'],
    }),
    getLaboratories: builder.query<Laboratory[], void>({
      query: () => '/laboratorys',
      transformResponse: (response: Envelope<Laboratory[]>) => response.data,
      providesTags: ['Laboratory'],
      keepUnusedDataFor: 300,
    }),
    getLaboratory: builder.query<Laboratory, string>({
      query: id => '/laboratorys/' + encodeURIComponent(id),
      transformResponse: (response: Envelope<Laboratory>) => response.data,
      providesTags: ['Laboratory'],
    }),
    createLaboratory: builder.mutation<Laboratory, LaboratoryInput>({
      query: body => ({ url: '/laboratorys', method: 'POST', body }),
      transformResponse: (response: Envelope<Laboratory>) => response.data,
      invalidatesTags: ['Laboratory'],
    }),
    updateLaboratory: builder.mutation<Laboratory, { id: string; body: LaboratoryInput }>({
      query: ({ id, body }) => ({ url: '/laboratorys/' + encodeURIComponent(id), method: 'PUT', body }),
      transformResponse: (response: Envelope<Laboratory>) => response.data,
      invalidatesTags: ['Laboratory'],
    }),
    deleteLaboratory: builder.mutation<null, string>({
      query: id => ({ url: '/laboratorys/' + encodeURIComponent(id), method: 'DELETE' }),
      transformResponse: (response: Envelope<null>) => response.data,
      invalidatesTags: ['Laboratory'],
    }),
    getMedicalInsurances: builder.query<MedicalInsurance[], void>({
      query: () => '/medicalinsurances',
      transformResponse: (response: Envelope<MedicalInsurance[]>) => response.data,
      providesTags: ['MedicalInsurance'],
      keepUnusedDataFor: 300,
    }),
    getMedicalInsurance: builder.query<MedicalInsurance, string>({
      query: id => '/medicalinsurances/' + encodeURIComponent(id),
      transformResponse: (response: Envelope<MedicalInsurance>) => response.data,
      providesTags: ['MedicalInsurance'],
    }),
    createMedicalInsurance: builder.mutation<MedicalInsurance, MedicalInsuranceInput>({
      query: body => ({ url: '/medicalinsurances', method: 'POST', body }),
      transformResponse: (response: Envelope<MedicalInsurance>) => response.data,
      invalidatesTags: ['MedicalInsurance'],
    }),
    updateMedicalInsurance: builder.mutation<MedicalInsurance, { id: string; body: MedicalInsuranceInput }>({
      query: ({ id, body }) => ({ url: '/medicalinsurances/' + encodeURIComponent(id), method: 'PUT', body }),
      transformResponse: (response: Envelope<MedicalInsurance>) => response.data,
      invalidatesTags: ['MedicalInsurance'],
    }),
    deleteMedicalInsurance: builder.mutation<null, string>({
      query: id => ({ url: '/medicalinsurances/' + encodeURIComponent(id), method: 'DELETE' }),
      transformResponse: (response: Envelope<null>) => response.data,
      invalidatesTags: ['MedicalInsurance'],
    }),
    getInsurancePlans: builder.query<InsurancePlan[], void>({
      query: () => '/insuranceplans',
      transformResponse: (response: Envelope<InsurancePlan[]>) => response.data,
      providesTags: ['InsurancePlan'],
      keepUnusedDataFor: 300,
    }),
    getInsurancePlan: builder.query<InsurancePlan, string>({
      query: id => '/insuranceplans/' + encodeURIComponent(id),
      transformResponse: (response: Envelope<InsurancePlan>) => response.data,
      providesTags: ['InsurancePlan'],
    }),
    createInsurancePlan: builder.mutation<InsurancePlan, InsurancePlanInput>({
      query: body => ({ url: '/insuranceplans', method: 'POST', body }),
      transformResponse: (response: Envelope<InsurancePlan>) => response.data,
      invalidatesTags: ['InsurancePlan'],
    }),
    updateInsurancePlan: builder.mutation<InsurancePlan, { id: string; body: InsurancePlanInput }>({
      query: ({ id, body }) => ({ url: '/insuranceplans/' + encodeURIComponent(id), method: 'PUT', body }),
      transformResponse: (response: Envelope<InsurancePlan>) => response.data,
      invalidatesTags: ['InsurancePlan'],
    }),
    deleteInsurancePlan: builder.mutation<null, string>({
      query: id => ({ url: '/insuranceplans/' + encodeURIComponent(id), method: 'DELETE' }),
      transformResponse: (response: Envelope<null>) => response.data,
      invalidatesTags: ['InsurancePlan'],
    }),
  }),
});
export const {
  useGetCategoriesQuery, useLazyGetCategoriesQuery, useGetCategoryQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation,
  useGetLaboratoriesQuery, useLazyGetLaboratoriesQuery, useGetLaboratoryQuery, useCreateLaboratoryMutation, useUpdateLaboratoryMutation, useDeleteLaboratoryMutation,
  useGetMedicalInsurancesQuery, useLazyGetMedicalInsurancesQuery, useGetMedicalInsuranceQuery, useCreateMedicalInsuranceMutation, useUpdateMedicalInsuranceMutation, useDeleteMedicalInsuranceMutation,
  useGetInsurancePlansQuery, useLazyGetInsurancePlansQuery, useGetInsurancePlanQuery, useCreateInsurancePlanMutation, useUpdateInsurancePlanMutation, useDeleteInsurancePlanMutation,
} = masterDataApi;
