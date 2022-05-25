import { Route, Routes } from "react-router-dom";
import "./App.scss";
import CardPage from "./Pages/CardPage/CardPage";
import Footer from "./Pages/Footer/Footer";
import AllGoods from "./Pages/AllGoods/AllGoods";
import Header from "./Pages/Header/Header";
import Main from "./Pages/Main/Main";
import { useAppDispatch, useAppSelector } from "./Hooks/common";
import { useEffect, useRef, useState } from "react";
import {
    RequestAllGoods,
    RequestDiscountList,
} from "./Redux/Reducers/GoodsReducer";
import OneCategorieGoods from "./Pages/OneCategorieGoods/OneCategorieGoods";
import Cart from "./Pages/Cart/Cart";
import ModalWindow from "./Components/ModalWindow/ModalWindow";
import EmptyCartError from "./Components/EmptyCartError/EmptyCartError";
import OrderForm from "./Pages/OrderForm/OrderForm";
import Discount from "./Pages/Discount/Discount";
import DiscountOneItem from "./Pages/Discount/DiscountOneItem/DiscountOneItem";
import LogIn from "./Pages/LogIn/LogIn";
import SigIn from "./Components/SigIn/SigIn";
import Page404 from "./Pages/Page404/Page404";
import AdminPage from "./Pages/AdminPage/AdminPage";

function App() {
    const dispatch = useAppDispatch();
    const [showModal, setModalStatus] = useState(false);
    const [showLogIn, setLoginStatus] = useState(false);
    const [showSigIn, setSigIn] = useState(false);
    const headerRef = useRef(null);
    const discountList = useAppSelector((state) => state.goods.discountList);

    useEffect(() => {
        dispatch(RequestAllGoods());
        dispatch(RequestDiscountList());
    }, []);
    return (
        <div className="App">
            <Header
                setModalStatus={setModalStatus}
                setLoginStatus={setLoginStatus}
                setSigIn={setSigIn}
                headerRef={headerRef}
            />
            {showSigIn && (
                <ModalWindow
                    hasBtnClose
                    callback={(status) => setSigIn(status)}
                >
                    <SigIn setSigIn={setSigIn} />
                </ModalWindow>
            )}
            {showLogIn && (
                <ModalWindow
                    hasBtnClose
                    callback={(status) => setLoginStatus(status)}
                >
                    <LogIn
                        setLoginStatus={setLoginStatus}
                        setSigIn={setSigIn}
                    />
                </ModalWindow>
            )}
            {showModal && (
                <ModalWindow
                    hasBtnClose
                    callback={(status) => setModalStatus(status)}
                >
                    <EmptyCartError setModalStatus={setModalStatus} />
                </ModalWindow>
            )}
            <Routes>
                <Route path="/" element={<Main />} />
                <Route
                    path="/categories/:type"
                    element={<OneCategorieGoods />}
                />
                <Route path="/allGoods" element={<AllGoods />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<OrderForm />} />
                <Route path="/discount" element={<Discount />} />

                <Route path="/goods/:id" element={<CardPage />} />
                <Route
                    path="/admin"
                    element={<AdminPage setLoginStatus={setLoginStatus} />}
                />

                <Route
                    path="/discount/:id"
                    element={<DiscountOneItem discountList={discountList} />}
                />

                <Route path="/*" element={<Page404 />} />
            </Routes>
            <Footer headerRef={headerRef} />
        </div>
    );
}

export default App;
