import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/common";
import { AllGoodsType } from "../../InterfacesTypes/ReducersInterface";
import {
    addToCart,
    removeItemFromCart,
} from "../../Redux/Reducers/CartReducer";
import AddCartBtn from "../Buttons/AddCartBtn/AddCartBtn";
import PlusMinusBtn from "../Buttons/PlusMinusBtn/PlusMinusBtn";
import s from "./GoodsPrewie.module.scss";

export interface IGoodsCard {
    goods: AllGoodsType;
}

const PreviewGoodsCard: FC<IGoodsCard> = ({ goods }) => {
    const cart = useAppSelector((state) => state.cart.cart);
    const dispatch = useAppDispatch();
    const isInCart = cart.find((cartItem) => cartItem.id === goods.id);

    const handlerRemoveFromCart = () => {
        dispatch(removeItemFromCart(goods.id));
    };
    const handlerAddToCart = () => {
        dispatch(addToCart(goods));
    };

    return (
        <li className={s.cardWrapperPreview} style={{}}>
            {isInCart && <span className={s.amount}>{isInCart.amount}</span>}
            <div className={s.imgWrapper}>
                <NavLink to={`/goods/${goods.id}`}>
                    {goods.img ? (
                        <img src={goods.img} alt="goods.Img" />
                    ) : (
                        <img
                            src={"https://i.ibb.co/mSL0vSm/no-image.png"}
                            alt="goods.Img"
                        />
                    )}
                </NavLink>
            </div>
            <div className={s.cardBody}>
                <div className={s.cardHeader}>
                    <NavLink to={`/goods/${goods.id}`}>
                        <span className={s.name}>{goods.name}</span>
                    </NavLink>
                    <span className={s.weightCapacity}>
                        {(goods.weight && "Вага " + goods.weight + " г") ||
                            (goods.capacity && goods.capacity + " Л")}
                    </span>
                </div>
                <p className={s.description}>{goods.description}</p>
                {isInCart ? (
                    <div className={s.bottomWrapper}>
                        <PlusMinusBtn
                            callBack={handlerRemoveFromCart}
                            type="min"
                        />
                        <span className={s.price}>{goods.price + " ₴"}</span>
                        <PlusMinusBtn callBack={handlerAddToCart} type="plus" />
                    </div>
                ) : (
                    <div className={s.bottomWrapper}>
                        <span className={s.price}>{goods.price + " ₴"}</span>{" "}
                        <AddCartBtn
                            disable
                            text="В корзину"
                            callBack={handlerAddToCart}
                        />
                    </div>
                )}
            </div>
        </li>
    );
};

export default PreviewGoodsCard;
