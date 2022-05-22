import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchAddOrder } from "../../Api/ApiRequest";
import { IFormOrder } from "../../InterfacesTypes/FormOrderTypes";

export interface IUserInitState {
    orderHistory: Array<IFormOrder>;
    isLoading: boolean;
    error: null | string;
    lastOrder: IFormOrder | null;
}

const initialState: IUserInitState = {
    orderHistory: [],
    isLoading: false,
    error: null,
    lastOrder: null,
};

const UserProfileReducer = createSlice({
    name: "UserProfile",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(addOrder.fulfilled, (state, action) => {
                state.orderHistory = [...state.orderHistory, action.payload];
                state.lastOrder = action.payload;
                state.isLoading = false;
            })
            .addCase(addOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addOrder.rejected, (state, action) => {
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
    },
});

export default UserProfileReducer.reducer;

export const addOrder = createAsyncThunk<any, any, { rejectValue: string }>(
    "addOrder/UserProfile",
    async function (data, { rejectWithValue }) {
        const response = await FetchAddOrder(data);

        if (response.status > 300 || response.status < 199) {
            return rejectWithValue(`Error , not made order(`);
        }
        console.log(response);

        return data;
    }
);
