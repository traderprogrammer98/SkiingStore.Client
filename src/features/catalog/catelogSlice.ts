import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit"
import { Product } from "../../app/models/product"
import agent from "../../app/api/agent"
import { RootState } from "../../app/store/configureStore"

const productsAdapter = createEntityAdapter()

export const fetchProductsAsync = createAsyncThunk<Product[]>(
  "catelog/fetchProductsAsync",
  async () => {
    try {
      return await agent.Catelog.list()
    } catch (error) {
      console.log(error)
    }
  }
)

export const catelogSlice = createSlice({
  name: "catelog",
  initialState: productsAdapter.getInitialState({
    productsLoades: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts"
    }),
      builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
        productsAdapter.setAll(state, action.payload)
        state.status = "idle"
        state.productsLoades = true
      }),
      builder.addCase(fetchProductsAsync.rejected, (state) => {
        state.status = "idle"
      })
  },
})

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catelog
)
