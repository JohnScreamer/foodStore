import { FetchAddOrder } from "./../../Api/ApiRequest";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartInitState } from "../../InterfacesTypes/ReducersInterface";
import {
    IAlcohols,
    IBeer,
    IDrinks,
    IHotDish,
    ISnack,
    ISoup,
} from "../../InterfacesTypes/GoodsInterface";

const initialState: ICartInitState = {
    cart: [],
    error: null,
    isLoading: false,
    amountItemInCart: 0,
    totalPrice: 0,
};

const CartReducer = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(
            state,
            action: PayloadAction<
                IDrinks | ISoup | IAlcohols | IBeer | IHotDish | ISnack
            >
        ) {
            const hasInCart = state.cart.find((goods) => {
                if (goods.id === action.payload.id && goods.amount) {
                    goods.amount = goods.amount + 1;

                    return true;
                }
            });

            if (!hasInCart) {
                state.cart = [...state.cart, { ...action.payload, amount: 1 }];
            }
            state.amountItemInCart = state.amountItemInCart + 1;
            state.totalPrice = state.totalPrice + action.payload.price;
        },
        removeItemFromCart(state, action: PayloadAction<number>) {
            state.cart = state.cart.filter((goods) => {
                if (goods.id === action.payload && goods.amount) {
                    state.totalPrice = state.totalPrice - goods.price;

                    if (goods.amount > 1) {
                        goods.amount = goods.amount - 1;
                        return goods;
                    }
                } else {
                    return goods;
                }
            });
            state.amountItemInCart = state.amountItemInCart - 1;
        },
        deleteItemFromCart(state, action: PayloadAction<number>) {
            state.cart = state.cart.filter((cartItem) => {
                if (cartItem.id !== action.payload) {
                    return cartItem;
                }
                if (cartItem.amount) {
                    state.totalPrice =
                        state.totalPrice - cartItem.amount * cartItem.price;
                    //
                    state.amountItemInCart =
                        state.amountItemInCart - cartItem.amount;
                }
            });
        },
        clearCart(state) {
            state.cart = [];
            state.amountItemInCart = 0;
            state.totalPrice = 0;
        },
    },
});

export default CartReducer.reducer;
export const { addToCart, removeItemFromCart, deleteItemFromCart, clearCart } =
    CartReducer.actions;
