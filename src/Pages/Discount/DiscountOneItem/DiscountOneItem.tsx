import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import Benefits from "../../../Components/Benefits/Benefits";
import GoogleSection from "../../../Components/GoogleSection/GoogleSection";
import NavBarGoodsCategories from "../../../Components/NavBarGoodsCategories/NavBarGoodsCategories";
import { useAppDispatch, useAppSelector } from "../../../Hooks/common";
import { getDiscountItem } from "../../../Redux/Reducers/GoodsReducer";
import s from "./DiscountOneItem.module.scss";

interface IDiscountOneItem {
    discountList: any;
}

const DiscountOneItem: FC<IDiscountOneItem> = ({ discountList }) => {
    const data = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getDiscountItem(Number(data.id)));
    }, [discountList]);

    const activeDiscount = useAppSelector(
        (state) => state.goods.activeDiscount
    );

    return (
        <>
            <NavBarGoodsCategories />
            <main>
                {activeDiscount ? (
                    <div className={s.discount}>
                        <div className={s.imgWrapper}>
                            {" "}
                            <img src={activeDiscount?.img} alt="discountImg" />
                        </div>
                        <div>
                            <h1>{activeDiscount?.title}</h1>
                            <b>{activeDiscount?.text}</b>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Modi eos et tempora corrupti
                                veritatis dolor eaque facere suscipit, impedit
                                nostrum vero illum sit assumenda excepturi
                                dolore culpa adipisci sint eveniet? Lorem ipsum
                                dolor, sit amet consectetur adipisicing elit.
                                Tenetur, corporis non dicta nihil asperiores
                                consequuntur laborum eos beatae mollitia ut vel
                                enim perspiciatis reiciendis sint alias?
                                Officiis at tenetur facere!
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Quae, nostrum maiores! Cumque
                                alias iusto autem reprehenderit, ut temporibus
                                recusandae explicabo saepe deleniti aspernatur
                                magni aliquam velit sequi voluptatibus eos
                                distinctio.
                            </p>
                        </div>
                    </div>
                ) : (
                    <p>loading...</p>
                )}
                <Benefits />
                <GoogleSection />
            </main>
        </>
    );
};

export default DiscountOneItem;
