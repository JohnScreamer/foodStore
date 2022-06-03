import { useEffect } from "react";
import { useParams } from "react-router-dom";
import GoodsCard from "../../Components/GoodsCard/GoodsCard";
import LoadingCardList from "../../Components/LoadingCadList/LoadingCadList";
import NavBarGoodsCategories from "../../Components/NavBarGoodsCategories/NavBarGoodsCategories";
import { useAppDispatch, useAppSelector } from "../../Hooks/common";

import {
    AllGoodsNameType,
    AllGoodsType,
} from "../../InterfacesTypes/ReducersInterface";
import { RequestOneGoodsType } from "../../Redux/Reducers/GoodsReducer";
import s from "./OneCategorieGoods.module.scss";

const OneCategorieGoods = () => {
    const categorie = useParams().type;
    //@ts-ignore
    const goods = useAppSelector((state) => state.goods.goods[categorie]);

    const dispatch = useAppDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(RequestOneGoodsType(categorie as AllGoodsNameType));
    }, [categorie]);
    console.log("renderOnetYPE");

    const goodsList = goods?.map((goodsItem: AllGoodsType) => (
        <div key={goodsItem.name} className={s.cardWrapper}>
            {" "}
            <GoodsCard goods={goodsItem} />
        </div>
    ));
    const isLoading = useAppSelector((state) => state.goods.isLoading);

    return (
        <main className={s.wrapper}>
            <NavBarGoodsCategories />

            <div className={s.cardsWrapper}>
                {isLoading ? <LoadingCardList num={10} /> : goodsList}
            </div>
        </main>
    );
};

export default OneCategorieGoods;
