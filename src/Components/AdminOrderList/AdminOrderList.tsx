import { FC } from "react";
import { IFormOrder } from "../../InterfacesTypes/FormOrderTypes";
import s from "./AdminOrderList.module.scss";
import Orders from "./Orders";
interface IAdminOrderList {
    allOrders: Array<IFormOrder>;
}
const AdminOrderList: FC<IAdminOrderList> = ({ allOrders }) => {
    const orderList = allOrders.map((order) => (
        <li key={order.id} className={s.order}>
            <div className={s.AdminOrderList}>
                <div className={s.userInfo}>
                    <h4>Order id:{order.id}</h4>
                    <span>
                        Call back:
                        <b>{order.callBack ? "перезвонити" : "не звонити"}</b>
                    </span>
                    <span>
                        Name:<b>{order.name}</b>
                    </span>
                    <span>
                        Persons:<b>{order.person}</b>
                    </span>
                    <span>
                        Restaurant:<b>{order.restaurant}</b>
                    </span>
                    <span>
                        Phone:<b>{order.phone}</b>
                    </span>
                    <span>
                        Porch number:<b>{order.porchNumber}</b>
                    </span>
                    <span>
                        Street:<b>{order.street}</b>
                    </span>
                    <span>
                        Floor:<b>{order.floor}</b>
                    </span>
                    <span>
                        Comment:<b>{order.comment}</b>
                    </span>
                    <span>
                        Flat number:<b>{order.flatNum}</b>
                    </span>
                    <span>
                        Order time:<b>{`${new Date(order.id * 1000)}`}</b>
                    </span>
                </div>
                <div className={s.goodsOrder}>
                    <h4>Goods list:</h4>
                    {order.orderList && <Orders orderArr={order.orderList} />}
                </div>
            </div>
        </li>
    ));
    return (
        <div>
            <ul>{orderList}</ul>
        </div>
    );
};

export default AdminOrderList;
