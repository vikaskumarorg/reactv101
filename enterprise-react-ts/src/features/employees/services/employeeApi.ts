import { httpClient } from '../../../services/httpClient';
import type { PaginationParams, PaginatedResponse } from '../../../types/api.types';
import type { Employee, EmployeeInput } from '../types/employee.types';

const STORAGE_KEY = 'northstar-demo-employees';

const seedEmployees: Employee[] = [
  { id: 1, name: 'Ava Patel', email: 'ava.patel@example.com', department: 'Engineering', designation: 'Frontend Engineer', status: 'Active', joinedOn: '2023-04-10' },
  { id: 2, name: 'Noah Williams', email: 'noah.williams@example.com', department: 'People', designation: 'People Partner', status: 'Active', joinedOn: '2022-09-15' },
  { id: 3, name: 'Mia Chen', email: 'mia.chen@example.com', department: 'Finance', designation: 'Financial Analyst', status: 'Inactive', joinedOn: '2021-02-08' },
  { id: 4, name: 'Liam Johnson', email: 'liam.johnson@example.com', department: 'Engineering', designation: 'Backend Engineer', status: 'Active', joinedOn: '2024-01-22' },
  { id: 5, name: 'Isabella Garcia', email: 'isabella.garcia@example.com', department: 'Design', designation: 'Product Designer', status: 'Active', joinedOn: '2023-07-03' },
  { id: 6, name: 'Ethan Brown', email: 'ethan.brown@example.com', department: 'Sales', designation: 'Account Executive', status: 'Inactive', joinedOn: '2020-11-19' },
  { id: 7, name: 'Sophia Miller', email: 'sophia.miller@example.com', department: 'Engineering', designation: 'QA Engineer', status: 'Active', joinedOn: '2022-05-12' },
  { id: 8, name: 'Lucas Davis', email: 'lucas.davis@example.com', department: 'People', designation: 'Recruiter', status: 'Active', joinedOn: '2024-03-18' },
  { id: 9, name: 'Amara Singh', email: 'amara.singh@example.com', department: 'Finance', designation: 'Controller', status: 'Active', joinedOn: '2021-08-30' },
  { id: 10, name: 'Oliver Wilson', email: 'oliver.wilson@example.com', department: 'Design', designation: 'UX Designer', status: 'Inactive', joinedOn: '2023-12-01' },
  { id: 11, name: 'Priya Shah', email: 'priya.shah@example.com', department: 'Sales', designation: 'Sales Manager', status: 'Active', joinedOn: '2022-01-14' },
  { id: 12, name: 'James Taylor', email: 'james.taylor@example.com', department: 'Engineering', designation: 'Tech Lead', status: 'Active', joinedOn: '2019-06-24' },
];

const isMock = import.meta.env.VITE_DATA_MODE !== 'rest';

function readStore(): Employee[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedEmployees));
    return seedEmployees;
  }
  try {
    return JSON.parse(raw) as Employee[];
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedEmployees));
    return seedEmployees;
  }
}

function writeStore(items: Employee[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const wait = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const employeeApi = {
  async list(params: PaginationParams): Promise<PaginatedResponse<Employee>> {
    if (!isMock) {
      const { data } = await httpClient.get<PaginatedResponse<Employee>>('/employees', { params });
      return data;
    }

    await wait();
    let rows = readStore();
    if (params.search) {
      const term = params.search.toLowerCase();
      rows = rows.filter((row) =>
        [row.name, row.email, row.department, row.designation]
          .some((value) => value.toLowerCase().includes(term)),
      );
    }
    if (params.department) rows = rows.filter((row) => row.department === params.department);
    if (params.status) rows = rows.filter((row) => row.status === params.status);

    if (params.sortBy) {
      const key = params.sortBy as keyof Employee;
      const direction = params.sortOrder === 'desc' ? -1 : 1;
      rows = [...rows].sort((a, b) =>
        String(a[key]).localeCompare(String(b[key]), undefined, { numeric: true }) * direction,
      );
    }

    const totalCount = rows.length;
    const start = (params.page - 1) * params.pageSize;
    return {
      items: rows.slice(start, start + params.pageSize),
      totalCount,
      page: params.page,
      pageSize: params.pageSize,
    };
  },

  async getById(id: number): Promise<Employee> {
    if (!isMock) {
      const { data } = await httpClient.get<Employee>(`/employees/${id}`);
      return data;
    }
    await wait();
    const employee = readStore().find((row) => row.id === id);
    if (!employee) throw new Error('Employee not found');
    return employee;
  },

  async create(input: EmployeeInput): Promise<Employee> {
    if (!isMock) {
      const { data } = await httpClient.post<Employee>('/employees', input);
      return data;
    }
    await wait();
    const rows = readStore();
    const employee: Employee = { ...input, id: Math.max(0, ...rows.map((row) => row.id)) + 1 };
    writeStore([employee, ...rows]);
    return employee;
  },

  async update(id: number, input: EmployeeInput): Promise<Employee> {
    if (!isMock) {
      const { data } = await httpClient.put<Employee>(`/employees/${id}`, input);
      return data;
    }
    await wait();
    const rows = readStore();
    const index = rows.findIndex((row) => row.id === id);
    if (index < 0) throw new Error('Employee not found');
    rows[index] = { ...input, id };
    writeStore(rows);
    return rows[index];
  },

  async remove(id: number): Promise<void> {
    if (!isMock) {
      await httpClient.delete(`/employees/${id}`);
      return;
    }
    await wait();
    writeStore(readStore().filter((row) => row.id !== id));
  },
};
