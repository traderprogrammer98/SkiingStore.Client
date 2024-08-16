import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "idle",
};

export const fetchBasketAsync = createAsyncThunk<Basket>(
  "basket/fetchBasketAsync",
  async (_, thunkAPI) => {
    try {
      const basket = await agent.Basket.get();
      return basket;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!cookies.get("buyerId")) {
        return false;
      }
    },
  }
);

export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity: number }
>("basket/addBasketItemAsync", async ({ productId, quantity }) => {
  try {
    return await agent.Basket.addItem(productId, quantity);
  } catch (error) {
    console.log(error);
  }
});

export const removeBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity: number }
>("basket/removeBasketItemAsync", async ({ productId, quantity }) => {
  try {
    return await agent.Basket.removeItem(productId, quantity);
  } catch (error) {
    console.log(error);
  }
});
export const basketSlice = createSlice({
  name: "basket",
  initialState: initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    clearBasket: (state) => {
      state.basket = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pending" + action.meta.arg.productId;
    }),
      builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
        state.basket = action.payload!;
        state.status = "idle";
      }),
      builder.addCase(addBasketItemAsync.rejected, (state) => {
        state.status = "idle";
      }),
      builder.addCase(removeBasketItemAsync.pending, (state, action) => {
        state.status = "peding" + action.meta.arg.productId;
      }),
      builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
        state.basket = action.payload;
        state.status = "idle";
      }),
      builder.addCase(removeBasketItemAsync.rejected, (state) => {
        state.status = "idle";
      });
    builder.addCase(fetchBasketAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = "idle";
    });
  },
});

export const { setBasket, clearBasket } = basketSlice.actions;
