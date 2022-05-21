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
                        {errors.name && <h6>Коректне ім'я.</h6>}
                        <Input
                            control={{
                                ...register("name", { required: true }),
                            }}
                            error={errors.name}
                            placeholder="Імя"
                        />
                    </div>
                    <div className={classNames(s.phone, s.relative)}>
                        {errors.phone && <h6>Валідний номер</h6>}
                        <Input
                            number
                            error={errors.phone}
                            control={{
                                ...register("phone", { required: true }),
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
