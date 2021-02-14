import { createSlice } from '@reduxjs/toolkit'

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: [],
        employeesCount: 0,
        employee: {}
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
          }
        })
        state.employee = employeeData
      }
    },
    extraReducers: {}
})

export const { getAllEmployees, getEmployee } = employeeSlice.actions

export default employeeSlice.reducer
