import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import s from "./NavBarGoodsCategories.module.scss";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

const NavBarGoodsCategories = () => {
    return (
        <nav className={s.navWrapper}>
            <ul className={classNames(s.navList, "navBarInner")}>
                <Swiper
                    centeredSlides
                    initialSlide={3}
                    spaceBetween={20}
                    slidesPerView={"auto"}
                    breakpoints={{
                        1050: {
                            width: 1050,
                            slidesPerView: "auto",
                            noSwiping: true,
                            noSwipingClass: "swiper-slide",
                        },
                    }}
                >
                    <SwiperSlide>
                        <li>
                            <NavLink to={"/"}>Головна</NavLink>
                        </li>
                    </SwiperSlide>
                    <SwiperSlide>
                        <li>
                            <NavLink to={"/allGoods"}>Усі товари</NavLink>
                        </li>
                    </SwiperSlide>

                    <SwiperSlide>
                        <li>
                            <NavLink to={"/categories/snacks"}>Закуски</NavLink>
                        </li>
                    </SwiperSlide>
                    <SwiperSlide>
                        <li>
                            <NavLink to={"/categories/hotDish"}>
                                Гарячі страви
                            </NavLink>
                        </li>
                    </SwiperSlide>

                    <SwiperSlide>
                        <li>
                            <NavLink to={"/categories/alcohols"}>
                                Алкоголь
                            </NavLink>
                        </li>
                    </SwiperSlide>
                    <SwiperSlide>
                        <li>
                            <NavLink to={"/categories/beers"}>Пиво</NavLink>
                        </li>
                    </SwiperSlide>

                    <SwiperSlide>
                        <li>
                            <NavLink to={"/categories/drinks"}>
                                Холодні напої
                            </NavLink>
                        </li>
                    </SwiperSlide>
                    <SwiperSlide>
                        <li>
                            <NavLink to={"/categories/soups"}>Супи</NavLink>
                        </li>
                    </SwiperSlide>
                    <SwiperSlide>
                        <li>
                            <NavLink to={"/discount"}>Акції</NavLink>
                        </li>
                    </SwiperSlide>
                </Swiper>
            </ul>
        </nav>
    );
};

export default NavBarGoodsCategories;
