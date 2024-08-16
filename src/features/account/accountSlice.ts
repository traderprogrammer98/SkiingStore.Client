import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";
import { setBasket } from "../basket/basketSlice";

export interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const logInUserAsync = createAsyncThunk<User, FieldValues>(
  "account/logInUserAsync",
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.login(data);
      const { basket, ...user } = userDto;
      if (basket) thunkAPI.dispatch(setBasket(basket));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUserAsync = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
      const userDto = await agent.Account.currentUser();
      const { basket, ...user } = userDto;
      if (basket) thunkAPI.dispatch(setBasket(basket));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      router.navigate("/");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInUserAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      router.navigate("/catelog");
    });
    builder.addCase(fetchCurrentUserAsync.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.error("Seession expired.");
      router.navigate("/login");
    });
    builder.addMatcher(
      isAnyOf(fetchCurrentUserAsync.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(isAnyOf(logInUserAsync.rejected), (state, action) => {
      console.log(action.payload);
    });
  },
});
export const { logOut, setUser } = accountSlice.actions;
