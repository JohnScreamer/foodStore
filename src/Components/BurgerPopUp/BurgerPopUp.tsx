import { FC, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import s from "./BurgerPopUp.module.scss";
interface IBurgerPopUp {
    setPopUpStatus: (status: boolean) => void;
    showPopUpBurger: boolean;
    burgerRef: any;
}
const BurgerPopUp: FC<IBurgerPopUp> = ({
    setPopUpStatus,
    showPopUpBurger,
    burgerRef,
}) => {
    const navigate = useNavigate();
    const GoTo = (url: string) => {
        navigate(`${url}`);
        setPopUpStatus(false);
    };
    const popUpBurgerRef = useRef(null);
    const closePopUpBurger = (e: any) => {
        if (
            !e.path.includes(popUpBurgerRef.current) &&
            !e.path.includes(burgerRef.current)
        ) {
            setPopUpStatus(false);
        }
    };
    useEffect(() => {
        document.addEventListener("click", closePopUpBurger);
        return () => {
            document.removeEventListener("click", closePopUpBurger);
        };
    }, []);

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
                    <button>Акції</button>
                </li>
            </ul>
        </div>
    );
};

export default BurgerPopUp;
