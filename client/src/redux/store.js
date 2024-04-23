import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import clientSlice from "./clientSlice";
import employeeSlice from "./employeeSlice";
import itemSlice from "./itemSlice";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
}

const reducers = combineReducers({
    user: userSlice,
    cart: cartSlice,
    product: productSlice,
    client: clientSlice,
    employee: employeeSlice,
    item: itemSlice,

})

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export let persistor = persistStore(store);