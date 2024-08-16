import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../../features/contact/counterReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlice } from "../../features/basket/basketSlice";
import { catelogSlice } from "../../features/catalog/catelogSlice";
import { accountSlice } from "../../features/account/accountSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    basket: basketSlice.reducer,
    catelog: catelogSlice.reducer,
    account: accountSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
