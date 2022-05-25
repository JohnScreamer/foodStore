import { FC, useEffect } from "react";
import { NavLink } from "react-router-dom";
import GoogleSection from "../../Components/GoogleSection/GoogleSection";
import NavBarGoodsCategories from "../../Components/NavBarGoodsCategories/NavBarGoodsCategories";
import SectionName from "../../Components/SectionName/SectionName";
import { useAppSelector } from "../../Hooks/common";

import s from "./Discount.module.scss";

const Discount: FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { error, isLoading, discountList } = useAppSelector(
        (state) => state.goods
    );
    const discount = discountList?.map((discountItem) => (
        <NavLink to={`/discount/${discountItem.id}`}>
            <li key={discountItem.id}>
                <img src={discountItem.img} alt="discount img" />
                <div>
                    <h2>{discountItem.title}</h2>
                    <p>{discountItem.text}</p>
                </div>
            </li>
        </NavLink>
    ));

    return (
        <>
            <NavBarGoodsCategories />
            <main className={s.discount}>
                <div className={s.wrapper}>
                    <SectionName>Акції</SectionName>
                </div>

                <ul>{discount}</ul>
                <GoogleSection />
            </main>
        </>
    );
};

export default Discount;
