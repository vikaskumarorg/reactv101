export type EmployeeStatus = 'Active' | 'Inactive' | 'On Leave'

export interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  department: string
  role: string
  location: string
  status: EmployeeStatus
  joinedDate: string
  salary: number
}

export type EmployeeInput = Omit<Employee, 'id'>
