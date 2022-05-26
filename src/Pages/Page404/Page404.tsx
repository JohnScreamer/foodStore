import { FC } from "react";
import { NavLink } from "react-router-dom";
import CasualBtn from "../../Components/Buttons/CasualBtn/CasualBtn";
import "./Page404.scss";

const Page404: FC = () => {
    return (
        <main className="background404">
            <div className="center">
                <div className="error">
                    <div className="number">4</div>
                    <div className="illustration">
                        <div className="circle"></div>
                        <div className="clip">
                            <div className="paper">
                                <div className="face">
                                    <div className="eyes">
                                        <div className="eye eye-left"></div>
                                        <div className="eye eye-right"></div>
                                    </div>
                                    <div className="rosyCheeks rosyCheeks-left"></div>
                                    <div className="rosyCheeks rosyCheeks-right"></div>
                                    <div className="mouth"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="number">4</div>
                </div>
                <div className="messageError">404</div>
                <div className="text">
                    Ой ой здажться немає такої сторінки ще((((
                </div>
                <NavLink to={"./"}>
                    {" "}
                    <CasualBtn br fill>
                        На головну
                    </CasualBtn>
                </NavLink>
            </div>
        </main>
    );
};

export default Page404;
