import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from '../features/employees/employeeSlice'

export const store = configureStore({
  reducer: { employees: employeesReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: true }),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
