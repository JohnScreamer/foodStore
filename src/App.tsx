import { Route, Routes } from "react-router-dom";
import "./App.scss";
import CardPage from "./Pages/CardPage/CardPage";
import Footer from "./Pages/Footer/Footer";
import AllGoods from "./Pages/AllGoods/AllGoods";
import Header from "./Pages/Header/Header";
import Main from "./Pages/Main/Main";
import { useAppDispatch } from "./Hooks/common";
import { useEffect, useRef, useState } from "react";
import { RequestAllGoods } from "./Redux/Reducers/GoodsReducer";
import OneCategorieGoods from "./Pages/OneCategorieGoods/OneCategorieGoods";
import Cart from "./Pages/Cart/Cart";
import ModalWindow from "./Components/ModalWindow/ModalWindow";
import EmptyCartError from "./Components/EmptyCartError/EmptyCartError";
import OrderForm from "./Pages/OrderForm/OrderForm";

function App() {
    const dispatch = useAppDispatch();
    const [showModal, setModalStatus] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        dispatch(RequestAllGoods());
    }, []);
    return (
        <div className="App">
            <Header setModalStatus={setModalStatus} headerRef={headerRef} />
            {showModal && (
                <ModalWindow callback={(status) => setModalStatus(status)}>
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
                <Route path="/goods/:id" element={<CardPage />} />

                <Route path="/*" element={<>404</>} />
            </Routes>
            <Footer headerRef={headerRef} />
        </div>
    );
}

export default App;
