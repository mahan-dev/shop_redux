import { configureStore } from "@reduxjs/toolkit";
import shopSlice from "../features/shopSlice";
import logger from "redux-logger";

const store = configureStore({
    
    reducer: {
        products: shopSlice,

    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(logger)

})

export default store;