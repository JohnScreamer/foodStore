import {
    FetchAllGoods,
    FetchFilterGoods,
    FetchOneGoodsType,
    FetchOneItem,
} from "./../../Api/ApiRequest";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGoodsInitState } from "../../InterfacesTypes/ReducersInterface";
import {
    IAlcohols,
    IAllGods,
    IBeer,
    IDrinks,
    IFilter,
    IGoods,
    IHotDish,
    ISnack,
    ISoup,
} from "../../InterfacesTypes/GoodsInterface";

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
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(RequestAllGoods.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(RequestAllGoods.fulfilled, (state, action) => {
                state.goods = action.payload;
                state.isLoading = false;
                const goodsArr = Object.keys(action.payload).reduce(
                    (acc: any, goodsType: any) => {
                        //@ts-ignore
                        acc = [...acc, ...action.payload[goodsType]];
                        return acc;
                    },
                    []
                );
                state.allGoods = goodsArr;
                state.pagination.totalPages = Math.ceil(
                    goodsArr.length / state.pagination.maxItemInPage
                );
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
                if (action.payload.data.byPrice === "fromExpensive") {
                    filteredGoods.reverse();
                }
                state.allGoods = filteredGoods;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.isLoading = false;

                state.error = action.payload;
            });
    },
});

const isError = (action: any) => {
    return action.type.endsWith("rejected");
};

export default GoodsReducer.reducer;

///////////-----AsyncThunk-----///////////

export const RequestAllGoods = createAsyncThunk<
    IGoods,
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
    data: Array<IDrinks | ISoup | IAlcohols | IBeer | IHotDish | ISnack>;
    type: "drinks" | "soups" | "alcohols" | "beers" | "hotDish" | "snacks";
}

export const RequestOneGoodsType = createAsyncThunk<
    IRequestOneGoodsType,
    "drinks" | "soups" | "alcohols" | "beers" | "hotDish" | "snacks",
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
    IDrinks | ISoup | IAlcohols | IBeer | IHotDish | ISnack,
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
