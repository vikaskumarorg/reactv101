import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import type { Employee } from '../types/employee'

type SortKey = keyof Pick<Employee, 'firstName' | 'email' | 'department' | 'role' | 'location' | 'status' | 'joinedDate' | 'salary'>
interface Props { employees: Employee[]; query: string; department: string; status: string; onEdit: (employee: Employee) => void; onDelete: (employee: Employee) => void }
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
export default function EmployeeTable({ employees, query, department, status, onEdit, onDelete }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('firstName')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const pageSize = 8
  const filtered = useMemo(() => employees.filter((e) => {
    const haystack = [e.id, e.firstName, e.lastName, e.email, e.department, e.role, e.location].join(' ').toLowerCase()
    return haystack.includes(query.toLowerCase()) && (department === 'All departments' || e.department === department) && (status === 'All statuses' || e.status === status)
  }).sort((a, b) => {
    const left = a[sortKey], right = b[sortKey]
    const comparison = typeof left === 'number' && typeof right === 'number' ? left - right : String(left).localeCompare(String(right))
    return sortDirection === 'asc' ? comparison : -comparison
  }), [employees, query, department, status, sortKey, sortDirection])
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  function sort(key: SortKey) {
    if (key === sortKey) setSortDirection((d) => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDirection('asc') }
    setPage(1)
  }
  const heading = (key: SortKey, label: string) => <th><button className="sort-btn" onClick={() => sort(key)}>{label}{sortKey === key ? sortDirection === 'asc' ? <ArrowUp size={13}/> : <ArrowDown size={13}/> : <ArrowUpDown size={13}/>}</button></th>
  return <div className="table-wrap">
    <table>
      <thead><tr><th>EMPLOYEE</th>{heading('department', 'DEPARTMENT')}{heading('role', 'JOB TITLE')}{heading('location', 'LOCATION')}{heading('status', 'STATUS')}{heading('joinedDate', 'JOINED')}{heading('salary', 'SALARY')}<th><span className="sr-only">Actions</span></th></tr></thead>
      <tbody>
        {visible.map((employee) => <tr key={employee.id}>
          <td><div className="employee-cell"><div className="avatar">{employee.firstName[0]}{employee.lastName[0]}</div><div><strong>{employee.firstName} {employee.lastName}</strong><span>{employee.email}</span></div></div></td>
          <td><span className="department-text">{employee.department}</span></td><td>{employee.role}</td><td>{employee.location}</td>
          <td><span className={`status status-${employee.status.toLowerCase().replace(' ', '-')}`}><i/>{employee.status}</span></td>
          <td className="date-cell">{new Date(`${employee.joinedDate}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
          <td className="salary">{money.format(employee.salary)}</td>
          <td><div className="actions"><button className="icon-btn" title="Edit employee" onClick={() => onEdit(employee)}><Pencil size={15}/></button><button className="icon-btn danger-hover" title="Delete employee" onClick={() => onDelete(employee)}><Trash2 size={15}/></button></div></td>
        </tr>)}
        {visible.length === 0 && <tr><td colSpan={8}><div className="empty-state"><div className="empty-icon"><MoreHorizontal/></div><strong>No employees found</strong><span>Try adjusting your search or filters.</span></div></td></tr>}
      </tbody>
    </table>
    <div className="table-footer"><span>Showing <strong>{filtered.length ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, filtered.length)}</strong> of <strong>{filtered.length}</strong> employees</span><div className="pagination"><button disabled={currentPage === 1} onClick={() => setPage((p) => p - 1)}>Previous</button><span>Page {currentPage} of {pageCount}</span><button disabled={currentPage === pageCount} onClick={() => setPage((p) => p + 1)}>Next</button></div></div>
  </div>
}
