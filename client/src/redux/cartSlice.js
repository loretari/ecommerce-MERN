import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    products: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    quantity: 0,
    total: 0
}

export const cartSlice = createSlice({
     name: "cart",
    initialState,
    reducers: {
         addProduct: (state, action) => {
             const { _id, title, price, quantity } = action.payload;
             state.quantity += quantity;
             state.total += price * quantity;

             const existingProductIndex = state.products.findIndex(product => product._id === _id);
             if (existingProductIndex !== -1) {
                 state.products[existingProductIndex].quantity += quantity;
             } else {
                 state.products.push(action.payload);
             }

             localStorage.setItem("cartItems", JSON.stringify(state.products));

           
             toast.success(`${quantity} ${title} added to cart!`, {
                 position: "bottom-left"
             });

         },

        cartEnd: (state, action) => {
             state.products = [];
             state.quantity = 0;
            localStorage.removeItem(('cart'));

            state.total = 0;
        },

        removeProduct: (state, action) => {

             const id = action.payload._id;
             const newList = JSON.parse(localStorage.getItem("cartItems"));
            if (!newList) {
               console.log("Cart is empty or not initialized");
               return;
            }
             const updatedList = newList.filter(product => product._id !== id);

             state.products = updatedList;
             state.quantity -= 1;
             localStorage.setItem('cart', state.quantity);
             localStorage.setItem('cartItems', JSON.stringify(updatedList));
             toast.error("Product removed from cart.", {
                 position: "bottom-left"
             })
        },

        clearCart: (state, action) => {
           state.products = [];
           localStorage.setItem("cartItems", JSON.stringify(state.products));
           state.quantity = 0;
           state.total = 0;
           localStorage.setItem("cart", state.quantity)
            toast.error("Cart cleared!", {
                position: "bottom-left"
            })
        },

        getTotals : (state) => {
             let { total, quantity } = state.products.reduce(
                 (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                 },

                 {
                     total: 0,
                     quantity: 0,
                 }
             );
             total = parseFloat(total.toFixed(2));
             state.quantity = quantity;
             state.total = total;
        }
    }
})

export const {addProduct, cartEnd, removeProduct, getTotals, clearCart} = cartSlice.actions;

export default cartSlice.reducer;