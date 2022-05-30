import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/common";
import {
    IDrinks,
    ISoup,
    IAlcohols,
    IBeer,
    IHotDish,
    ISnack,
} from "../../InterfacesTypes/GoodsInterface";
import {
    addToCart,
    removeItemFromCart,
} from "../../Redux/Reducers/CartReducer";
import { addEditGoods } from "../../Redux/Reducers/UserProfile";
import AddCartBtn from "../Buttons/AddCartBtn/AddCartBtn";
import PlusMinusBtn from "../Buttons/PlusMinusBtn/PlusMinusBtn";
import s from "./GoodsCard.module.scss";

export interface IGoodsCard {
    goods: IDrinks | ISoup | IAlcohols | IBeer | IHotDish | ISnack;
}

const GoodsCard: FC<IGoodsCard> = ({ goods }) => {
    const cart = useAppSelector((state) => state.cart.cart);
    const isAdmin = useAppSelector(
        (state) => state.UserProfile.profile?.isAdmin
    );
    const dispatch = useAppDispatch();
    const isInCart = cart.find((cartItem) => cartItem.id === goods.id);

    const handlerRemoveFromCart = () => {
        dispatch(removeItemFromCart(goods.id));
    };
    const handlerAddToCart = () => {
        dispatch(addToCart(goods));
    };
    const navigate = useNavigate();
    const handlerToEditGoods = () => {
        dispatch(addEditGoods(goods));
        navigate("/cardEditor");
    };
    return (
        <li className={s.cardWrapper} style={{}}>
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
                        {isAdmin ? (
                            <button
                                className={s.btnEdit}
                                onClick={handlerToEditGoods}
                            >
                                <svg
                                    version="1.1"
                                    id="Capa_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 55.25 55.25"
                                >
                                    <g>
                                        <path
                                            d="M0.523,51.933l-0.497,2.085c-0.016,0.067-0.02,0.135-0.022,0.202C0.004,54.234,0,54.246,0,54.259
		c0.001,0.114,0.026,0.225,0.065,0.332c0.009,0.025,0.019,0.047,0.03,0.071c0.049,0.107,0.11,0.21,0.196,0.296
		c0.095,0.095,0.207,0.168,0.328,0.218c0.121,0.05,0.25,0.075,0.379,0.075c0.077,0,0.155-0.009,0.231-0.027l2.086-0.497
		L0.523,51.933z"
                                        />
                                        <path
                                            d="M52.618,2.631c-3.51-3.508-9.219-3.508-12.729,0L3.827,38.693C3.81,38.71,3.8,38.731,3.785,38.749
		c-0.021,0.024-0.039,0.05-0.058,0.076c-0.053,0.074-0.094,0.153-0.125,0.239c-0.009,0.026-0.022,0.049-0.029,0.075
		c-0.003,0.01-0.009,0.02-0.012,0.03l-2.495,10.48L5.6,54.182l10.48-2.495c0.027-0.006,0.051-0.021,0.077-0.03
		c0.034-0.011,0.066-0.024,0.099-0.039c0.072-0.033,0.139-0.074,0.201-0.123c0.024-0.019,0.049-0.033,0.072-0.054
		c0.008-0.008,0.018-0.012,0.026-0.02l36.063-36.063C56.127,11.85,56.127,6.14,52.618,2.631z M17.157,47.992l0.354-3.183
		L39.889,22.43c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0L16.097,43.395l-4.773,0.53l0.53-4.773l22.38-22.378
		c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0L10.44,37.738l-3.183,0.354L34.94,10.409l9.9,9.9L17.157,47.992z
		 M46.254,18.895l-9.9-9.9l1.414-1.414l9.9,9.9L46.254,18.895z M49.082,16.067l-9.9-9.9l1.415-1.415l9.9,9.9L49.082,16.067z"
                                        />
                                    </g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                </svg>
                            </button>
                        ) : (
                            <AddCartBtn
                                text="В корзину"
                                callBack={handlerAddToCart}
                            />
                        )}
                    </div>
                )}
            </div>
        </li>
    );
};

export default GoodsCard;
