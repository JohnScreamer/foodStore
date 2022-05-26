import classNames from "classnames";
import { FC } from "react";
import Input from "../../../Components/Input/Input";
import s from "./../OrderForm.module.scss";

const ContactInfo: FC<any> = ({ errors, register }) => {
    return (
        <>
            <div className={s.section}>
                <h2>1. Контактна інформація</h2>

                <div className={s.contactInfo}>
                    <div className={classNames(s.name, s.relative)}>
                        {errors?.name?.message && (
                            <h6>{errors.name.message}</h6>
                        )}
                        <Input
                            control={{
                                ...register("name", {
                                    required: true,

                                    minLength: {
                                        value: 3,
                                        message: "мінімум 3 символа",
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "максимум 12 символів",
                                    },
                                }),
                            }}
                            error={errors.name}
                            placeholder="Імя"
                        />
                    </div>
                    <div className={classNames(s.phone, s.relative)}>
                        {errors?.phone?.message && (
                            <h6>{errors.phone.message}</h6>
                        )}
                        <Input
                            number
                            error={errors.phone}
                            control={{
                                ...register("phone", {
                                    required: true,
                                    minLength: {
                                        value: 7,
                                        message: "мінімум 7 символа",
                                    },
                                    maxLength: {
                                        value: 9,
                                        message: "максимум 9 символів",
                                    },
                                }),
                            }}
                            placeholder="Телефон"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactInfo;
