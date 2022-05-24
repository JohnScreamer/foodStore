import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import BurgerPopUp from "../../Components/BurgerPopUp/BurgerPopUp";
import Burger from "../../Components/Buttons/Burger/Burger";
import ToCartBtn from "../../Components/Buttons/ToCartBtn/ToCartBtn";
import NavBarGoodsCategories from "../../Components/NavBarGoodsCategories/NavBarGoodsCategories";
import PictureSlider from "../../Components/PictureSlider/PictureSlider";
import { useAppSelector } from "../../Hooks/common";
import s from "./Header.module.scss";
interface IHeader {
    setModalStatus: (status: boolean) => void;
    setLoginStatus: (status: boolean) => void;
    setSigIn: (status: boolean) => void;
    headerRef: any;
}
const Header: FC<IHeader> = ({
    setModalStatus,
    headerRef,
    setLoginStatus,
    setSigIn,
}) => {
    const searchRef = useRef(null);
    const inputRef: any = useRef(null);
    const data = useParams();
    const burgerRef = useRef(null);
    const name = useAppSelector((state) => state.UserProfile.profile?.name);
    const show = (e: any) => {
        if (e.target !== searchRef.current) {
            inputRef.current.focus();
        }
    };
    const [showPopUpBurger, setPopUpStatus] = useState(false);
    return (
        <div className={s.headerWrapper}>
            <header ref={headerRef}>
                <div className={s.container}>
                    <Burger
                        showPopUpBurger={showPopUpBurger}
                        toggleModal={setPopUpStatus}
                        burgerRef={burgerRef}
                    />
                    <NavLink className={s.logo} to="/">
                        LOGOS
                    </NavLink>
                    <div className={s.inputWrapper} onClick={show}>
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
                    <div className={s.logIn}>
                        {name ? (
                            <NavLink to={"/"}>{name}</NavLink>
                        ) : (
                            <button onClick={() => setLoginStatus(true)}>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="11.5788"
                                        cy="7.27803"
                                        r="4.77803"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M4.00002 18.7014C3.99873 18.3655 4.07385 18.0337 4.2197 17.7311C4.67736 16.8158 5.96798 16.3307 7.03892 16.111C7.81128 15.9462 8.59431 15.836 9.38217 15.7815C10.8408 15.6533 12.3079 15.6533 13.7666 15.7815C14.5544 15.8367 15.3374 15.9468 16.1099 16.111C17.1808 16.3307 18.4714 16.77 18.9291 17.7311C19.2224 18.3479 19.2224 19.064 18.9291 19.6808C18.4714 20.6419 17.1808 21.0812 16.1099 21.2918C15.3384 21.4634 14.5551 21.5766 13.7666 21.6304C12.5794 21.7311 11.3866 21.7494 10.1968 21.6854C9.92221 21.6854 9.65677 21.6854 9.38217 21.6304C8.59663 21.5773 7.81632 21.4641 7.04807 21.2918C5.96798 21.0812 4.68652 20.6419 4.2197 19.6808C4.0746 19.3747 3.99955 19.0401 4.00002 18.7014Z"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <span>Вхід</span>
                            </button>
                        )}
                    </div>
                    <div className={s.toCartWrapper}>
                        <div>
                            <ToCartBtn setModalStatus={setModalStatus} />
                        </div>
                    </div>
                </div>
            </header>
            {showPopUpBurger && (
                <BurgerPopUp
                    setPopUpStatus={setPopUpStatus}
                    showPopUpBurger={showPopUpBurger}
                    setLoginStatus={setLoginStatus}
                    burgerRef={burgerRef}
                />
            )}
        </div>
    );
};

export default Header;
