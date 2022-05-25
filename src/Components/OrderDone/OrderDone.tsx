import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/common";
import { clearCart } from "../../Redux/Reducers/CartReducer";

import CasualBtn from "../Buttons/CasualBtn/CasualBtn";
import s from "./OrderDone.module.scss";
const OrderDone = () => {
    const dispatch = useAppDispatch();
    const { cart, totalPrice } = useAppSelector((state) => state.cart);
    const userInfo = useAppSelector((state) => state.UserProfile.lastOrder);
    const itemList = cart.map((goods) => (
        <li key={goods.id}>
            <span className={s.itemName}>{goods.name}</span>
            <span className={s.itemPrice}>Кількість...{goods.amount}</span>
        </li>
    ));
    const navigate = useNavigate();
    const toPage = (page: string) => {
        dispatch(clearCart());
        navigate(page);
    };

    return (
        <>
            <div className={s.check}>
                <h2>Чек</h2>
                <ul>{itemList}</ul>
                <div className={s.totalPrice}>
                    Загальна сума:<span>{totalPrice}</span> Грн
                </div>
                <div className={s.comment}>
                    Дякуємо за замовлення:{" "}
                    <span className={s.userName}>{userInfo?.name}</span>
                </div>
                {userInfo?.person && (
                    <div className={s.personNum}>
                        Прибори для {userInfo?.person} людей
                    </div>
                )}
                {userInfo?.callBack && (
                    <div className={s.personPhone}>
                        Ми вам передзвоним на цей номер:{" "}
                        <span className={s.userPhone}>{userInfo?.phone}</span>
                    </div>
                )}
                {userInfo?.street && (
                    <div className={s.userAndres}>
                        Адрес доставки:вул.{" "}
                        <span className={s.street}>{userInfo?.street}</span>,
                        буддинок{" "}
                        <span className={s.street}>
                            {userInfo?.houseNumber}
                        </span>
                        , кв
                        <span className={s.street}>{userInfo?.flatNum}</span>.
                    </div>
                )}
                {userInfo?.restaurant && (
                    <div className={s.restaurant}>
                        Ваше замовлення буде в:{" "}
                        <span className={s.userPhone}>
                            {userInfo?.restaurant}
                        </span>
                    </div>
                )}
                <div className={s.btnWrapper}>
                    {" "}
                    <CasualBtn br fill callBack={() => toPage("/")}>
                        На головну
                    </CasualBtn>{" "}
                    <CasualBtn br callBack={() => toPage("/allGoods")}>
                        Меню
                    </CasualBtn>
                </div>
            </div>
        </>
    );
};

export default OrderDone;
