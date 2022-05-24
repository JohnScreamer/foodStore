import { FC } from "react";
import { IProfile } from "../../Redux/Reducers/UserProfile";
import s from "./AdminUserList.module.scss";
interface IAdminUserList {
    userProfile: IProfile;
}
const AdminUserList: FC<IAdminUserList> = ({ userProfile }) => {
    const orderList = userProfile.userOrderHistory.map((order) => (
        <li className={s.order}></li>
    ));
    return (
        <div>
            <h4>Name:{userProfile.name}</h4>
            <span>{userProfile.id}</span>
        </div>
    );
};

export default AdminUserList;
