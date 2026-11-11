import { useMemo, useState } from 'react';
import { Button, Input, Modal, Popconfirm, Select, Space, Tag, message } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType, SorterResult } from 'antd/es/table/interface';
import type { Employee } from '../types/employee.types';
import type { EmployeeFormValues } from '../schemas/employeeSchema';
import { PageHeader } from '../../../components/common/PageHeader';
import { CommonTable } from '../../../components/common/CommonTable';
import { PermissionGuard } from '../../../components/common/PermissionGuard';
import { EmployeeForm } from '../components/EmployeeForm';
import { useCreateEmployee, useDeleteEmployee, useEmployees, useUpdateEmployee } from '../hooks/useEmployees';

export default function EmployeeListPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);

  const params = useMemo(() => ({
    page, pageSize, search, department, status, sortBy, sortOrder,
  }), [page, pageSize, search, department, status, sortBy, sortOrder]);

  const { data, isLoading, isError } = useEmployees(params);
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployee = useDeleteEmployee();

  const openCreate = () => {
    setSelected(null);
    setModalOpen(true);
  };

  const openEdit = (employee: Employee) => {
    setSelected(employee);
    setModalOpen(true);
  };

  const saveEmployee = async (values: EmployeeFormValues) => {
    try {
      if (selected) {
        await updateEmployee.mutateAsync({ id: selected.id, input: values });
        message.success('Employee updated');
      } else {
        await createEmployee.mutateAsync(values);
        message.success('Employee created');
      }
      setModalOpen(false);
      setSelected(null);
    } catch {
      message.error('Could not save employee. Please try again.');
    }
  };

  const removeEmployee = async (id: number) => {
    try {
      await deleteEmployee.mutateAsync(id);
      message.success('Employee deleted');
    } catch {
      message.error('Could not delete employee');
    }
  };

  const columns: ColumnsType<Employee> = [
    { title: 'Employee', dataIndex: 'name', key: 'name', sorter: true, render: (name: string, row) => (
      <div><strong>{name}</strong><div className="muted-cell">{row.email}</div></div>
    ) },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Designation', dataIndex: 'designation', key: 'designation' },
    { title: 'Joined', dataIndex: 'joinedOn', key: 'joinedOn', sorter: true },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (value: string) => (
      <Tag color={value === 'Active' ? 'success' : 'default'}>{value}</Tag>
    ) },
    { title: 'Actions', key: 'actions', fixed: 'right', render: (_, record) => (
      <Space>
        <PermissionGuard permission="employee:update">
          <Button type="text" icon={<EditOutlined />} onClick={() => openEdit(record)} aria-label={`Edit ${record.name}`} />
        </PermissionGuard>
        <PermissionGuard permission="employee:delete">
          <Popconfirm title="Delete this employee?" description="This action cannot be undone." onConfirm={() => removeEmployee(record.id)}>
            <Button type="text" danger icon={<DeleteOutlined />} aria-label={`Delete ${record.name}`} />
          </Popconfirm>
        </PermissionGuard>
      </Space>
    ) },
  ];

  const handleTableChange = (
    nextPage: number,
    nextPageSize: number,
    sorter: SorterResult<Employee> | SorterResult<Employee>[],
  ) => {
    setPage(nextPage);
    setPageSize(nextPageSize);
    const active = Array.isArray(sorter) ? sorter[0] : sorter;
    if (active?.field) {
      setSortBy(String(active.field));
      setSortOrder(active.order === 'descend' ? 'desc' : 'asc');
    }
  };

  return (
    <div>
      <PageHeader
        title="Employees"
        description="Manage your people, roles and employee records."
        onAdd={openCreate}
        addLabel="Add employee"
        action={<Tag color="blue">{data?.totalCount ?? 0} total</Tag>}
      />

      <div className="filter-bar">
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="Search name, email or designation"
          value={search}
          onChange={(event) => { setSearch(event.target.value); setPage(1); }}
          style={{ maxWidth: 320 }}
        />
        <Select
          allowClear
          placeholder="All departments"
          value={department}
          onChange={(value) => { setDepartment(value); setPage(1); }}
          options={['Engineering', 'People', 'Finance', 'Design', 'Sales'].map((value) => ({ label: value, value }))}
          style={{ width: 190 }}
        />
        <Select
          allowClear
          placeholder="All statuses"
          value={status}
          onChange={(value) => { setStatus(value); setPage(1); }}
          options={[{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }]}
          style={{ width: 160 }}
        />
        <Button onClick={() => { setSearch(''); setDepartment(undefined); setStatus(undefined); setPage(1); }}>
          Clear filters
        </Button>
      </div>

      {isError ? <div className="error-panel">Unable to load employees. Check your API connection.</div> : (
        <CommonTable<Employee>
          columns={columns}
          data={data?.items ?? []}
          loading={isLoading}
          total={data?.totalCount ?? 0}
          page={page}
          pageSize={pageSize}
          onChange={handleTableChange}
        />
      )}

      <Modal
        title={selected ? 'Edit employee' : 'Add employee'}
        open={modalOpen}
        onCancel={() => { setModalOpen(false); setSelected(null); }}
        footer={null}
        destroyOnClose
        width={560}
      >
        <EmployeeForm
          key={selected?.id ?? 'new'}
          initialValues={selected ?? undefined}
          loading={createEmployee.isPending || updateEmployee.isPending}
          onSubmit={saveEmployee}
          onCancel={() => { setModalOpen(false); setSelected(null); }}
        />
      </Modal>
    </div>
  );
}
