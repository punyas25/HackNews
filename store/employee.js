import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const empCookie = Cookies.get('employee_id')

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    employeesCount: 0,
    employee: {},
    employeeId :  empCookie ? empCookie : '',
    error: ''
  },
  reducers: {
    getAllEmployees(state, action) {
      const employeeData = action.payload
      state.employees = employeeData
      state.employeesCount = employeeData.length
    },
    getEmployee(state, action) {
      const data = action.payload
      let employeeData = {}

      state.employees.forEach(emp => {
        if (emp['id'] == data.employee_id) {
          employeeData = emp
          Cookies.set('employee_id', emp['id'])
          state.error = ''
        }
      })
      state.employee = employeeData
      state.employeeId = data.employee_id
      if (!employeeData.length) {
        state.error = 'Enter Valid Employee Id. Please try again.'
      }
    },
    logout(state) {
      Cookies.remove('employee_id')
      state.employeeId = ''
      state.error = ''
    }
  },
  extraReducers: {

  }
})

export const { getAllEmployees, getEmployee, logout } = employeeSlice.actions

export default employeeSlice.reducer
