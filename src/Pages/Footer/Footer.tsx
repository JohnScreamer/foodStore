import { FC } from "react";
import { NavLink } from "react-router-dom";
import s from "./Footer.module.scss";
interface IFotter {
    headerRef: any;
}
const Footer: FC<IFotter> = ({ headerRef }) => {
    const scrollToHeader = () => {
        headerRef.current.scrollIntoView();
    };
    return (
        <footer className={s.footer}>
            <div className={s.container}>
                <button onClick={scrollToHeader}>
                    <span className={s.left}></span>
                    <span className={s.right}></span>
                </button>
                <div className={s.footerInfoWrapper}>
                    <NavLink to={"/"}>
                        <div>LOGOS</div>
                    </NavLink>
                    <span>
                        © ККК ЙО «Сабаки я Наруто Узумаки» <hr /> Всі права
                        захищенні. 2010-2022
                    </span>
                    <a href="#">Угода користувача </a>
                    <a href="#">Карта сайта</a>
                    <a href="#">Політика конфіденційності</a>
                </div>
                <div className={s.footerLinks}>
                    <a href="#">Про ресторан</a>
                    <a href="">Умови доставки</a>
                    <a href="#">Повернення товара</a>
                    <NavLink to={"/discount"}>Акції</NavLink>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
