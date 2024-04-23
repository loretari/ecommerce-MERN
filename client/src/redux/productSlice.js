import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    isFetching: false,
    error: false,
    sortBy: ""
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        //get all products (no action because is only fetching)
        getProductStart: (state) => {
            state.isFetching = true;
            state.error = false
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products = action.payload
        },
        getProductFailure: (state) => {
            state.isFetching = false;
            state.error = true
        },

        //delete products
        deleteProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false

            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload),1
            )
        },
        deleteProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //update products
        updateProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        updateProductSuccess: (state, action) => {
            state.isFetching = false
            const { productId, updatedProductData } = action.payload;
            state.products = state.products.map(product => {
                if (product.id === productId) {
                    return { ...product, ...updatedProductData };
                }
                return product;
            })



        },
        updateProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //add product
        addProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        addProductSuccess: (state, action) => {
            state.isFetching = false
            // state.products = [...state.products, action.payload];
            state.products.push(action.payload)

        },
        addProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        },


        // sort products
        sortProducts: (state, action) => {
            state.sortBy = action.payload;
        },
    },
});

export const { getProductSuccess, addProductFailure, addProductStart,
    addProductSuccess, updateProductFailure, updateProductStart,
    updateProductSuccess, deleteProductFailure, deleteProductStart,
    deleteProductSuccess, getProductFailure, getProductStart, sortProducts  } = productSlice.actions;

export default productSlice.reducer;