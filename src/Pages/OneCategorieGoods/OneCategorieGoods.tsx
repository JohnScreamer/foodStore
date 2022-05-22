import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CasualBtn from "../../Components/Buttons/CasualBtn/CasualBtn";
import GoodsCard from "../../Components/GoodsCard/GoodsCard";
import LoadingCardList from "../../Components/LoadingCadList/LoadingCadList";
import NavBarGoodsCategories from "../../Components/NavBarGoodsCategories/NavBarGoodsCategories";
import DropList from "../../Components/Select/Select";
import { useAppDispatch, useAppSelector } from "../../Hooks/common";
import {
    filterByPrice,
    IAlcohols,
    IBeer,
    IDrinks,
    IFilter,
    IHotDish,
    ISnack,
    ISoup,
} from "../../InterfacesTypes/GoodsInterface";
import { RequestOneGoodsType } from "../../Redux/Reducers/GoodsReducer";
import s from "./OneCategorieGoods.module.scss";

const OneCategorieGoods = () => {
    const categorie = useParams().type;
    //@ts-ignore
    const goods = useAppSelector((state) => state.goods.goods[categorie]);

    const dispatch = useAppDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(
            RequestOneGoodsType(
                categorie as
                    | "drinks"
                    | "soups"
                    | "alcohols"
                    | "beers"
                    | "hotDish"
                    | "snacks"
            )
        );
    }, []);

    const goodsList = goods?.map(
        (
            goodsItem: IDrinks | ISoup | IAlcohols | IBeer | IHotDish | ISnack
        ) => (
            <div key={goodsItem.name} className={s.cardWrapper}>
                {" "}
                <GoodsCard goods={goodsItem} />
            </div>
        )
    );
    const { error, isLoading } = useAppSelector((state) => state.goods);

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
