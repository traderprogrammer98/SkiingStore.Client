import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
  "catelog/fetchProductsAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Catelog.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catelog/fetchProductAsync",
  async (productId, thunkAPI) => {
    try {
      return await agent.Catelog.details(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const catelogSlice = createSlice({
  name: "catelog",
  initialState: productsAdapter.getInitialState({
    productsLoades: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    }),
      builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
        productsAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.productsLoades = true;
      }),
      builder.addCase(fetchProductsAsync.rejected, (state) => {
        state.status = "idle";
      });
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    }),
      builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
        productsAdapter.upsertOne(state, action.payload);
        state.status = "idle";
      }),
      builder.addCase(fetchProductAsync.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catelog
);
