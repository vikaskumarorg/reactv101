import { z } from 'zod';

export const employeeSchema = z.object({
  name: z.string().trim().min(2, 'Name must contain at least 2 characters'),
  email: z.string().trim().email('Enter a valid email address'),
  department: z.string().min(1, 'Select a department'),
  designation: z.string().trim().min(2, 'Enter a designation'),
  status: z.enum(['Active', 'Inactive']),
  joinedOn: z.string().min(1, 'Select a joining date'),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
