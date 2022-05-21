import { FC } from "react";
import s from "./LoadingCadList.module.scss";
interface ILoadingCardList {
    num: number;
}

const LoadingCardList: FC<ILoadingCardList> = ({ num }) => {
    const itemNum = Array(num).fill(null);
    console.log(itemNum);

    const loadingCardList = itemNum.map((el, index) => (
        <div key={index} className={s.wrapper}>
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
    ));

    return <div className={s.list}>{loadingCardList}</div>;
};

export default LoadingCardList;
