import {
    AllGoodsNameType,
    AllGoodsType,
} from "./../../InterfacesTypes/ReducersInterface";
import {
    FetchAllGoods,
    FetchDiscounList,
    FetchFilterGoods,
    FetchOneGoodsType,
    FetchOneItem,
    getAllTotalGoods,
    getTotalItem,
} from "./../../Api/ApiRequest";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    IDiscountList,
    IGoodsInitState,
} from "../../InterfacesTypes/ReducersInterface";
import { IAllGods, IFilter } from "../../InterfacesTypes/GoodsInterface";

const initialState: IGoodsInitState = {
    goods: {
        drinks: null,
        soups: null,
        alcohols: null,
        beers: null,
        hotDish: null,
        snacks: null,
    },
    allGoods: null,
    filteredItem: null,
    discountList: null,
    activeDiscount: null,

    pagination: {
        maxItemInPage: 10,
        totalPages: null,
    },
    isLoading: false,
    error: null,
};

const GoodsReducer = createSlice({
    name: "goods",
    initialState,
    reducers: {
        getDiscountItem: (state, action: PayloadAction<number>) => {
            const active = state.discountList?.find(
                (discountItem) => discountItem.id === action.payload
            );
            if (active) {
                state.activeDiscount = active;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(RequestAllGoods.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(RequestAllGoods.fulfilled, (state, action) => {
                state.isLoading = false;
                action.payload.forEach((goodsItem) => {
                    //@ts-ignore
                    state.goods[goodsItem.type] === null
                        ? //@ts-ignore
                          (state.goods[goodsItem.type] = [])
                        : //@ts-ignore
                          !state.goods[goodsItem.type].find(
                              (el: any) => el.id === goodsItem.id
                              //@ts-ignore
                          ) &&
                          //@ts-ignore
                          (state.goods[goodsItem.type] = [
                              //@ts-ignore
                              ...state.goods[goodsItem.type],
                              goodsItem,
                          ]);
                });
            })
            .addCase(RequestOneGoodsType.fulfilled, (state, action) => {
                const goodsType = action.payload.type;
                state.isLoading = false;

                state.goods[goodsType] = action.payload.data;
            })
            .addCase(RequestOneGoodsType.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(RequestOneGoodsItem.fulfilled, (state, action) => {
                state.filteredItem = action.payload;
                state.isLoading = false;
            })
            .addCase(RequestOneGoodsItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(FilterGoods.fulfilled, (state, action) => {
                const filteredGoods = action.payload.response;
                state.isLoading = false;

                state.allGoods = filteredGoods;
            })
            .addCase(FilterGoods.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(RequestDiscountList.fulfilled, (state, action) => {
                state.discountList = action.payload;
                state.isLoading = false;
            })
            .addCase(RequestDiscountList.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(RequestGoods.fulfilled, (state, action) => {
                state.allGoods = action.payload;
                state.isLoading = false;
            })
            .addCase(RequestGoods.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(RequestTotalItem.fulfilled, (state, action) => {
                state.pagination.totalPages = Math.ceil(
                    action.payload.length / 10
                );

                state.isLoading = false;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.isLoading = false;

                state.error = action.payload;
            });
    },
});

const isError = (action: PayloadAction<string>) => {
    return action.type.endsWith("rejected");
};

export default GoodsReducer.reducer;
export const { getDiscountItem } = GoodsReducer.actions;

///////////-----AsyncThunk-----///////////

export const RequestAllGoods = createAsyncThunk<
    Array<AllGoodsType>,
    undefined,
    { rejectValue: string }
>("AllGoods/goods", async function (_, { rejectWithValue }) {
    const response = await FetchAllGoods();
    if (response.status > 300 || response.status < 199) {
        return rejectWithValue("Error , not get goods(");
    }

    return response.data;
});
interface IRequestOneGoodsType {
    data: Array<AllGoodsType>;
    type: AllGoodsNameType;
}

export const RequestOneGoodsType = createAsyncThunk<
    IRequestOneGoodsType,
    AllGoodsNameType,
    { rejectValue: string }
>("RequestOneGoodsType/goods", async function (type, { rejectWithValue }) {
    const response = await FetchOneGoodsType(type);
    if (response.status > 300 || response.status < 199) {
        return rejectWithValue(`Error , not get ${type}(`);
    }
    const data = response.data;
    return { data, type };
});
export const RequestOneGoodsItem = createAsyncThunk<
    AllGoodsType,
    number,
    { rejectValue: string }
>("RequestOneGoodsItem/goods", async function (id, { rejectWithValue }) {
    const response = await FetchOneItem(id);
    if (response.status > 300 || response.status < 199) {
        return rejectWithValue(`Error , not get element(`);
    }

    return response.data[0];
});
interface IFilterGoods {
    data: IFilter;
    response: IAllGods[];
}

export const FilterGoods = createAsyncThunk<
    IFilterGoods,
    IFilter,
    { rejectValue: string }
>("FilterGoods/goods", async function (data, { rejectWithValue }) {
    const response = await FetchFilterGoods(data);

    if (response.status > 300 || response.status < 199) {
        return rejectWithValue(`Error , not get element(`);
    }

    return { response: response.data, data: data };
});

export const RequestDiscountList = createAsyncThunk<
    Array<IDiscountList>,
    undefined,
    { rejectValue: string }
>("RequestDiscountList/goods", async function (_, { rejectWithValue }) {
    const response = await FetchDiscounList();
    if (response.status > 300 || response.status < 199) {
        return rejectWithValue(`Error , not get discount List`);
    }
    const data = response.data;
    return data;
});

export interface IGoodsRequest {
    data: Array<AllGoodsType>;
    page: number;
}
interface IRequestGoodsReturn {
    page: number;
    type: AllGoodsNameType;
}
export const RequestGoods = createAsyncThunk<
    Array<AllGoodsType>,
    string,
    { rejectValue: string }
>("RequestGoods", async (url, { rejectWithValue }) => {
    const response = await getAllTotalGoods(url);

    return response.data;
});

export const RequestTotalItem = createAsyncThunk<
    Array<AllGoodsType>,
    string,
    { rejectValue: string }
>("RequestTotalItem", async (url, { rejectWithValue }) => {
    const response = await getTotalItem(url);
    if (response.status > 300 || response.status < 199) {
        return rejectWithValue(`Error , not get discount List`);
    }

    return response.data;
});
