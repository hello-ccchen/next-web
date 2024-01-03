import { IProduct, IProductState } from "@/interfaces/products/products-interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

const initialState: IProductState = {
  productList: [],
  isLoading: true,
  error: undefined,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const response = await fetch("/api/products");
    const result = await response.json();
    return result.products;
  } catch (error) {
    throw error;
  }
});

export const postProducts = createAsyncThunk("products/postProducts", async(productToAdd: IProduct) => {
  try {
    const response = await fetch("/api/products", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productToAdd)
    });
    const product = await response.json();
    return product;
  } catch (error) {
    throw error;
  }
})

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(postProducts.fulfilled, (state, action) => {
        state.productList = [...state.productList, action.payload];
      });
  },
});

export const productsSelector = (state: RootState) => state.products;

export default productSlice.reducer;
