import classnames from "classnames";
import { FC, useEffect, useRef, useState } from "react";
import s from "./Burger.module.scss";

interface IBurger {
    toggleModal: (showPopUpBurger: boolean) => void;
    showPopUpBurger: boolean;
    burgerRef: any;
}

const Burger: FC<IBurger> = ({ toggleModal, showPopUpBurger, burgerRef }) => {
    const [activeBurg, setActiveBurg] = useState(false);

    const burgerHandler = () => {
        toggleModal(!showPopUpBurger);
        setActiveBurg((prev) => !prev);
    };
    const closeBurger = (e: any) => {
        if (!e.path.includes(burgerRef.current)) {
            setActiveBurg(false);
        }
    };
    useEffect(() => {
        window.document.addEventListener("click", closeBurger);
        return () => {
            window.document.removeEventListener("click", closeBurger);
        };
    }, []);

    return (
        <button
            ref={burgerRef}
            className={classnames({
                [s.active]: activeBurg,
                [s.btn]: !activeBurg,
            })}
            onClick={burgerHandler}
        >
            <span className={s.top}></span>
            <span className={s.mid}></span>
            <span className={s.bottom}></span>
            <span className={s.text}>МЕНЮ</span>
        </button>
    );
};

export default Burger;
