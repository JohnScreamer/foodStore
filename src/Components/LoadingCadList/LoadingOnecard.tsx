import { FC } from "react";
import s from "./LoadingCadList.module.scss";

const LoadingIOneCard: FC = () => {
    return (
        <>
            <div className={s.wrapper}>
                <div className={s.img}></div>
                <div className={s.contentWrapper}>
                    <div className={s.topCard}>
                        <div className={s.name}> </div>
                        <div className={s.weight}></div>
                    </div>
                    <span className={s.description}> </span>
                    <div className={s.bottomCard}>
                        <span className={s.price}></span>
                        <span className={s.btn}></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoadingIOneCard;
