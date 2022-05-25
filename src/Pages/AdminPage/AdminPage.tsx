import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminOrderList from "../../Components/AdminOrderList/AdminOrderList";
import { useAppDispatch, useAppSelector } from "../../Hooks/common";
import { GetAllOrders } from "../../Redux/Reducers/UserProfile";
import s from "./AdminPage.module.scss";
interface IAdminPage {
    setLoginStatus: (status: boolean) => void;
}
const AdminPage: FC<IAdminPage> = ({ setLoginStatus }) => {
    const isAdmin = useAppSelector(
        (state) => state.UserProfile.profile?.isAdmin
    );
    const location = useLocation();
    console.log(location);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAdmin) {
            navigate("/");
            setLoginStatus(true);
        }
        dispatch(GetAllOrders());
    }, []);

    const dispatch = useAppDispatch();

    const adminInfo = useAppSelector((state) => state.UserProfile.adminInfo);
    const orderList = adminInfo?.orderHistory ? adminInfo?.orderHistory : [];

    return (
        <main className={s.wrapper}>
            <h2>All Orders</h2>
            <div>{<AdminOrderList allOrders={orderList} />}</div>
        </main>
    );
};

export default AdminPage;
