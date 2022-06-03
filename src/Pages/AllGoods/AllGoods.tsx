import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CasualBtn from "../../Components/Buttons/CasualBtn/CasualBtn";
import GoodsCard from "../../Components/GoodsCard/GoodsCard";
import LoadingCardList from "../../Components/LoadingCadList/LoadingCadList";
import NavBarGoodsCategories from "../../Components/NavBarGoodsCategories/NavBarGoodsCategories";
import DropList from "../../Components/Select/Select";
import { useAppDispatch, useAppSelector } from "../../Hooks/common";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
    filterByName,
    filterByPrice,
    IFilter,
} from "../../InterfacesTypes/GoodsInterface";
import {
    FilterGoods,
    RequestGoods,
    RequestTotalItem,
} from "../../Redux/Reducers/GoodsReducer";
import s from "./AllGoods.module.scss";
import { useRequest } from "../../Hooks/useRequest";
import { useSearchParams } from "react-router-dom";

const AllGoods: FC = () => {
    const { control, handleSubmit } = useForm();
    const isLoading = useAppSelector((state) => state.goods.isLoading);
    const dispatch = useAppDispatch();
    const { sortPriceType, forTotalPages } = useRequest(10, "allGoods");
    const [urlParams, setUrlParams] = useSearchParams();

    const priceUrl: null | string = urlParams.get("price");
    const typeFilter: string | null = urlParams.get("type");
    const pageurl: null | string = urlParams.get("page");

    const [formstatus, setFormStatus] = useState<IFilter>({
        byPrice: priceUrl ? priceUrl : null,
        byType: typeFilter ? typeFilter : null,
        page: pageurl ? pageurl : 1,
    });
    const param: any = {};
    const onSubmit: SubmitHandler<any> = (data: IFilter) => {
        dispatch(FilterGoods({ ...data, page: 1 }));
        setFormStatus((state) => {
            return {
                ...state,
                byPrice:
                    data.byPrice !== undefined ? data.byPrice : state.byPrice,
                byType: data.byType !== undefined ? data.byType : state.byType,
                page: 1,
            };
        });
    };
    console.log("rendering");

    useEffect(() => {
        if (formstatus.byPrice) param.price = formstatus.byPrice;
        if (formstatus.byType) param.type = formstatus.byType;
        if (formstatus.page) param.page = formstatus.page;
        dispatch(RequestTotalItem(forTotalPages(formstatus)));
        dispatch(RequestGoods(sortPriceType({ ...formstatus })));
        setUrlParams(param);
    }, [formstatus.byPrice, formstatus.byType, formstatus.page]);
    useEffect(() => {
        dispatch(RequestTotalItem(forTotalPages(formstatus)));
        dispatch(RequestGoods(sortPriceType(formstatus)));
    }, []);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setFormStatus((state) => {
            return { ...state, page: value };
        });
        dispatch(RequestGoods(sortPriceType(formstatus)));
    };
    const allGoods = useAppSelector((state) => state.goods.allGoods);
    const pages = useAppSelector((state) => state.goods.pagination.totalPages);

    const goodsList = allGoods?.map((goodsItem) => (
        <div key={goodsItem.id} className={s.cardWrapper}>
            <GoodsCard goods={goodsItem} />
        </div>
    ));
    return (
        <main className={s.wrapper}>
            <NavBarGoodsCategories />
            <div className={s.Filter}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.inputWrapper}>
                        {" "}
                        <DropList
                            name="byType"
                            ruleName="По типу"
                            defaultValues={typeFilter}
                            options={filterByName}
                            control={control}
                        />
                    </div>
                    <div className={s.inputWrapper}>
                        {" "}
                        <DropList
                            name="byPrice"
                            defaultValues={priceUrl}
                            ruleName="По ціні"
                            options={filterByPrice}
                            control={control}
                        />
                    </div>
                    <CasualBtn brr>Знайти</CasualBtn>
                </form>
                <div className={s.paginationWrapper}>
                    {pages && pages > 1 && (
                        <Stack spacing={2}>
                            <Pagination
                                color="primary"
                                count={pages}
                                page={Number(formstatus.page)}
                                onChange={handleChange}
                            />
                        </Stack>
                    )}
                </div>
            </div>
            <div className={s.cardsWrapper}>
                {isLoading ? <LoadingCardList num={10} /> : goodsList}
            </div>
            <div className={s.paginationWrapper}>
                {pages && pages > 1 && (
                    <Stack spacing={2}>
                        <Pagination
                            color="primary"
                            count={pages}
                            page={Number(formstatus.page)}
                            onChange={handleChange}
                        />
                    </Stack>
                )}
            </div>
        </main>
    );
};
export default AllGoods;
