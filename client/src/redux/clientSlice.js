import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   currentUser: null,
    isFetching: false,
    error: false,
    clients: [],
}

// register a new user
export const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        //get all clients (no action because is only fetching)
        getClientStart: (state) => {
            state.isFetching = true;
            state.error = false
        },

        getClientSuccess: (state, action) => {
            state.isFetching = false;
            state.clients = action.payload
        },
        getClientFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //delete clients
        deleteClientStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        deleteClientSuccess: (state, action) => {
            state.isFetching = false
            state.clients.splice(
                state.clients.findIndex((item) => item._id === action.payload),1
            )
        },
        deleteClientFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //update clients
        updateClientStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        updateClientSuccess: (state, action) => {
            state.isFetching = false
            const { userId, updatedUserData } = action.payload;
            state.clients = state.clients.map(user => {
                if (user.id === userId) {
                    return { ...user, ...updatedUserData};
                }
                return user;
            })



        },
        updateClientFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //add client
        addClientStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        addClientSuccess: (state, action) => {
            state.isFetching = false
            state.clients.push(action.payload)

        },
        addClientFailure: (state) => {
            state.isFetching = false
            state.error = true
        }
    }
})


    export const {addClientFailure, addClientStart, updateClientSuccess, updateClientStart, updateClientFailure,
        deleteClientStart, deleteClientFailure, deleteClientSuccess, getClientSuccess, getClientStart,
        getClientFailure, addClientSuccess} = clientSlice.actions;

export default clientSlice.reducer;