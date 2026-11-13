import { Provider } from 'react-redux'
import { store } from './app/store'
import { AppProvider, useAppContext } from './context/AppContext'
import EmployeesPage from './pages/EmployeesPage'
import { Bell, ChevronDown, Command, LayoutDashboard, LifeBuoy, Settings, Users } from 'lucide-react'

function Shell() {
  const { notices, dismiss } = useAppContext()
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Command size={19}/></div><span>people<span className="brand-light">OS</span></span><span className="brand-tag">WORKSPACE</span></div>
      <div className="workspace-switch"><div className="workspace-logo">A</div><div><strong>Acme Corporation</strong><span>Enterprise plan</span></div><ChevronDown size={15}/></div>
      <div className="nav-label">WORKSPACE</div>
      <nav><a className="nav-item" href="#overview"><LayoutDashboard size={17}/> Overview</a><a className="nav-item active" href="#employees"><Users size={17}/> Employees <span className="nav-count">11</span></a></nav>
      <div className="nav-label management-label">MANAGE</div>
      <nav><a className="nav-item" href="#settings"><Settings size={17}/> Settings</a><a className="nav-item" href="#support"><LifeBuoy size={17}/> Help & support</a></nav>
      <div className="sidebar-bottom"><div className="upgrade-card"><div className="upgrade-spark">✦</div><strong>People operations,<br/>made simple.</strong><p>Keep your team data organized in one place.</p></div><div className="profile"><div className="profile-avatar">JD</div><div><strong>Jamie Davis</strong><span>Workspace admin</span></div><ChevronDown size={15}/></div></div>
    </aside>
    <div className="main-area"><header className="topbar"><div className="topbar-left"><span className="topbar-context">Acme Corporation</span><span className="topbar-divider">/</span><span>People management</span></div><div className="topbar-right"><button className="top-icon" aria-label="Notifications"><Bell size={18}/><i/></button><div className="top-avatar">JD</div><div className="top-user"><strong>Jamie Davis</strong><span>Admin</span></div><ChevronDown size={15}/></div></header><EmployeesPage/></div>
    <div className="toast-stack" aria-live="polite">{notices.map((notice) => <div key={notice.id} className={`toast toast-${notice.tone}`}><span>{notice.tone === 'success' ? '✓' : '!'}</span>{notice.message}<button onClick={() => dismiss(notice.id)}>×</button></div>)}</div>
  </div>
}
export default function App() {
  return <Provider store={store}><AppProvider><Shell/></AppProvider></Provider>
}
