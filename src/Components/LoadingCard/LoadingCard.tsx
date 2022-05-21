import s from "./LoadingCard.module.scss";
const LoadingCard = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.img}></div>
            <div className={s.content}>
                <div className={s.name}></div>
                <div className={s.description}></div>
                <div className={s.weight}></div>
                <div className={s.bottom}>
                    <span className={s.btn}></span>
                    <span className={s.price}></span>
                </div>
            </div>
        </div>
    );
};

export default LoadingCard;
