import { FC, useEffect, useState } from "react";
import Benefits from "../../Components/Benefits/Benefits";
import GoodsCategories from "../../Components/GoodsCategories/GoodsCategories";
import GoogleSection from "../../Components/GoogleSection/GoogleSection";
import Input from "../../Components/Input/Input";
import LoadingApiRequest from "../../Components/LoadingApiRequest/LoadingApiRequest";
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
    const { isLoading, error } = useAppSelector((state) => state.goods);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <main className={s.main}>
                {isLoading && <LoadingApiRequest />}
                <PictureSlider />
                <NavBarGoodsCategories />
                <GoodsCategories sectionName="Гарячі страви" goods={hotDish} />
                <GoodsCategories sectionName="Пиво" goods={beers} />
                <GoodsCategories sectionName="Алкоголь" goods={alcohols} />
                <Benefits />
                <GoogleSection />
            </main>
        </>
    );
};

export default Main;
