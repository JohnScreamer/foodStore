import classNames from "classnames";
import { FC } from "react";
import CasualBtn from "../../../Components/Buttons/CasualBtn/CasualBtn";
import Input from "../../../Components/Input/Input";
import DropList from "../../../Components/Select/Select";
import { restaurants } from "../../../InterfacesTypes/FormOrderTypes";
import s from "./../OrderForm.module.scss";

const DeliveryType: FC<any> = ({
    register,
    errors,
    activeFieldsStatus,
    setFieldsStatus,
    control,
}) => {
    const handlerDeliveryStatus = (type: "delivery" | "selfPickup") => {
        setFieldsStatus((state: any) => {
            if (state.deliveryType !== type) {
                return { ...state, deliveryType: type };
            }
            return state;
        });
    };
    return (
        <>
            <div className={classNames(s.section)}>
                <h2>2 .Доставка</h2>

                <span className={s.btnWrapper}>
                    <CasualBtn
                        fill={activeFieldsStatus.deliveryType === "delivery"}
                        brl
                        callBack={() => handlerDeliveryStatus("delivery")}
                    >
                        Доставка
                    </CasualBtn>
                    <CasualBtn
                        brr
                        fill={activeFieldsStatus.deliveryType === "selfPickup"}
                        callBack={() => handlerDeliveryStatus("selfPickup")}
                    >
                        Самовивіз
                    </CasualBtn>
                </span>
                {activeFieldsStatus.deliveryType == "delivery" ? (
                    <>
                        <h3>Адрес доставки</h3>
                        <div className={s.delivery}>
                            <div className={classNames(s.street, s.relative)}>
                                {errors.street && <h6>Обовязкове поле.</h6>}
                                <Input
                                    error={errors.street}
                                    control={{
                                        ...register("street", {
                                            required: true,
                                        }),
                                    }}
                                    placeholder="Вкажіть вулицю"
                                />
                            </div>
                            <div className={classNames(s.houseNum, s.relative)}>
                                {errors.houseNumber && (
                                    <h6>Обовязкове поле.</h6>
                                )}
                                <Input
                                    number
                                    error={errors.houseNumber}
                                    control={{
                                        ...register("houseNumber", {
                                            required: true,
                                        }),
                                    }}
                                    placeholder="Номер будика"
                                />
                            </div>
                            <div className={s.flatNum}>
                                <Input number placeholder="Номер квартири" />
                            </div>
                            <div className={s.porch}>
                                <Input number placeholder="Підїзд" />
                            </div>
                            <div className={s.floor}>
                                <Input number placeholder="Поверх" />
                            </div>
                            <div className={s.comment}>
                                <Input placeholder="Коментарій" />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h3>Адрес доставки</h3>
                        <div
                            className={classNames(s.selectWrapper, s.relative)}
                        >
                            {errors.restaurant && <h6>Обовязкове поле.</h6>}
                            <DropList
                                rule
                                ruleName="Виберіть ресторан"
                                control={control}
                                name="restaurant"
                                options={restaurants}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default DeliveryType;