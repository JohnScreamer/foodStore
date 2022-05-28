import axios from "axios";
import { IFilter } from "../InterfacesTypes/GoodsInterface";
import { ILogInData, IProfile } from "../Redux/Reducers/UserProfile";

const URL = "http://localhost:3003";

export const BaseRequest = axios.create({
    baseURL: URL,
    withCredentials: true,
});

export const FetchAllGoods = () => BaseRequest.get("goods");
export const GetFetchGoods = (goodsType: string) =>
    BaseRequest.get(`${goodsType}`);

export const FetchOneGoodsType = (goodsType: string) => {
    return BaseRequest.get(`/${goodsType}`);
};
export const FetchOneItem = (id: number) => {
    return BaseRequest.get(`allGoods?id=${id}`);
};
export const FetchAllNoFilterGoods = (page: number) => {
    return async () => {
        const totalPages = Math.ceil(
            (await BaseRequest.get(`allGoods`)).data.length / 10
        );
        const currentPage = await BaseRequest.get(
            `allGoods?_page=${page}&_limit=10`
        );
        return { totalPages, currentPage };
    };
};
//--------------------------------
export const getTotalItem = (url: string) => {
    return BaseRequest.get(`${url}`);
};
export const getAllTotalGoods = (url: string) => {
    return BaseRequest.get(`${url}`);
};
//------------------------------

export const FetchFilterGoods = (data: IFilter) => {
    const byPrice = data.byPrice ? `&_sort=price&_order=${data.byPrice}` : "";
    const byType = data.byType ? `&type=${data.byType}` : "";
    return BaseRequest.get(`allGoods?${byPrice + byType}`);
};

export const FetchAddOrder = (order: any) => {
    return BaseRequest.post("/orders", { ...order });
};
export const FetchDiscounList = () => {
    return BaseRequest.get("/DiscountArr");
};
///////profile////
export const FetchSigIn = (profile: IProfile) => {
    return BaseRequest.post("/profile", { ...profile });
};
export const FetchLogIn = (logInData: ILogInData) => {
    return BaseRequest.get(
        `/profile?name=${logInData.name}&password=${logInData.password}`
    );
};
////admin///
export const FetchGetAllOrders = () => {
    return BaseRequest.get("/orders?_sort=id");
};
export const FetchGetAllProfiles = () => {
    return BaseRequest.get("/Profile");
};
