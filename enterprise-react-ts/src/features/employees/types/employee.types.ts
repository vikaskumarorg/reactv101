export type EmployeeStatus = 'Active' | 'Inactive';

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  designation: string;
  status: EmployeeStatus;
  joinedOn: string;
}

export interface EmployeeInput {
  name: string;
  email: string;
  department: string;
  designation: string;
  status: EmployeeStatus;
  joinedOn: string;
}
