import classNames from "classnames";
import { FC } from "react";
import s from "./PlusMinusBtn.module.scss";

interface IPlusMinusBtn {
    type: "plus" | "min" | "x";
    br100?: boolean;
    small?: boolean;
    rotate?: boolean;
    callBack: () => void;
}

const PlusMinusBtn: FC<IPlusMinusBtn> = ({
    type,
    rotate,
    callBack,
    br100,
    small,
}) => {
    return (
        <button
            className={classNames(s.btn, {
                [s.br100]: br100,
                [s.small]: small,
                [s.rotate]: rotate,
            })}
            onClick={callBack}
        >
            {type === "min" && <span className={s.minus}></span>}
            {type === "plus" && (
                <>
                    <span className={s.plusOne}></span>
                    <span className={s.plusTwo}></span>
                </>
            )}
            {type === "x" && (
                <>
                    <span className={s.xOne}></span>
                    <span className={s.xTwo}></span>
                </>
            )}
        </button>
    );
};

export default PlusMinusBtn;
