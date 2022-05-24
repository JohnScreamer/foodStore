import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CasualBtn from "../../Components/Buttons/CasualBtn/CasualBtn";
import GoodsCard from "../../Components/GoodsCard/GoodsCard";
import LoadingCardList from "../../Components/LoadingCadList/LoadingCadList";
import NavBarGoodsCategories from "../../Components/NavBarGoodsCategories/NavBarGoodsCategories";
import DropList from "../../Components/Select/Select";
import { useAppDispatch, useAppSelector } from "../../Hooks/common";
import {
    filterByName,
    filterByPrice,
    IFilter,
    ISelect,
} from "../../InterfacesTypes/GoodsInterface";
import { FilterGoods } from "../../Redux/Reducers/GoodsReducer";
import s from "./AllGoods.module.scss";

const AllGoods: FC = () => {
    const { allGoods, error, isLoading } = useAppSelector(
        (state) => state.goods
    );
    const dispatch = useAppDispatch();
    const [filterParam, setFilterParam] = useState(null);

    const { control, handleSubmit } = useForm();
    const goodsList = allGoods?.map((goodsItem) => (
        <div key={goodsItem.name} className={s.cardWrapper}>
            {" "}
            <GoodsCard goods={goodsItem} />
        </div>
    ));

    const onSubmit: SubmitHandler<any> = (data: IFilter) => {
        dispatch(FilterGoods(data));
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                            options={filterByName}
                            control={control}
                        />
                    </div>
                    <div className={s.inputWrapper}>
                        {" "}
                        <DropList
                            name="byPrice"
                            ruleName="По ціні"
                            options={filterByPrice}
                            control={control}
                        />
                    </div>
                    <CasualBtn brr>Знайти</CasualBtn>
                </form>
            </div>
            <div className={s.cardsWrapper}>
                {isLoading ? <LoadingCardList num={10} /> : goodsList}
            </div>
        </main>
    );
};

export default AllGoods;
