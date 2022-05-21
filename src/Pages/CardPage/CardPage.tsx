import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RemoveAddBtn from "../../Components/Buttons/RemoveAddBtn/RemoveAddBtn";
import LoadingCard from "../../Components/LoadingCard/LoadingCard";
import NavBarGoodsCategories from "../../Components/NavBarGoodsCategories/NavBarGoodsCategories";
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
    deleteItemFromCart,
} from "../../Redux/Reducers/CartReducer";
import { RequestOneGoodsItem } from "../../Redux/Reducers/GoodsReducer";
import s from "./CardPage.module.scss";

const CardPage = () => {
    const dispatch = useAppDispatch();
    const data = useParams();

    const handlerAddToCart = (
        goodsType: IDrinks | ISoup | IAlcohols | IBeer | IHotDish | ISnack
    ) => {
        dispatch(addToCart(goodsType));
    };
    const handlerDeleteItem = (id: number) => {
        dispatch(deleteItemFromCart(id));
    };

    useEffect(() => {
        data.id && dispatch(RequestOneGoodsItem(+data.id));
    }, [data.id]);
    const { filteredItem, isLoading, error } = useAppSelector(
        (state) => state.goods
    );
    const cart = useAppSelector((state) => state.cart.cart);
    //@ts-ignore
    const hasInCart = cart.find((cartItem) => cartItem.id === +data.id);

    const navigate = useNavigate();
    const GoBack = () => navigate(-1);
    const weightCapacity = filteredItem?.weight
        ? `Вага ${filteredItem?.weight} г`
        : `${filteredItem?.capacity} Л`;

    const card = filteredItem && (
        <div className={s.cardWrapper}>
            <img src={filteredItem.img} alt="goods img" />
            <div className={s.cardContent}>
                <h3>{filteredItem.name}</h3>
                <p>{filteredItem.description}</p>
                <span className={s.weightCapacity}>{weightCapacity}</span>
                <div className={s.cardBottom}>
                    <span className={s.price}>{filteredItem.price} ₴</span>
                    {filteredItem && hasInCart ? (
                        <RemoveAddBtn
                            type="remove"
                            callBack={() => handlerDeleteItem(filteredItem.id)}
                        />
                    ) : (
                        <RemoveAddBtn
                            type="add"
                            callBack={() => handlerAddToCart(filteredItem)}
                        />
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <main className={s.wrapper}>
            <div className={s.navWrapper}>
                <NavBarGoodsCategories />
            </div>
            <div className={s.goBackBtnWrapper}>
                <button className={s.btnBack} id="btnBack" onClick={GoBack}>
                    <span></span>
                </button>
                <label htmlFor="btnBack">Повернутися назад</label>
            </div>
            {isLoading ? <LoadingCard /> : card}
            <div className={s.recommendation}></div>
        </main>
    );
};

export default CardPage;
