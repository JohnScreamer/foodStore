import { FC, useEffect } from "react";
import s from "./ModalWindow.module.scss";
interface ModalWindow {
    children: React.ReactNode;
    callback: (status: boolean) => void;
}
const ModalWindow: FC<ModalWindow> = ({ children, callback }) => {
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
        <div className={s.wrapper}>
            <div className={s.window}>
                <button onClick={closeWindow}>
                    <span className={s.btnOne}></span>
                    <span className={s.btnTwo}></span>
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;
