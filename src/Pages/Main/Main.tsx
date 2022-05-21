import { FC, useState } from "react";
import GoodsCategories from "../../Components/GoodsCategories/GoodsCategories";
import Input from "../../Components/Input/Input";
import ModalWindow from "../../Components/ModalWindow/ModalWindow";
import NavBarGoodsCategories from "../../Components/NavBarGoodsCategories/NavBarGoodsCategories";
import PictureSlider from "../../Components/PictureSlider/PictureSlider";
import { useAppSelector } from "../../Hooks/common";
import s from "./Main.module.scss";

interface IMain {}

const Main: FC = () => {
    const { alcohols, hotDish, beers } = useAppSelector(
        (state) => state.goods.goods
    );

    console.log("main");

    return (
        <>
            <main className={s.main}>
                <PictureSlider />
                <NavBarGoodsCategories />
                <GoodsCategories sectionName="Гарячі страви" goods={hotDish} />
                <GoodsCategories sectionName="Пиво" goods={beers} />
                <GoodsCategories sectionName="Алкоголь" goods={alcohols} />
            </main>
        </>
    );
};

export default Main;
