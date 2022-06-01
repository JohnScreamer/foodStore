import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CasualBtn from "../../Components/Buttons/CasualBtn/CasualBtn";
import EditCardForm from "../../Components/EditCardForm/EditCardForm";
import ModalWindow from "../../Components/ModalWindow/ModalWindow";
import SectionName from "../../Components/SectionName/SectionName";
import { useAppDispatch, useAppSelector } from "../../Hooks/common";
import { RequestAllGoods } from "../../Redux/Reducers/GoodsReducer";
import {
    AddNewGoods,
    cleanEditGoods,
    DeleteGoods,
    EdithGoods,
} from "../../Redux/Reducers/UserProfile";
import s from "./EditCard.module.scss";
const EditCard: FC = () => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const goods = useAppSelector((state) => state.UserProfile.editGoods);
    const dispatch = useAppDispatch();
    const [showModal, setModalStatus] = useState(false);
    const [showModalDelete, setModalDeleteStatus] = useState(false);

    useEffect(() => {
        return () => {
            dispatch(cleanEditGoods());
        };
    }, []);
    const handlerDeleteGoods = () => {
        if (goods) {
            dispatch(DeleteGoods(goods.id));
            setModalDeleteStatus(true);
            dispatch(RequestAllGoods());
        }
    };

    const onSubmit = (data: any) => {
        console.log({ ...data, id: new Date().getTime() });
        if (goods) {
            dispatch(
                EdithGoods({
                    goods: { ...data, price: Number(data.price) },
                    id: goods.id,
                })
            );
            setModalStatus(true);
            dispatch(RequestAllGoods());
        } else {
            dispatch(
                AddNewGoods({
                    ...data,
                    id: new Date().getTime(),
                    price: Number(data.price),
                })
            );
            setModalStatus(true);
            dispatch(RequestAllGoods());
        }
    };
    console.log(errors);

    if (goods)
        return (
            <>
                {showModal && (
                    <ModalWindow
                        hasBtnClose
                        callback={() => setModalStatus(!showModal)}
                    >
                        <h1>Товар успішно змінений!</h1>
                    </ModalWindow>
                )}
                {showModalDelete && (
                    <ModalWindow
                        hasBtnClose
                        callback={() => setModalDeleteStatus(!showModalDelete)}
                    >
                        <h1>Товар успішно видалений!</h1>
                    </ModalWindow>
                )}
                <main className={s.wrapper}>
                    <SectionName>Редагувати товар</SectionName>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <EditCardForm
                            control={control}
                            register={register}
                            errors={errors}
                            goods={goods}
                        />
                        <div className={s.btnWrapper}>
                            <CasualBtn submit br fill>
                                Редагувати товар
                            </CasualBtn>
                        </div>
                    </form>
                    <div className={s.btnWrapper}>
                        <CasualBtn
                            submit
                            br
                            red
                            callBack={() => handlerDeleteGoods()}
                        >
                            Видалити товар
                        </CasualBtn>
                    </div>
                </main>
            </>
        );
    return (
        <>
            {" "}
            {showModal && (
                <ModalWindow
                    hasBtnClose
                    callback={() => setModalStatus(!showModal)}
                >
                    <h1>Товар успішно створений!</h1>
                </ModalWindow>
            )}
            <main className={s.wrapper}>
                <SectionName>Створити товар</SectionName>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <EditCardForm
                        control={control}
                        register={register}
                        errors={errors}
                    />
                    <div className={s.btnWrapper}>
                        <CasualBtn submit br fill>
                            Добавити товар
                        </CasualBtn>
                    </div>
                </form>
            </main>
        </>
    );
};

export default EditCard;
