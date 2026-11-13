import { useEffect, useMemo, useState } from 'react'
import { Building2, ChevronDown, CircleHelp, Download, Filter, Plus, Search, Users, UserCheck, UserRound, X } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addEmployee, deleteEmployee, fetchEmployees, updateEmployee } from '../features/employees/employeeSlice'
import { useAppContext } from '../context/AppContext'
import EmployeeForm from '../components/EmployeeForm'
import EmployeeTable from '../components/EmployeeTable'
import type { Employee, EmployeeInput } from '../types/employee'

export default function EmployeesPage() {
  const dispatch = useAppDispatch()
  const { items, loading, saving, error } = useAppSelector((state) => state.employees)
  const { notify } = useAppContext()
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('All departments')
  const [status, setStatus] = useState('All statuses')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Employee | null>(null)
  const [confirming, setConfirming] = useState<Employee | null>(null)
  const departments = useMemo(() => ['All departments', ...Array.from(new Set(items.map((e) => e.department))).sort()], [items])
  useEffect(() => { dispatch(fetchEmployees()) }, [dispatch])
  const activeCount = items.filter((e) => e.status === 'Active').length
  const departmentCount = new Set(items.map((e) => e.department)).size
  async function save(data: EmployeeInput) {
    try {
      if (editing) { await dispatch(updateEmployee({ id: editing.id, data })).unwrap(); notify('Employee details updated') }
      else { await dispatch(addEmployee(data)).unwrap(); notify('Employee added successfully') }
      setShowForm(false); setEditing(null)
    } catch (e) { notify(e instanceof Error ? e.message : 'Something went wrong', 'error') }
  }
  async function remove() {
    if (!confirming) return
    try { await dispatch(deleteEmployee(confirming.id)).unwrap(); notify(`${confirming.firstName} ${confirming.lastName} deleted`) }
    catch (e) { notify(e instanceof Error ? e.message : 'Unable to delete employee', 'error') }
    setConfirming(null)
  }
  function exportCsv() {
    const headers = ['ID','First name','Last name','Email','Department','Job title','Location','Status','Join date','Annual salary']
    const rows = items.map((e) => [e.id,e.firstName,e.lastName,e.email,e.department,e.role,e.location,e.status,e.joinedDate,e.salary])
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${String(v).replaceAll('"','""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const link = document.createElement('a'); link.href = url; link.download = 'employees.csv'; link.click(); URL.revokeObjectURL(url)
    notify('Employee list exported')
  }
  return <main className="page">
    <div className="page-heading"><div><div className="breadcrumbs">Workspace <span>/</span> People <span>/</span> Employees</div><h1>Employees</h1><p className="page-subtitle">Manage your people, teams, and employee information.</p></div><div className="heading-actions"><button className="btn btn-secondary" onClick={exportCsv}><Download size={16}/> Export</button><button className="btn btn-primary" onClick={() => { setEditing(null); setShowForm(true) }}><Plus size={17}/> Add employee</button></div></div>
    <section className="stats-grid">
      <article className="stat-card"><div className="stat-icon blue"><Users size={19}/></div><div className="stat-label">Total employees</div><div className="stat-value">{items.length.toString().padStart(2,'0')}</div><div className="stat-foot">Across your organization</div></article>
      <article className="stat-card"><div className="stat-icon green"><UserCheck size={19}/></div><div className="stat-label">Active employees</div><div className="stat-value">{activeCount.toString().padStart(2,'0')}</div><div className="stat-foot"><span className="positive">{items.length ? Math.round(activeCount / items.length * 100) : 0}%</span> of total workforce</div></article>
      <article className="stat-card"><div className="stat-icon violet"><Building2 size={19}/></div><div className="stat-label">Departments</div><div className="stat-value">{departmentCount.toString().padStart(2,'0')}</div><div className="stat-foot">Teams represented</div></article>
      <article className="stat-card"><div className="stat-icon amber"><UserRound size={19}/></div><div className="stat-label">On leave</div><div className="stat-value">{items.filter((e) => e.status === 'On Leave').length.toString().padStart(2,'0')}</div><div className="stat-foot">Currently away</div></article>
    </section>
    <section className="directory-card">
      <div className="directory-header"><div><h2>All employees <span className="count-pill">{items.length}</span></h2><p>View and manage your organization’s employee directory.</p></div><button className="help-link" onClick={() => notify('Tip: use search, filters, and sortable columns to find employees.')}><CircleHelp size={16}/> Help</button></div>
      <div className="toolbar"><div className="search-box"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search employees..." aria-label="Search employees"/>{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={14}/></button>}</div><div className="filters"><label className="filter-control"><Filter size={15}/><select value={department} onChange={(e) => setDepartment(e.target.value)} aria-label="Filter by department">{departments.map((d) => <option key={d}>{d}</option>)}</select><ChevronDown size={14}/></label><label className="filter-control"><select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status"><option>All statuses</option><option>Active</option><option>Inactive</option><option>On Leave</option></select><ChevronDown size={14}/></label></div></div>
      {error && <div className="inline-error">{error} <button onClick={() => dispatch(fetchEmployees())}>Retry</button></div>}
      {loading ? <div className="loading-state"><div className="spinner"/>Loading employees…</div> : <EmployeeTable employees={items} query={query} department={department} status={status} onEdit={(employee) => { setEditing(employee); setShowForm(true) }} onDelete={setConfirming}/>}
    </section>
    <div className="page-note"><span>PeopleOS</span> · Employee data is securely managed through your organization’s API.</div>
    {showForm && <EmployeeForm employee={editing} saving={saving} onClose={() => { setShowForm(false); setEditing(null) }} onSubmit={save}/>}
    {confirming && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setConfirming(null) }}><section className="confirm-modal" role="alertdialog" aria-modal="true"><div className="delete-icon"><Trash2 size={21}/></div><h2>Delete employee?</h2><p>Are you sure you want to delete <strong>{confirming.firstName} {confirming.lastName}</strong>? This action cannot be undone.</p><div className="modal-actions"><button className="btn btn-secondary" onClick={() => setConfirming(null)}>Cancel</button><button className="btn btn-danger" onClick={remove}>Delete employee</button></div></section></div>}
  </main>
}
