import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Employee, EmployeeInput } from '../../types/employee'
import { employeeApi } from '../../services/employeeApi'

interface EmployeeState {
  items: Employee[]
  loading: boolean
  saving: boolean
  error: string | null
}
const initialState: EmployeeState = { items: [], loading: false, saving: false, error: null }

export const fetchEmployees = createAsyncThunk('employees/fetchAll', () => employeeApi.getAll())
export const addEmployee = createAsyncThunk('employees/create', (data: EmployeeInput) => employeeApi.create(data))
export const updateEmployee = createAsyncThunk('employees/update', ({ id, data }: { id: string; data: EmployeeInput }) => employeeApi.update(id, data))
export const deleteEmployee = createAsyncThunk('employees/delete', (id: string) => employeeApi.remove(id))

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: { clearEmployeeError(state) { state.error = null } },
  extraReducers(builder) {
    builder
      .addCase(fetchEmployees.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => { state.loading = false; state.items = action.payload })
      .addCase(fetchEmployees.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Unable to load employees' })
      .addCase(addEmployee.pending, (state) => { state.saving = true; state.error = null })
      .addCase(addEmployee.fulfilled, (state, action) => { state.saving = false; state.items.unshift(action.payload) })
      .addCase(addEmployee.rejected, (state, action) => { state.saving = false; state.error = action.error.message ?? 'Unable to add employee' })
      .addCase(updateEmployee.pending, (state) => { state.saving = true; state.error = null })
      .addCase(updateEmployee.fulfilled, (state, action) => { state.saving = false; state.items = state.items.map((item) => item.id === action.payload.id ? action.payload : item) })
      .addCase(updateEmployee.rejected, (state, action) => { state.saving = false; state.error = action.error.message ?? 'Unable to update employee' })
      .addCase(deleteEmployee.fulfilled, (state, action) => { state.items = state.items.filter((item) => item.id !== action.meta.arg) })
      .addCase(deleteEmployee.rejected, (state, action) => { state.error = action.error.message ?? 'Unable to delete employee' })
  },
})
export const { clearEmployeeError } = employeeSlice.actions
export default employeeSlice.reducer
