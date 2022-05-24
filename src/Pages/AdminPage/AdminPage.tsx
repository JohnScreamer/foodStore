import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/common";
import { GetAllOrders, GetAllUsers } from "../../Redux/Reducers/UserProfile";
import s from "./AdminPage.module.scss";

const AdminPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(GetAllOrders());
        dispatch(GetAllUsers());
    }, []);
    const adminInfo = useAppSelector((state) => state.UserProfile.adminInfo);
    const orderList = adminInfo?.orderHistory.map((order) => <li></li>);
    const userList = adminInfo?.allUsers.map((user) => (
        <li key={user.id}>
            <h4>{user.name}</h4>
        </li>
    ));
    return <main></main>;
};

export default AdminPage;
