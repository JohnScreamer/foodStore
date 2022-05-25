import {
    FetchGetAllOrders,
    FetchGetAllProfiles,
    FetchLogIn,
    FetchSigIn,
} from "./../../Api/ApiRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchAddOrder } from "../../Api/ApiRequest";
import { IFormOrder } from "../../InterfacesTypes/FormOrderTypes";

export interface IProfile {
    id: number;
    name: string | null;
    password: string | null;
    isAdmin: boolean;
    userOrderHistory: Array<IFormOrder>;
}
export interface IAdminInfo {
    orderHistory: Array<IFormOrder>;
    allUsers: Array<IProfile>;
}

export interface IUserInitState {
    orderHistory: Array<IFormOrder>;
    isLoading: boolean;
    error: null | string;
    lastOrder: IFormOrder | null;
    profile?: IProfile;
    adminInfo: IAdminInfo;
}

const initialState: IUserInitState = {
    orderHistory: [],
    isLoading: false,
    error: null,
    lastOrder: null,
    adminInfo: {
        orderHistory: [],
        allUsers: [],
    },
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
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(logIn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logIn.rejected, (state, action) => {
                if (action.error.message) {
                    state.error = action.error.message;
                }
            })
            .addCase(sigIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(sigIn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sigIn.rejected, (state, action) => {
                if (action.error.message) {
                    state.error = action.error.message;
                }
                state.isLoading = false;
            })
            .addCase(GetAllUsers.fulfilled, (state, action) => {
                if (state.adminInfo) {
                    state.adminInfo.allUsers = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(GetAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetAllUsers.rejected, (state, action) => {
                if (action.error.message) {
                    state.error = action.error.message;
                }
                state.isLoading = false;
            })
            .addCase(GetAllOrders.fulfilled, (state, action) => {
                state.adminInfo.orderHistory = action.payload.reverse();

                state.isLoading = false;
            })
            .addCase(GetAllOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetAllOrders.rejected, (state, action) => {
                if (action.error.message) {
                    state.error = action.error.message;
                }
                state.isLoading = false;
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

export const sigIn = createAsyncThunk<
    IProfile,
    IProfile,
    { rejectValue: string }
>("sigIn/UserProfile", async function (profile, { rejectWithValue }) {
    const response = await FetchSigIn(profile);
    if (response.status > 300 || response.status < 199) {
        return rejectWithValue(`Error , not sigIn(`);
    }

    return profile;
});

export interface ILogInData {
    password: string;
    name: string;
}

export const logIn = createAsyncThunk<
    IProfile,
    ILogInData,
    { rejectValue: string }
>("logIn/UserProfile", async function (logInData, { rejectWithValue }) {
    const response = await FetchLogIn(logInData);
    if (response.status > 300 || response.status < 199) {
        return rejectWithValue(`Error , not sigIn(`);
    }

    return response.data[0];
});
export const GetAllOrders = createAsyncThunk<
    Array<IFormOrder>,
    undefined,
    { rejectValue: string }
>("GetAllOrders/UserProfile", async function (_, { rejectWithValue }) {
    const response = await FetchGetAllOrders();
    if (response.status > 300 || response.status < 199) {
        return rejectWithValue(`Error`);
    }
    return response.data;
});
export const GetAllUsers = createAsyncThunk<
    Array<IProfile>,
    undefined,
    { rejectValue: string }
>("GetAllUsers/UserProfile", async function (_, { rejectWithValue }) {
    const response = await FetchGetAllProfiles();
    if (response.status > 300 || response.status < 199) {
        return rejectWithValue(`Error`);
    }
    return response.data;
});
