import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../Hooks/common";
import CasualBtn from "../Buttons/CasualBtn/CasualBtn";
import s from "./TotalPriceSection.module.scss";
const TotalPriceSection: FC<any> = ({ setPriceError }) => {
    const navigate = useNavigate();
    const totalPrice = useAppSelector((state) => state.cart.totalPrice);
    const toOrder = () => {
        if (totalPrice > 300) {
            navigate("/order");
            return;
        }
        setPriceError(true);
    };
    return (
        <div className={s.totalPriceWrapper}>
            <div className={s.content}>
                <span className={s.priceWrapper}>
                    Загальна сумма:{" "}
                    <span className={s.price}>{totalPrice} ₴</span>
                </span>
                <p>
                    Мінімальна сумма замолення <span>300 ₴</span>{" "}
                </p>
            </div>
            <CasualBtn callBack={toOrder} br fill>
                Оформити звказ
            </CasualBtn>
        </div>
    );
};

export default TotalPriceSection;
