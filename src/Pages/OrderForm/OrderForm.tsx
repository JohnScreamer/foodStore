import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    activeFiled,
    IActiveFields,
    IFormOrder,
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
import OrderDone from "../../Components/OrderDone/OrderDone";
import SectionName from "../../Components/SectionName/SectionName";
import { NavLink } from "react-router-dom";
import PriceError from "../../Components/PriceError/PriceError";
import LoadingApiRequest from "../../Components/LoadingApiRequest/LoadingApiRequest";
const OrderForm: FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [activeFieldsStatus, setFieldsStatus] =
        useState<IActiveFields>(activeFiled);
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IFormOrder>();
    const { totalPrice, cart } = useAppSelector((state) => state.cart);
    const { isLoading, error } = useAppSelector((state) => state.UserProfile);
    const dispatch = useAppDispatch();
    const [showModalDone, setShowModalDone] = useState(false);

    const onSubmit: SubmitHandler<IFormOrder> = (data) => {
        if (totalPrice > 299) {
            dispatch(
                addOrder({ ...data, id: new Date().getTime(), orderList: cart })
            );
            setShowModalDone(true);
        } else {
            setPriceError(true);
        }
    };
    const [priceError, setPriceError] = useState(false);

    return (
        <>
            <main className={s.wrapper}>
                {isLoading && <LoadingApiRequest />}
                <div className={s.topWrapper}>
                    <NavLink to={"/cart"}>
                        <button className={s.backBtn}>
                            {" "}
                            <span></span>До корзини
                        </button>{" "}
                    </NavLink>
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
                <ModalWindow confetti callback={setShowModalDone}>
                    <OrderDone />
                </ModalWindow>
            )}
            {priceError && (
                <ModalWindow hasBtnClose callback={() => setPriceError(false)}>
                    <PriceError setModalStatus={setPriceError} />
                </ModalWindow>
            )}
        </>
    );
};

export default OrderForm;
