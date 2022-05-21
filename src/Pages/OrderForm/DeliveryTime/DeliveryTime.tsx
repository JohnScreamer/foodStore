import classNames from "classnames";
import { FC } from "react";
import CasualBtn from "../../../Components/Buttons/CasualBtn/CasualBtn";
import Input from "../../../Components/Input/Input";
import s from "./../OrderForm.module.scss";
import style from "./DeliweryTime.module.scss";
const DeliveryTime: FC<any> = ({
    activeFieldsStatus,
    setFieldsStatus,
    errors,
    register,
    control,
}) => {
    const handlerDeliveryTime = (type: "inTime" | "asFast") => {
        setFieldsStatus((state: any) => {
            if (state.deliveryTime !== type) {
                return { ...state, deliveryTime: type };
            }
            return state;
        });
    };
    return (
        <>
            <div className={classNames(s.section, s.deliveryTimeWrapper)}>
                <h2>4. Коли доставляти</h2>
                <div className={s.deliveryTime}>
                    <CasualBtn
                        callBack={() => handlerDeliveryTime("asFast")}
                        fill={activeFieldsStatus.deliveryTime === "asFast"}
                        brl
                    >
                        Найближчим часом
                    </CasualBtn>
                    <CasualBtn
                        callBack={() => handlerDeliveryTime("inTime")}
                        fill={activeFieldsStatus.deliveryTime === "inTime"}
                        brr
                    >
                        До години
                    </CasualBtn>
                </div>

                <input
                    {...register("callBack")}
                    type="checkbox"
                    id="callBack"
                    className={style.callBack}
                />

                <label htmlFor="callBack" className={s.callLabel}></label>

                <div
                    className={classNames(
                        s.deliveryTimeContent,
                        style.personWrapper
                    )}
                >
                    <label className={s.h3Wrapper} htmlFor="callBack">
                        <h3 id={s.callBackH3}>Перезвонити вам?</h3>
                    </label>
                    <Input
                        number
                        control={{
                            ...register("person"),
                        }}
                        placeholder="Кількість персон"
                    ></Input>
                </div>
            </div>
        </>
    );
};

export default DeliveryTime;
