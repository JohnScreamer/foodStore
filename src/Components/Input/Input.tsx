import classNames from "classnames";
import { FC } from "react";
import s from "./Input.module.scss";
interface IInput {
    placeholder: string;
    control?: any;
    w100?: boolean;
    w50?: boolean;
    w25?: boolean;
    error?: boolean;
    number?: boolean;
    startValue?: number;
    onChange?: any;
    focus?: boolean;
    id?: string;
}

const Input: FC<IInput> = ({
    placeholder,
    control,
    w25,
    w100,
    w50,
    error,
    number,
    startValue,
    onChange,
    focus,
    id,
}) => {
    const register = control ? control : "";

    if (onChange) {
        return (
            <input
                id={id}
                onChange={(e) => onChange(e.currentTarget.value)}
                value={startValue}
                type={number ? "number" : "text"}
                {...register}
                placeholder={placeholder}
                className={classNames(s.input, {
                    [s.w100]: w100,
                    [s.w50]: w50,
                    [s.w25]: w25,
                    [s.error]: error,
                    [s.focus]: focus,
                })}
            ></input>
        );
    }
    return (
        <input
            type={number ? "number" : "text"}
            {...register}
            placeholder={placeholder}
            className={classNames(s.input, {
                [s.w100]: w100,
                [s.w50]: w50,
                [s.w25]: w25,
                [s.error]: error,
            })}
        ></input>
    );
};

export default Input;
