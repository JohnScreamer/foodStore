import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import CartReducer from "../Reducers/CartReducer";
import GoodsReducer from "../Reducers/GoodsReducer";
import UserProfile from "../Reducers/UserProfile";

export const store = configureStore({
    reducer: {
        goods: GoodsReducer,
        cart: CartReducer,
        UserProfile: UserProfile,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
