import { useAppSelector } from "../../Hooks/common";
import s from "./OrderDone.module.scss";
const OrderDone = () => {
    const { cart, totalPrice } = useAppSelector((state) => state.cart);
    const userInfo = useAppSelector((state) => state.UserProfile.orderHistory);
    const itemList = cart.map((goods) => (
        <li key={goods.id}>
            <span>{goods.name}</span>
            <span>{goods.amount}</span>
        </li>
    ));
    return (
        <div className={s.check}>
            <ul>{itemList}</ul>
            <div>Загальна сума:{totalPrice} Грн</div>
            <div>Спс за замовлення </div>
        </div>
    );
};

export default OrderDone;
