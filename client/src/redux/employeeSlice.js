import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    employees: [],
    isFetching: false,
    error: false,

}

// register a new user
export const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        //get all Employees (no action because is only fetching)
        getEmployeeStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        getEmployeeSuccess: (state, action) => {
            state.isFetching = false
            state.employees = action.payload
        },
        getEmployeeFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //delete Employees
        deleteEmployeeStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        deleteEmployeeSuccess: (state, action) => {
            state.isFetching = false
            //we remove the Employee whose id matches with our specific Employee
            state.employees.splice(
                state.employees.findIndex((item) => item._id === action.payload), 1
            )
        },
        deleteEmployeeFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //update Employees
        updateEmployeeStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        updateEmployeeSuccess: (state, action) => {
            state.isFetching = false
            const { employeeId, updatedEmployeeData } = action.payload;
            state.employees = state.employees.map(employee => {
                if (employee.id === employeeId) {
                    return { ...employee, ...updatedEmployeeData};
                }
                return employee;
            })

        },
        updateEmployeeFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //add Employee
        addEmployeeStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        addEmployeeSuccess: (state, action) => {
            state.isFetching = false
            state.employees.push(action.payload)

        },
        addEmployeeFailure: (state) => {
            state.isFetching = false
            state.error = true
        }
    }
});

   export const { getEmployeeSuccess, updateEmployeeSuccess,
       updateEmployeeStart, updateEmployeeFailure, getEmployeeStart,
       deleteEmployeeSuccess, deleteEmployeeStart, deleteEmployeeFailure,
       addEmployeeSuccess, addEmployeeStart, addEmployeeFailure,
       getEmployeeFailure } = employeeSlice.actions;

export default employeeSlice.reducer;