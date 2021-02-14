import { configureStore } from '@reduxjs/toolkit'
import employees from './store/employee'
import challenges from './store/challenges'

export default configureStore({
  reducer: {
    employees: employees,
    challenges: challenges
  },
  devTools: true,
})
