import { Col, Row, Card, Statistic, Typography } from 'antd';
import { TeamOutlined, UserAddOutlined, CheckCircleOutlined, ApartmentOutlined } from '@ant-design/icons';
import { useEmployees } from '../features/employees/hooks/useEmployees';

export default function DashboardPage() {
  const { data } = useEmployees({ page: 1, pageSize: 100 });
  const employees = data?.items ?? [];
  const active = employees.filter((employee) => employee.status === 'Active').length;
  const departments = new Set(employees.map((employee) => employee.department)).size;

  return (
    <div>
      <Typography.Title level={3}>Overview</Typography.Title>
      <Typography.Paragraph type="secondary">A snapshot of your organization's people data.</Typography.Paragraph>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} xl={6}><Card><Statistic title="Total employees" value={data?.totalCount ?? 0} prefix={<TeamOutlined />} /></Card></Col>
        <Col xs={24} sm={12} xl={6}><Card><Statistic title="Active employees" value={active} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#16845b' }} /></Card></Col>
        <Col xs={24} sm={12} xl={6}><Card><Statistic title="Departments" value={departments} prefix={<ApartmentOutlined />} /></Card></Col>
        <Col xs={24} sm={12} xl={6}><Card><Statistic title="New this month" value={2} prefix={<UserAddOutlined />} /></Card></Col>
      </Row>
      <Card className="dashboard-note" title="Getting started">
        <Typography.Paragraph>
          Use the Employees section to search, filter, sort, create, edit and remove employee records.
          This starter uses browser localStorage by default. Configure REST mode when your backend is ready.
        </Typography.Paragraph>
      </Card>
    </div>
  );
}
