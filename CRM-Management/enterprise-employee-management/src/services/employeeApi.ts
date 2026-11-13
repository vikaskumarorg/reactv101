import type { Employee, EmployeeInput } from '../types/employee'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  })
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed (${response.status})`)
  }
  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

export const employeeApi = {
  getAll: () => request<Employee[]>('/employees'),
  create: (employee: EmployeeInput) =>
    request<Employee>('/employees', { method: 'POST', body: JSON.stringify(employee) }),
  update: (id: string, employee: EmployeeInput) =>
    request<Employee>(`/employees/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(employee) }),
  remove: (id: string) =>
    request<void>(`/employees/${encodeURIComponent(id)}`, { method: 'DELETE' }),
}
