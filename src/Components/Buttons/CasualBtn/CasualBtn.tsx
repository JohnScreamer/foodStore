import classNames from "classnames";
import { FC } from "react";
import s from "./CasualBtn.module.scss";
interface ICasualBtn {
    children: string;
    submit?: boolean;
    br?: boolean;
    brl?: boolean;
    brr?: boolean;
    fill?: boolean;
    callBack?: () => void;
    red?: boolean;
}
const CasualBtn: FC<ICasualBtn> = ({
    children,
    red,
    br,
    brl,
    brr,
    fill,
    callBack,
    submit,
}) => {
    if (callBack) {
        const handlerBtn = (e: any) => {
            e.preventDefault();
            callBack();
        };

        return (
            <button
                onClick={handlerBtn}
                className={classNames(s.btn, {
                    [s.br]: br,
                    [s.brl]: brl,
                    [s.brr]: brr,
                    [s.fill]: fill,
                    [s.red]: red,
                })}
            >
                {children}
            </button>
        );
    }
    if (submit) {
        return (
            <button
                type="submit"
                className={classNames(s.btn, {
                    [s.br]: br,
                    [s.brl]: brl,
                    [s.brr]: brr,
                    [s.fill]: fill,
                    [s.red]: red,
                })}
            >
                {children}
            </button>
        );
    }
    return (
        <button
            className={classNames(s.btn, {
                [s.br]: br,
                [s.brl]: brl,
                [s.brr]: brr,
                [s.fill]: fill,
                [s.red]: red,
            })}
        >
            {children}
        </button>
    );
};

export default CasualBtn;
