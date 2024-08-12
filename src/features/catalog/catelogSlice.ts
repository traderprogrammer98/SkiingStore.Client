import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { MetaData } from "../../app/models/pagination";

interface CatelogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  brands: string[];
  types: string[];
  status: string;
  productParams: ProductParams;
  metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Product>();

const getAxiosParams = (productParams: ProductParams) => {
  const params = new URLSearchParams();
  params.append("sortBy", productParams.sortBy);
  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  if (productParams.search) {
    params.append("search", productParams.search?.toString());
  }
  if (productParams.brands) {
    params.append("brands", productParams.brands?.toString());
  }
  if (productParams.types) {
    params.append("types", productParams.types?.toString());
  }
  return params;
};

export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("catelog/fetchProductsAsync", async (_, thunkAPI) => {
  try {
    const params = getAxiosParams(thunkAPI.getState().catelog.productParams);
    const response = await agent.Catelog.list(params);
    thunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

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

export const fetchFiltersAsync = createAsyncThunk(
  "catelog/fetchFiltersAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Catelog.fetchFilters();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const catelogSlice = createSlice({
  name: "catelog",
  initialState: productsAdapter.getInitialState<CatelogState>({
    productsLoaded: false,
    filtersLoaded: false,
    brands: [],
    types: [],
    status: "idle",
    productParams: {
      sortBy: "name",
      pageNumber: 1,
      pageSize: 6,
    },
    metaData: null,
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetProductParams: (state, action) => {
      state.productParams = {
        sortBy: "name",
        pageNumber: 1,
        pageSize: 6,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    }),
      builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
        productsAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.productsLoaded = true;
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
    builder.addCase(fetchFiltersAsync.pending, (state) => {
      state.status = "pendingFetchFilters";
    }),
      builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
        state.brands = action.payload.brands;
        state.types = action.payload.types;
        state.filtersLoaded = true;
        state.status = "idle";
      }),
      builder.addCase(fetchFiltersAsync.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catelog
);
export const { setProductParams, setMetaData, resetProductParams } =
  catelogSlice.actions;
