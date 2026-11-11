import { Button, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  action?: ReactNode;
  onAdd?: () => void;
  addLabel?: string;
}

export function PageHeader({ title, description, action, onAdd, addLabel = 'Add new' }: Props) {
  return (
    <div className="page-heading">
      <div>
        <Typography.Title level={3} style={{ margin: 0 }}>{title}</Typography.Title>
        {description && <Typography.Text type="secondary">{description}</Typography.Text>}
      </div>
      <Space>
        {action}
        {onAdd && <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>{addLabel}</Button>}
      </Space>
    </div>
  );
}
