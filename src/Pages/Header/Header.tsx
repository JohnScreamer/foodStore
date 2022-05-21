import { FC, MouseEventHandler, useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import Burger from "../../Components/Buttons/Burger/Burger";
import ToCartBtn from "../../Components/Buttons/ToCartBtn/ToCartBtn";
import NavBarGoodsCategories from "../../Components/NavBarGoodsCategories/NavBarGoodsCategories";
import PictureSlider from "../../Components/PictureSlider/PictureSlider";
import s from "./Header.module.scss";
interface IHeader {
    setModalStatus: (status: boolean) => void;
}
const Header: FC<IHeader> = ({ setModalStatus }) => {
    const searchRef = useRef(null);
    const inputRef: any = useRef(null);
    const data = useParams();
    console.log("header");

    const showe = (e: any) => {
        if (e.target !== searchRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className={s.headerWrapper}>
            <header>
                <div className={s.container}>
                    <Burger toggleModal={() => {}} />
                    <NavLink className={s.logo} to="/">
                        LOGOS
                    </NavLink>
                    <div className={s.inputWrapper} onClick={showe}>
                        <svg
                            className={s.location}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.23914 10.3913C4.25354 6.15071 7.7029 2.72471 11.9435 2.73912C16.1841 2.75353 19.6101 6.20288 19.5957 10.4435V10.5304C19.5435 13.2869 18.0044 15.8348 16.1174 17.8261C15.0382 18.9467 13.8331 19.9388 12.5261 20.7826C12.1766 21.0849 11.6582 21.0849 11.3087 20.7826C9.3602 19.5143 7.65007 17.9131 6.25653 16.0522C5.01449 14.4294 4.3093 12.4597 4.23914 10.4174L4.23914 10.3913Z"
                                stroke="#CFCFCF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle
                                cx="11.9174"
                                cy="10.5391"
                                r="2.46087"
                                stroke="#CFCFCF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Введіть адрес доставки"
                            ref={inputRef}
                        />
                        <svg
                            ref={searchRef}
                            className={s.search}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="11.7666"
                                cy="11.7666"
                                r="8.98856"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M18.0183 18.4851L21.5423 22"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div className={s.contactWrapper}>
                        <span className={s.icon}>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.99329 3.249C2.20417 2.89915 3.36678 1.62917 4.19526 1.66751C4.44311 1.68873 4.66222 1.83798 4.84024 2.01187H4.84092C5.249 2.4117 6.41982 3.92062 6.48555 4.23829C6.64782 5.01739 5.7187 5.46651 6.00284 6.25178C6.72725 8.02428 7.97544 9.27236 9.74879 9.99602C10.5334 10.2808 10.9826 9.35246 11.7618 9.51404C12.0795 9.58045 13.5892 10.7505 13.9884 11.1592V11.1592C14.1616 11.3365 14.3123 11.5563 14.3328 11.8041C14.3636 12.677 13.0148 13.8553 12.7518 14.0059C12.1315 14.4502 11.3222 14.442 10.3356 13.9833C7.58243 12.8379 3.1826 8.52132 2.01588 5.66437C1.56946 4.6833 1.53934 3.86859 1.99329 3.249Z"
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.71027 1.83331C12.1783 2.10731 14.1269 4.05398 14.4043 6.52131"
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.71027 4.19531C10.8903 4.42531 11.8123 5.34731 12.0423 6.52731"
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <p>
                            <b>Контакти:</b>
                            <span>0679379992</span>
                        </p>
                    </div>
                    <ToCartBtn setModalStatus={setModalStatus} />
                </div>
            </header>
        </div>
    );
};

export default Header;
