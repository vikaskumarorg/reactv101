import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { employeeSchema } from '../schemas/employeeSchema';
import type { EmployeeFormValues } from '../schemas/employeeSchema';

interface Props {
  initialValues?: Partial<EmployeeFormValues>;
  loading?: boolean;
  onSubmit: (values: EmployeeFormValues) => void;
  onCancel: () => void;
}

const departments = ['Engineering', 'People', 'Finance', 'Design', 'Sales'];

export function EmployeeForm({ initialValues, loading = false, onSubmit, onCancel }: Props) {
  const { control, handleSubmit, formState: { errors } } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      email: initialValues?.email ?? '',
      department: initialValues?.department ?? '',
      designation: initialValues?.designation ?? '',
      status: initialValues?.status ?? 'Active',
      joinedOn: initialValues?.joinedOn ?? dayjs().format('YYYY-MM-DD'),
    },
  });

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item label="Full name" validateStatus={errors.name ? 'error' : ''} help={errors.name?.message}>
        <Controller name="name" control={control} render={({ field }) => (
          <Input {...field} placeholder="e.g. Jordan Lee" />
        )} />
      </Form.Item>

      <Form.Item label="Work email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
        <Controller name="email" control={control} render={({ field }) => (
          <Input {...field} type="email" placeholder="name@company.com" />
        )} />
      </Form.Item>

      <Form.Item label="Department" validateStatus={errors.department ? 'error' : ''} help={errors.department?.message}>
        <Controller name="department" control={control} render={({ field }) => (
          <Select {...field} placeholder="Select department" options={departments.map((item) => ({ label: item, value: item }))} />
        )} />
      </Form.Item>

      <Form.Item label="Designation" validateStatus={errors.designation ? 'error' : ''} help={errors.designation?.message}>
        <Controller name="designation" control={control} render={({ field }) => (
          <Input {...field} placeholder="e.g. Product Manager" />
        )} />
      </Form.Item>

      <Form.Item label="Status">
        <Controller name="status" control={control} render={({ field }) => (
          <Select {...field} options={[{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }]} />
        )} />
      </Form.Item>

      <Form.Item label="Joining date" validateStatus={errors.joinedOn ? 'error' : ''} help={errors.joinedOn?.message}>
        <Controller name="joinedOn" control={control} render={({ field }) => (
          <DatePicker
            style={{ width: '100%' }}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
          />
        )} />
      </Form.Item>

      <div className="form-actions">
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>Save employee</Button>
      </div>
    </Form>
  );
}
