import { FC } from "react";
import s from "./AdminOrderList.module.scss";

import { AllGoodsType } from "../../InterfacesTypes/ReducersInterface";

interface IOrders {
    orderArr: Array<AllGoodsType>;
}

const Orders: FC<IOrders> = ({ orderArr }) => {
    const orderList = orderArr.map((orderItem) => (
        <li key={orderItem.id} className={s.goodsWrapper}>
            <span>
                <b>{orderItem.name}</b>
            </span>
            <span>
                {" "}
                x<b>{orderItem.amount}</b>
            </span>
        </li>
    ));
    return <ul>{orderList}</ul>;
};

export default Orders;
