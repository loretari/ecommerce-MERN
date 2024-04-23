import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    isFetching: false,
    error: false,
    token: null,
}

   export const userSlice = createSlice({
       name: "user",
       initialState,
       reducers: {
           loginStart: (state) => {
               state.isFetching = true;
           },
           loginSuccess: (state, action) => {
               state.isFetching = false;
               state.currentUser = action.payload;
               state.token = action.payload.token;
           },
           loginFailure: (state) => {
               state.currentUser = null;
           },
           logout: (state) => {
               state.currentUser = null;
               state.token = null;
           },
           register: (state, action) => {
               state.isFetching = false;
               state.currentUser = action.payload.others;
               state.token = action.payload.token;
           },

           adminLoginStart: ( state ) => {
               state.isFetching = true;
           },
           adminLoginSuccess: (state, action) => {
               state.isFetching = false;
               state.currentUser = action.payload;
               state.token = action.payload.token;
           },
           adminLoginFailure: (state) => {
               state.isFetching = false;
               state.error = true;
               state.currentUser = null;
               state.token = null;
           }


       }
   })

export const { loginStart, loginSuccess, loginFailure, logout, register, adminLoginSuccess, adminLoginFailure, adminLoginStart } = userSlice.actions;
export default userSlice.reducer;