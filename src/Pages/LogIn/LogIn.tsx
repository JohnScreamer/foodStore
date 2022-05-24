import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CasualBtn from "../../Components/Buttons/CasualBtn/CasualBtn";
import { useAppDispatch } from "../../Hooks/common";
import { logIn } from "../../Redux/Reducers/UserProfile";
import s from "./LogIng.module.scss";
interface LogIn {
    setSigIn: (status: boolean) => void;
    setLoginStatus: (status: boolean) => void;
}

const LogIn: FC<LogIn> = ({ setSigIn, setLoginStatus }) => {
    const dispatch = useAppDispatch();
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm();
    const onSubmit: SubmitHandler<any> = (data) => {
        dispatch(logIn(data));
        setLoginStatus(false);
        reset();
    };
    const showSigIn = () => {
        setSigIn(true);
        setLoginStatus(false);
    };
    return (
        <div className={s.logIn}>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Імя</label>
                <input
                    {...register("name", { required: true })}
                    id="name"
                    type="name"
                />
                <label htmlFor="password">Пароль</label>
                <input
                    {...register("password", { required: true })}
                    id="password"
                    type="password"
                />
                <CasualBtn fill br submit>
                    Вхід
                </CasualBtn>
            </form>
            <CasualBtn br callBack={showSigIn}>
                Реєстрація
            </CasualBtn>
        </div>
    );
};

export default LogIn;
