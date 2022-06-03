import { AllGoodsType } from "./../../InterfacesTypes/ReducersInterface";
import {
    FetchDeleteGoods,
    FetchGetAllOrders,
    FetchGetAllProfiles,
    FetchLogIn,
    FetchPatchGoods,
    FetchPostNewGoods,
    FetchSigIn,
} from "./../../Api/ApiRequest";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchAddOrder } from "../../Api/ApiRequest";
import { IFormOrder } from "../../InterfacesTypes/FormOrderTypes";
import {
    IDrinks,
    ISoup,
    IAlcohols,
    IBeer,
    IHotDish,
    ISnack,
} from "../../InterfacesTypes/GoodsInterface";

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
    profile?: IProfile | null;
    adminInfo: IAdminInfo;
    editGoods: AllGoodsType | null;
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
    editGoods: null,
};

const UserProfileReducer = createSlice({
    name: "UserProfile",
    initialState,
    reducers: {
        addEditGoods: (state, action: PayloadAction<AllGoodsType>) => {
            state.editGoods = action.payload;
        },
        cleanEditGoods: (state) => {
            state.editGoods = null;
        },
        logOut: (state) => {
            state.profile = null;
        },
    },
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
            .addCase(logIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(logIn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sigIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(sigIn.pending, (state) => {
                state.isLoading = true;
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
            .addCase(GetAllOrders.fulfilled, (state, action) => {
                state.adminInfo.orderHistory = action.payload.reverse();

                state.isLoading = false;
            })
            .addCase(GetAllOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(EdithGoods.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(EdithGoods.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(AddNewGoods.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(AddNewGoods.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(DeleteGoods.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(DeleteGoods.pending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(isError, (state, action) => {
                if (action.error.message) {
                    state.error = action.error.message;
                }
                state.isLoading = false;
            });
    },
});
const isError = (action: PayloadAction<any>) => {
    return action.type.endsWith("rejected");
};

export default UserProfileReducer.reducer;
export const { addEditGoods, cleanEditGoods, logOut } =
    UserProfileReducer.actions;

export const addOrder = createAsyncThunk<any, any, { rejectValue: string }>(
    "addOrder/UserProfile",
    async function (data, { rejectWithValue }) {
        const response = await FetchAddOrder(data);

        if (response.status > 300 || response.status < 199) {
            return rejectWithValue(`Error , not made order(`);
        }

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

interface IEdithGoods {
    id: number;
    goods: any;
}

export const EdithGoods = createAsyncThunk<
    void,
    IEdithGoods,
    { rejectValue: string }
>("EdithGoods/UserProfile", async function (data, { rejectWithValue }) {
    const response = await FetchPatchGoods(data.goods, data.id);
    if (response.status > 300 || response.status < 199) {
        return rejectWithValue(`Error`);
    }
    console.log(response);
});

export const AddNewGoods = createAsyncThunk<
    void,
    AllGoodsType,
    { rejectValue: string }
>("EdithGoods/AddNewGoods", async function (goods, { rejectWithValue }) {
    const response = await FetchPostNewGoods(goods);
    if (response.status > 300 || response.status < 199) {
        return rejectWithValue(`Error`);
    }
    console.log(response);
});
export const DeleteGoods = createAsyncThunk<
    void,
    number,
    { rejectValue: string }
>("EdithGoods/DeleteGoods", async function (id, { rejectWithValue }) {
    const response = await FetchDeleteGoods(id);
    if (response.status > 300 || response.status < 199) {
        return rejectWithValue(`Error`);
    }
    console.log(response);
});
