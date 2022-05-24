import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartCard from "../../Components/CartCard/CartCard";
import ModalWindow from "../../Components/ModalWindow/ModalWindow";
import NavBarGoodsCategories from "../../Components/NavBarGoodsCategories/NavBarGoodsCategories";
import PriceError from "../../Components/PriceError/PriceError";
import SectionName from "../../Components/SectionName/SectionName";
import TotalPriceSection from "../../Components/TotalPriceSection/TotalPriceSection";
import { useAppSelector } from "../../Hooks/common";
import s from "./Cart.module.scss";

const Cart: FC = () => {
    const { amountItemInCart, cart } = useAppSelector((state) => state.cart);
    const cardList = cart.map((cartItem) => (
        <CartCard key={cartItem.id} goods={cartItem} />
    ));

    const navigate = useNavigate();
    if (amountItemInCart === 0) {
        navigate("/");
    }
    const [priceError, setPriceError] = useState(false);
    const goodsAmount = amountItemInCart > 1 ? "товара" : "товар";
    return (
        <>
            <NavBarGoodsCategories />
            {priceError && (
                <ModalWindow hasBtnClose callback={() => setPriceError(false)}>
                    <PriceError setModalStatus={setPriceError} />
                </ModalWindow>
            )}
            <main className={s.wrapper}>
                <div className={s.topWrapper}>
                    <button
                        className={s.backBtn}
                        onClick={() => navigate("/allGoods")}
                    >
                        {" "}
                        <span></span> До вибору страв
                    </button>
                    <SectionName>
                        Корзина{" "}
                        <b className={s.amountItem}>
                            {" "}
                            (В корзині {amountItemInCart} {goodsAmount})
                        </b>
                    </SectionName>
                </div>

                <div className={s.container}>
                    <ul>{cardList}</ul>
                </div>
                <TotalPriceSection setPriceError={setPriceError} />
            </main>
        </>
    );
};

export default Cart;
