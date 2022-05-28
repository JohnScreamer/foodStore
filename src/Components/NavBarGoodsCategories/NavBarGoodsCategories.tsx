import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import s from "./NavBarGoodsCategories.module.scss";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

interface INavBarList {
    name: string;
    url: string;
}
const NavBarList: Array<INavBarList> = [
    { name: "Головна", url: "/" },
    { name: "Усі товари", url: "/allGoods" },
    { name: "Закуски", url: "/categories/snacks" },
    { name: "Гарячі страви", url: "/categories/hotDish" },
    { name: "Алкоголь", url: "/categories/alcohols" },
    { name: "Пиво", url: "/categories/beers" },
    { name: "Холодні напої", url: "/categories/drinks" },
    { name: "Супи", url: "/categories/soups" },
    { name: "Акції", url: "/discount" },
];

const NavBarGoodsCategories = () => {
    const NavList = NavBarList.map((link) => (
        <SwiperSlide key={link.name} style={{ width: "auto" }}>
            <li>
                <NavLink to={link.url}>{link.name}</NavLink>
            </li>
        </SwiperSlide>
    ));

    return (
        <nav className={s.navWrapper}>
            <ul className={classNames(s.navList, "navBarInner")}>
                <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={30}
                    className="mySwiper"
                >
                    {NavList}
                </Swiper>
            </ul>
        </nav>
    );
};

export default NavBarGoodsCategories;
