export interface IDefaultSetGoods {
    id: number;
    name: string;
    price: number;
    description: string;
    img: string;
    type: string;
    available: boolean;
    amount?: number;
    capacity?: number;
    weight?: number;
}

export interface IDrinks extends IDefaultSetGoods {}
export interface ISnack extends IDefaultSetGoods {}
export interface IAllGods {
    id: number;
    name: string;
    price: number;
    description: string;
    img: string;
    type: string;
    available: boolean;
    capacity?: number;
    weight?: number;
    amount?: number;
}

export interface IGoods {
    drinks: IDrinks[] | null;
    soups: ISoup[] | null;
    alcohols: IAlcohols[] | null;
    beers: IBeer[] | null;
    hotDish: IHotDish[] | null;
    snacks: ISnack[] | null;
}

export interface IHotDish extends ISnack {}
export interface ISoup extends IDrinks {}
export interface IBeer extends IDrinks {}
export interface IAlcohols extends IDrinks {}
type ByType =
    | null
    | "drinks"
    | "soups"
    | "alcohols"
    | "beers"
    | "hotDish"
    | "snacks"
    | any;

export interface IFilter {
    byType?: ByType;
    byPrice?: null | "fromExpensive" | "fromCheaper" | any;
    page: number | any;
}

export interface IOnSubmit {
    name: string;
    byName: string;
}
export interface ISelect {
    name: string;
    value: string | null;
}

export const filterByPrice: ISelect[] = [
    { name: "Від дорогих до дешевих", value: "desc" },
    { name: "ВІд дешевих до дорогих", value: "asc" },
];

export const filterByName: ISelect[] = [
    { name: "Гарячі страви", value: "hotDish" },
    { name: "Пиво", value: "beers" },
    { name: "Супи", value: "soups" },
    { name: "Закуски", value: "snacks" },
    { name: "Напої", value: "drinks" },
    { name: "Алкоголь", value: "alcohols" },
];

export const defaultEditValue = {
    id: "",
    name: "",
    price: "",
    description: "",
    img: "",
    type: "",
    capacity: "",
    weight: "",
};
export type DefaultEditValue = typeof defaultEditValue;
