import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../Hooks/common";
import { IAllGods } from "../../InterfacesTypes/GoodsInterface";
import {
    addToCart,
    deleteItemFromCart,
    removeItemFromCart,
} from "../../Redux/Reducers/CartReducer";
import PlusMinusBtn from "../Buttons/PlusMinusBtn/PlusMinusBtn";
import s from "./CartCard.module.scss";

interface ICartCard {
    goods: IAllGods;
}

const CartCard: FC<ICartCard> = ({ goods }) => {
    const dispatch = useAppDispatch();
    const handlerPlus = (goods: IAllGods) => {
        dispatch(addToCart(goods));
    };
    const handlerMinus = (id: number) => {
        dispatch(removeItemFromCart(id));
    };
    const handlerDelete = (id: number) => {
        dispatch(deleteItemFromCart(id));
    };
    return (
        <li className={s.cardWrapper}>
            <NavLink className={s.imgLink} to={`/goods/${goods.id}`}>
                <img src={goods.img} alt="goods img" />
            </NavLink>

            <div className={s.textWrapper}>
                <NavLink to={`/goods/${goods.id}`}>
                    {" "}
                    <h2>{goods.name}</h2>
                </NavLink>

                <p>{goods.description}</p>
            </div>
            <div className={s.cardNav}>
                <PlusMinusBtn
                    br100
                    small
                    type="min"
                    callBack={() => handlerMinus(goods.id)}
                />
                <span className={s.amount}>{goods.amount}</span>
                <PlusMinusBtn
                    br100
                    small
                    type="plus"
                    callBack={() => handlerPlus(goods)}
                />
            </div>
            <div className={s.cardPrice}>
                <span className={s.price}>
                    {goods.amount && goods.price * goods.amount} ₴
                </span>
                <PlusMinusBtn
                    br100
                    small
                    rotate
                    type="x"
                    callBack={() => handlerDelete(goods.id)}
                />
            </div>
        </li>
    );
};

export default CartCard;
