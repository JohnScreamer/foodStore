import classNames from "classnames";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CasualBtn from "../../Components/Buttons/CasualBtn/CasualBtn";
import Input from "../../Components/Input/Input";
import DropList from "../../Components/Select/Select";
import {
    activeFiled,
    IActiveFields,
    IFormOrder,
    restaurants,
} from "../../InterfacesTypes/FormOrderTypes";
import Agreement from "./Agreement/Agreement";
import ContactInfo from "./ContactInfo/ContactInfo";
import DeliveryTime from "./DeliveryType/DeliveryType";
import DeliveryType from "./DeliveryTime/DeliveryTime";
import s from "./OrderForm.module.scss";
import Payment from "./Payment/Payment";
import { useAppDispatch, useAppSelector } from "../../Hooks/common";
import { addOrder } from "../../Redux/Reducers/UserProfile";
import ModalWindow from "../../Components/ModalWindow/ModalWindow";
import OrderDone from "../OrderDone/OrderDone";
import SectionName from "../../Components/SectionName/SectionName";
import { useNavigate } from "react-router-dom";
import PriceError from "../../Components/PriceError/PriceError";
const OrderForm: FC = () => {
    const [activeFieldsStatus, setFieldsStatus] =
        useState<IActiveFields>(activeFiled);
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const totalPrice = useAppSelector((state) => state.cart.totalPrice);
    const dispatch = useAppDispatch();
    const [showModalDone, setShowModalDone] = useState(false);
    const onSubmit: SubmitHandler<any> = (data) => {
        if (totalPrice > 300) {
            dispatch(addOrder(data));
            setShowModalDone(true);
        } else {
            setPriceError(true);
        }
    };
    const navigate = useNavigate();
    const [priceError, setPriceError] = useState(false);

    return (
        <>
            <main className={s.wrapper}>
                <div className={s.topWrapper}>
                    <button
                        className={s.backBtn}
                        onClick={() => navigate("/cart")}
                    >
                        {" "}
                        <span></span>До корзини
                    </button>{" "}
                    <SectionName>Оформлення замовлення</SectionName>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ContactInfo errors={errors} register={register} />
                    <DeliveryTime
                        activeFieldsStatus={activeFieldsStatus}
                        setFieldsStatus={setFieldsStatus}
                        errors={errors}
                        register={register}
                        control={control}
                    />
                    <Payment
                        activeFieldsStatus={activeFieldsStatus}
                        setFieldsStatus={setFieldsStatus}
                        errors={errors}
                        register={register}
                        control={control}
                    />
                    <DeliveryType
                        activeFieldsStatus={activeFieldsStatus}
                        setFieldsStatus={setFieldsStatus}
                        errors={errors}
                        register={register}
                        control={control}
                    />
                    <Agreement
                        activeFieldsStatus={activeFieldsStatus}
                        setFieldsStatus={setFieldsStatus}
                        errors={errors}
                        register={register}
                        control={control}
                    />
                </form>
            </main>
            {showModalDone && (
                <ModalWindow callback={setShowModalDone}>
                    <OrderDone />
                </ModalWindow>
            )}
            {priceError && (
                <ModalWindow callback={() => setPriceError(false)}>
                    <PriceError setModalStatus={setPriceError} />
                </ModalWindow>
            )}
        </>
    );
};

export default OrderForm;