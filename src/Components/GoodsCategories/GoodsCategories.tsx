import { FC } from "react";
import {
    IDrinks,
    ISoup,
    IAlcohols,
    IBeer,
    IHotDish,
    ISnack,
} from "../../InterfacesTypes/GoodsInterface";
import GoodsCard from "../GoodsCard/GoodsCard";
import s from "./GoodsCategories..module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import classNames from "classnames";
import SectionName from "../SectionName/SectionName";

// Import css files

interface IGoodsCategories {
    sectionName: string;
    goods: Array<
        IDrinks | ISoup | IAlcohols | IBeer | IHotDish | ISnack
    > | null;
}

const GoodsCategories: FC<IGoodsCategories> = ({ sectionName, goods }) => {
    const goodsCardList = goods?.map((goodsItem) => (
        <SwiperSlide key={goodsItem.name}>
            <GoodsCard goods={goodsItem} />
        </SwiperSlide>
    ));

    return (
        <section className={classNames(s.wrapper, "categoriesWrapper")}>
            <SectionName>{sectionName}</SectionName>
            {goods ? (
                <ul>
                    <Swiper
                        centeredSlides
                        initialSlide={3}
                        slidesPerView={"auto"}
                    >
                        {goodsCardList}
                    </Swiper>
                </ul>
            ) : (
                <h2>Товару немає(</h2>
            )}
        </section>
    );
};

export default GoodsCategories;
