import { useEffect, useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type { Employee, EmployeeInput, EmployeeStatus } from '../types/employee'

const departments = ['Engineering', 'Product', 'People', 'Finance', 'Sales', 'Marketing', 'Operations', 'Legal', 'Customer Success']
const emptyForm: EmployeeInput = {
  firstName: '', lastName: '', email: '', department: 'Engineering', role: '',
  location: '', status: 'Active', joinedDate: new Date().toISOString().slice(0, 10), salary: 0,
}
type Errors = Partial<Record<keyof EmployeeInput, string>>

interface Props {
  employee: Employee | null
  saving: boolean
  onClose: () => void
  onSubmit: (data: EmployeeInput) => Promise<void>
}
export default function EmployeeForm({ employee, saving, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<EmployeeInput>(emptyForm)
  const [errors, setErrors] = useState<Errors>({})
  useEffect(() => {
    if (employee) {
      setForm({
        firstName: employee.firstName, lastName: employee.lastName, email: employee.email,
        department: employee.department, role: employee.role, location: employee.location,
        status: employee.status, joinedDate: employee.joinedDate, salary: employee.salary,
      })
    } else setForm(emptyForm)
    setErrors({})
  }, [employee])

  function update<K extends keyof EmployeeInput>(key: K, value: EmployeeInput[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }
  function validate() {
    const next: Errors = {}
    if (!form.firstName.trim()) next.firstName = 'First name is required'
    if (!form.lastName.trim()) next.lastName = 'Last name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid work email'
    if (!form.role.trim()) next.role = 'Job title is required'
    if (!form.location.trim()) next.location = 'Location is required'
    if (!form.joinedDate) next.joinedDate = 'Join date is required'
    if (!Number.isFinite(form.salary) || form.salary <= 0) next.salary = 'Salary must be greater than zero'
    setErrors(next)
    return Object.keys(next).length === 0
  }
  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!validate()) return
    await onSubmit({ ...form, firstName: form.firstName.trim(), lastName: form.lastName.trim(), email: form.email.trim().toLowerCase(), role: form.role.trim(), location: form.location.trim() })
  }
  const field = (key: keyof EmployeeInput, label: string, type = 'text', placeholder = '') => (
    <label className="field" key={key}>
      <span>{label} <b>*</b></span>
      <input type={type} value={String(form[key])} placeholder={placeholder}
        onChange={(e) => setForm((current) => ({ ...current, [key]: type === 'number' ? Number(e.target.value) : e.target.value } as EmployeeInput))}
        min={type === 'number' ? 1 : undefined} />
      {errors[key] && <small className="field-error">{errors[key]}</small>}
    </label>
  )
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className="modal-head"><div><p className="eyebrow">PEOPLE DIRECTORY</p><h2 id="form-title">{employee ? 'Edit employee' : 'Add employee'}</h2><p className="muted">Enter the employee details below. Fields marked * are required.</p></div><button className="icon-btn" onClick={onClose} aria-label="Close"><X size={19}/></button></div>
        <form onSubmit={submit}>
          <div className="form-grid">
            {field('firstName', 'First name', 'text', 'e.g. Jordan')}
            {field('lastName', 'Last name', 'text', 'e.g. Lee')}
            {field('email', 'Work email', 'email', 'name@company.com')}
            <label className="field"><span>Department <b>*</b></span><select value={form.department} onChange={(e) => update('department', e.target.value)}>{departments.map((d) => <option key={d}>{d}</option>)}</select></label>
            {field('role', 'Job title', 'text', 'e.g. Product Manager')}
            {field('location', 'Location', 'text', 'e.g. New York')}
            <label className="field"><span>Status</span><select value={form.status} onChange={(e) => update('status', e.target.value as EmployeeStatus)}><option>Active</option><option>Inactive</option><option>On Leave</option></select></label>
            {field('joinedDate', 'Join date', 'date')}
            {field('salary', 'Annual salary (USD)', 'number', 'e.g. 95000')}
          </div>
          <div className="modal-actions"><button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary" disabled={saving}>{saving ? 'Saving…' : employee ? 'Save changes' : 'Add employee'}</button></div>
        </form>
      </section>
    </div>
  )
}
