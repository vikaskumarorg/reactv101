import { Table } from 'antd';
import type { Key } from 'react';
import type { TableProps } from 'antd';
import type { SorterResult, TablePaginationConfig } from 'antd/es/table/interface';

interface Props<T extends { id: number }> {
  columns: TableProps<T>['columns'];
  data: T[];
  loading?: boolean;
  total: number;
  page: number;
  pageSize: number;
  onChange: (
    page: number,
    pageSize: number,
    sorter: SorterResult<T> | SorterResult<T>[],
    filters: Record<string, (Key | boolean)[] | null>,
  ) => void;
}

export function CommonTable<T extends { id: number }>({
  columns, data, loading = false, total, page, pageSize, onChange,
}: Props<T>) {
  const pagination: TablePaginationConfig = {
    current: page,
    pageSize,
    total,
    showSizeChanger: true,
    showTotal: (count) => `${count} records`,
    pageSizeOptions: [10, 20, 50],
  };

  return (
    <Table<T>
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={pagination}
      onChange={(nextPagination, filters, sorter) => {
        onChange(
          nextPagination.current ?? 1,
          nextPagination.pageSize ?? 10,
          sorter,
          filters as Record<string, (Key | boolean)[] | null>,
        );
      }}
      scroll={{ x: 900 }}
    />
  );
}
