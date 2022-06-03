import classNames from "classnames";
import { FC } from "react";
import CasualBtn from "../../../Components/Buttons/CasualBtn/CasualBtn";
import s from "./../OrderForm.module.scss";

const Payment: FC<any> = ({ activeFieldsStatus, setFieldsStatus }) => {
    const handlerPaymentType = (
        type: "cash" | "onlineCard" | "courierCard"
    ) => {
        setFieldsStatus((state: any) => {
            if (state.paymentType !== type) {
                return { ...state, paymentType: type };
            }
            return state;
        });
    };
    return (
        <>
            <div className={classNames(s.section, s.payment)}>
                <h2>3. Оплата</h2>
                <div className={s.paymentWrapper}>
                    <CasualBtn
                        brl
                        fill={activeFieldsStatus.paymentType === "onlineCard"}
                        callBack={() => handlerPaymentType("onlineCard")}
                    >
                        Оплата онлайн
                    </CasualBtn>
                    <CasualBtn
                        fill={activeFieldsStatus.paymentType === "courierCard"}
                        callBack={() => handlerPaymentType("courierCard")}
                    >
                        Курєру картою
                    </CasualBtn>
                    <CasualBtn
                        brr
                        fill={activeFieldsStatus.paymentType === "cash"}
                        callBack={() => handlerPaymentType("cash")}
                    >
                        Готівкою
                    </CasualBtn>
                </div>
            </div>
        </>
    );
};

export default Payment;
