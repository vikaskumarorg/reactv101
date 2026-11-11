import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { PaginationParams } from '../../../types/api.types';
import type { EmployeeInput } from '../types/employee.types';
import { employeeApi } from '../services/employeeApi';

export const employeeKeys = {
  all: ['employees'] as const,
  list: (params: PaginationParams) => ['employees', 'list', params] as const,
  detail: (id: number) => ['employees', 'detail', id] as const,
};

export function useEmployees(params: PaginationParams) {
  return useQuery({
    queryKey: employeeKeys.list(params),
    queryFn: () => employeeApi.list(params),
    placeholderData: (previousData) => previousData,
  });
}

export function useCreateEmployee() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (input: EmployeeInput) => employeeApi.create(input),
    onSuccess: () => client.invalidateQueries({ queryKey: employeeKeys.all }),
  });
}

export function useUpdateEmployee() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: EmployeeInput }) =>
      employeeApi.update(id, input),
    onSuccess: (_, variables) => {
      client.invalidateQueries({ queryKey: employeeKeys.all });
      client.invalidateQueries({ queryKey: employeeKeys.detail(variables.id) });
    },
  });
}

export function useDeleteEmployee() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => employeeApi.remove(id),
    onSuccess: () => client.invalidateQueries({ queryKey: employeeKeys.all }),
  });
}
