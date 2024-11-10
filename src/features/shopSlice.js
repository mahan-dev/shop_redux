import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SumProducts, SumTotal } from "../helper/function";
// 
// function Helper



const getProductsDb = JSON.parse(localStorage.getItem("shopDB"));
const initialState = getProductsDb || {
    selectedItems: [],
    total: 0,
    itemsCounter: 0,
    loading: null,
    checkout: false,
    product: []
}


const saveToLocalStorage = (state) => {
    localStorage.setItem("shopDB", JSON.stringify(state))
}





const productApi = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data
}

export const fetchProduct = createAsyncThunk("products/fetchProducts", productApi)

const shopSlice = createSlice({

    name: "products",
    initialState,

    reducers: {

        add: (state, action) => {
            const existIndex = state.selectedItems.findIndex(item => item.id === action.payload.id);
            if (existIndex !== -1) {
                state.selectedItems[existIndex].quantity;
            } else {
                state.selectedItems.push({
                    ...action.payload,
                    quantity: 1
                })
            }
            state.itemsCounter = SumProducts(state.selectedItems);
            state.total = SumTotal(state.selectedItems);
            saveToLocalStorage(state)

        },

        increment: (state, action) => {
            const itemIndex = state.selectedItems.findIndex(item => item.id === action.payload.id);
            if (itemIndex !== -1) {
                state.selectedItems[itemIndex].quantity++;
            } else {
                state.selectedItems[itemIndex].quantity;
            };

            state.itemsCounter = SumProducts(state.selectedItems);
            state.total = SumTotal(state.selectedItems);
            saveToLocalStorage(state);
        },

        decrement: (state, action) => {
            const indexDecrease = state.selectedItems.findIndex(item => item.id === action.payload.id);
            if (indexDecrease !== -1) {
                state.selectedItems[indexDecrease].quantity--;
                state.itemsCounter = SumProducts(state.selectedItems)
            } else {
                state.selectedItems[indexDecrease].quantity;
            }
            saveToLocalStorage(state)
        },
        Delete: (state, action) => {
            const filteredProducts = state.selectedItems.filter(item => item.id !== action.payload.id);
            state.selectedItems = filteredProducts;
            state.itemsCounter = SumProducts(filteredProducts);
            saveToLocalStorage(state)

        },
        checkout: (state, action) => {
            state.selectedItems = [];
                state.total = 0;
                state.itemsCounter = 0;
                state.checkout = true;
                saveToLocalStorage(state)
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchProduct.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        });

        builder.addCase(fetchProduct.rejected, (state) => {
            state.loading = false;
        })
    }
});


export default shopSlice.reducer;
export const { increment, decrement, add, Delete ,checkout } = shopSlice.actions;
export const selectShopState = state => state.products;
export const selectNumber = state => state.products.testNumber;
export const selectProduct = state => state.products.product;
export const selectSelectedItems = state => state.products.selectedItems;
export const selectItemsCounter = state => state.products.itemsCounter;
export const selectProductPrice = state => state.products.total;
