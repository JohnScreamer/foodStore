import classNames from "classnames";
import { FC } from "react";
import CasualBtn from "../../../Components/Buttons/CasualBtn/CasualBtn";
import s from "./../OrderForm.module.scss";
const Agreement: FC<any> = ({
    activeFieldsStatus,
    setFieldsStatus,

    errors,
    register,
    control,
}) => {
    return (
        <>
            <div className={classNames(s.section, s.agreement, s.relative)}>
                {errors.agreement && <h6>Обовязкове потрібно підтвердити.</h6>}
                <input
                    id="agreement"
                    className={s.inputAgree}
                    {...register("agreement", { required: true })}
                    type="checkbox"
                />
                <label className={s.inputLabel} htmlFor="agreement"></label>

                <label className={s.text} htmlFor="agreement">
                    Я погоджуюсь на обробку моїх персональних данних згідно з{" "}
                    <b>Умовами</b>
                </label>
                <CasualBtn br fill submit>
                    Оформити заказ
                </CasualBtn>
            </div>
        </>
    );
};

export default Agreement;
