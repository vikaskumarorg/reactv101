import { useState } from 'react';
import { Avatar, Dropdown, Layout, Menu, Select, Space, Typography } from 'antd';
import type { MenuProps } from 'antd';
import {
  AppstoreOutlined, TeamOutlined, BellOutlined, DownOutlined,
  LogoutOutlined, SettingOutlined,
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { Role } from '../types/auth.types';

const { Header, Sider, Content } = Layout;

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const switchRole = useAuthStore((state) => state.switchRole);

  const menuItems: MenuProps['items'] = [
    { key: '/dashboard', icon: <AppstoreOutlined />, label: 'Overview' },
    { key: '/employees', icon: <TeamOutlined />, label: 'Employees' },
  ];

  return (
    <Layout className="app-shell">
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} breakpoint="lg">
        <div className="brand">
          <div className="brand-mark">N</div>
          {!collapsed && <span>northstar</span>}
        </div>
        {!collapsed && <div className="nav-caption">WORKSPACE</div>}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
        {!collapsed && (
          <div className="sider-footer">
            <div className="sider-footer-title">NORTHSTAR WORKSPACE</div>
            <div>People operations console</div>
          </div>
        )}
      </Sider>

      <Layout>
        <Header className="topbar">
          <div className="topbar-left">
            <Typography.Text type="secondary">Workspace /</Typography.Text>
            <Typography.Text strong>{location.pathname === '/employees' ? 'Employees' : 'Overview'}</Typography.Text>
          </div>
          <Space size="middle">
            <Select<Role>
              size="small"
              value={user.role}
              onChange={(role) => switchRole(role)}
              options={[
                { label: 'Demo: Admin', value: 'Admin' },
                { label: 'Demo: Manager', value: 'Manager' },
                { label: 'Demo: Employee', value: 'Employee' },
              ]}
              style={{ width: 150 }}
              aria-label="Switch demo role"
            />
            <BellOutlined className="topbar-icon" />
            <Dropdown menu={{ items: [
              { key: 'profile', label: 'Profile', icon: <SettingOutlined /> },
              { key: 'signout', label: 'Demo session', icon: <LogoutOutlined />, disabled: true },
            ] }}>
              <Space className="profile-trigger">
                <Avatar style={{ background: '#dbeafe', color: '#2345a0' }}>AM</Avatar>
                <div className="profile-meta">
                  <strong>{user.name}</strong>
                  <span>{user.role}</span>
                </div>
                <DownOutlined className="profile-chevron" />
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content className="main-content">
          <div className="content-inner"><Outlet /></div>
          <footer className="app-footer">Northstar Enterprise Starter · React + TypeScript</footer>
        </Content>
      </Layout>
    </Layout>
  );
}
