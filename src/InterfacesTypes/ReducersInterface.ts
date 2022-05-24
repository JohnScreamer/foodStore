import {
    IAlcohols,
    IAllGods,
    IBeer,
    IDrinks,
    IGoods,
    IHotDish,
    ISnack,
    ISoup,
} from "./GoodsInterface";

export interface IGoodsInitState {
    goods: IGoods;
    isLoading: boolean;
    error: null | string;
    allGoods: Array<IAllGods> | null;
    filteredItem: null | IDrinks | ISoup | IAlcohols | IBeer | IHotDish;
    discountList: Array<IDiscountList> | null;
    activeDiscount: null | IDiscountList;
    pagination: {
        maxItemInPage: number;
        totalPages: number | null;
    };
}

export interface ICartInitState {
    cart: Array<IDrinks | ISoup | IAlcohols | IBeer | IHotDish | ISnack> | [];
    isLoading: boolean;
    error: null | string;
    amountItemInCart: number;
    totalPrice: number;
}

export interface IDiscountList {
    id: number;
    text: string;
    title: string;
    img: string;
}
