import { configureStore } from '@reduxjs/toolkit'
import employees from './store/employee'

export default configureStore({
  reducer: {
    employees: employees
  },
  devTools: true,
})
