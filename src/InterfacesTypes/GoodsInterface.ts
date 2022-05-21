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

export interface IFilter {
    byType?:
        | null
        | "drinks"
        | "soups"
        | "alcohols"
        | "beers"
        | "hotDish"
        | "snacks";
    byPrice: null | "fromExpensive" | "fromCheaper";
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
    { name: "Від дорогих до дешевих", value: "fromExpensive" },
    { name: "ВІд дешевих до дорогих", value: "fromCheaper" },
];

export const filterByName: ISelect[] = [
    { name: "Гарячі страви", value: "hotDish" },
    { name: "Пиво", value: "beer" },
    { name: "Супи", value: "soup" },
    { name: "Закуски", value: "snack" },
    { name: "Напої", value: "drinks" },
    { name: "Алкоголь", value: "alcohol" },
];
