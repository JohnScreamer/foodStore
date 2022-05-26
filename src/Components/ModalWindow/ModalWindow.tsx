import classNames from "classnames";
import { FC, useEffect } from "react";
import s from "./ModalWindow.module.scss";
import Confetti from "react-confetti";
interface ModalWindow {
    children: React.ReactNode;
    callback: (status: boolean) => void;
    hasBtnClose?: boolean;
    confetti?: boolean;
}
const ModalWindow: FC<ModalWindow> = ({
    children,
    callback,
    hasBtnClose,
    confetti,
}) => {
    const closeWindow = () => {
        callback(false);
    };
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <>
            <div className={s.wrapper}>
                {confetti && (
                    <div className={s.confettiWrapper}>
                        <Confetti />
                    </div>
                )}
                <div className={s.window}>
                    {hasBtnClose && (
                        <button onClick={closeWindow}>
                            <span className={classNames(s.btnOne)}></span>
                            <span className={classNames(s.btnTwo)}></span>
                        </button>
                    )}
                    {children}
                </div>
            </div>
        </>
    );
};

export default ModalWindow;
