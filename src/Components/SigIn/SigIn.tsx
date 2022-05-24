import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../Hooks/common";
import { logIn, sigIn } from "../../Redux/Reducers/UserProfile";
import CasualBtn from "../Buttons/CasualBtn/CasualBtn";
import s from "./SigIn.module.scss";
interface ISigIn {
    setSigIn: (status: boolean) => void;
}
const SigIn: FC<ISigIn> = ({ setSigIn }) => {
    const dispatch = useAppDispatch();
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm();
    const onSubmit: SubmitHandler<any> = (data) => {
        const profile = {
            ...data,
            id: new Date().getTime(),
            isAdmin: false,
            userOrderHistory: [],
        };
        dispatch(sigIn(profile));
        setSigIn(false);
        reset();
    };
    return (
        <div className={s.sigIn}>
            <h2>Sig in</h2>
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
                    Реєстрація
                </CasualBtn>
            </form>
        </div>
    );
};

export default SigIn;
