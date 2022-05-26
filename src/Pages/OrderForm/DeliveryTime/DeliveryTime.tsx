import classNames from "classnames";
import { FC, useRef, useState } from "react";
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
    const [personCount, setPersonCount] = useState(1);
    const handlerCountPerson = (type: "plus" | "minus") => {
        if (type === "minus" && personCount > 1) {
            setPersonCount((prevState: number) => prevState - 1);
        }
        if (type === "plus" && personCount < 20) {
            console.log("les");

            setPersonCount((prevState: number) => (prevState = prevState + 1));
        }
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
                    <div className={s.personWrapper}>
                        <label htmlFor="persons">Кількість персон</label>
                        <span onClick={() => handlerCountPerson("minus")}>
                            -
                        </span>

                        <Input
                            id={"persons"}
                            number
                            startValue={personCount}
                            onChange={setPersonCount}
                            control={{
                                ...register("person"),
                            }}
                            placeholder="Кількість персон"
                        ></Input>
                        <span onClick={() => handlerCountPerson("plus")}>
                            +
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeliveryTime;
