import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import EmployeeListPage from './features/employees/pages/EmployeeListPage';
import { PermissionGuard } from './components/common/PermissionGuard';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/employees"
          element={
            <PermissionGuard permission="employee:view" fallback={<div className="error-panel">You do not have permission to view employees.</div>}>
              <EmployeeListPage />
            </PermissionGuard>
          }
        />
        <Route path="*" element={<div className="error-panel">Page not found.</div>} />
      </Route>
    </Routes>
  );
}

export default App;
