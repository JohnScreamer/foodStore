import { FC, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/common";
import { logOut } from "../../Redux/Reducers/UserProfile";
import s from "./BurgerPopUp.module.scss";
interface IBurgerPopUp {
    setPopUpStatus: (status: boolean) => void;
    setLoginStatus: (status: boolean) => void;
    showPopUpBurger: boolean;
    burgerRef: any;
}
const BurgerPopUp: FC<IBurgerPopUp> = ({
    setPopUpStatus,
    showPopUpBurger,
    burgerRef,
    setLoginStatus,
}) => {
    const navigate = useNavigate();
    const GoTo = (url: string) => {
        navigate(`${url}`);
        setPopUpStatus(false);
    };
    const isAuth = useAppSelector((state) => state.UserProfile.profile?.name);
    const popUpBurgerRef = useRef(null);
    const closePopUpBurger = (e: any) => {
        if (
            !e.path.includes(popUpBurgerRef.current) &&
            !e.path.includes(burgerRef.current)
        ) {
            setPopUpStatus(false);
        }
    };
    const dispatch = useAppDispatch();
    useEffect(() => {
        document.addEventListener("click", closePopUpBurger);
        return () => {
            document.removeEventListener("click", closePopUpBurger);
        };
    }, []);
    const isAdmin = useAppSelector(
        (state) => state.UserProfile.profile?.isAdmin
    );

    return (
        <div className={s.burgerPopUp} ref={popUpBurgerRef}>
            <ul>
                <li>
                    <button onClick={() => GoTo("/")}>Головна</button>{" "}
                </li>
                <li>
                    <button onClick={() => GoTo("/allGoods")}>
                        Усі товари
                    </button>
                </li>
                <li>
                    <button onClick={() => GoTo("/categories/snacks")}>
                        Закуски
                    </button>
                </li>{" "}
                <li>
                    <button onClick={() => GoTo("/categories/hotDish")}>
                        Гарячі страви
                    </button>
                </li>{" "}
                <li>
                    <button onClick={() => GoTo("/categories/alcohols")}>
                        {" "}
                        Алкоголь
                    </button>
                </li>
                <li>
                    <button onClick={() => GoTo("/categories/beers")}>
                        Пиво
                    </button>
                </li>{" "}
                <li>
                    <button onClick={() => GoTo("/categories/drinks")}>
                        Холодні напої
                    </button>
                </li>{" "}
                <li>
                    <button onClick={() => GoTo("/categories/soups")}>
                        Супи
                    </button>
                </li>
                <li>
                    <button onClick={() => GoTo("/discount")}>Акції</button>
                </li>
                {isAuth ? (
                    <>
                        <b> user {isAuth}</b>

                        {isAdmin && (
                            <>
                                {" "}
                                <div className={s.admin}>
                                    <NavLink to={"/admin"}>
                                        <b>dashboard</b>
                                    </NavLink>
                                    <NavLink to={"/cardEditor"}>
                                        <b>Add item</b>
                                    </NavLink>
                                </div>
                            </>
                        )}

                        <button
                            className={s.logout}
                            onClick={() => dispatch(logOut())}
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <li>
                        <button onClick={() => setLoginStatus(true)}>
                            Вхід
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default BurgerPopUp;
