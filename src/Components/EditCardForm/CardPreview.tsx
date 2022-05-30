import React, { FC } from "react";
import GoodsCard, { IGoodsCard } from "../GoodsCard/GoodsCard";
import PreviewGoodsCard from "../GoodsCard/GoodsPrewie";

interface ICardPreview {
    goods: any;
}

const CardPreview: FC<ICardPreview> = ({ goods }) => {
    return (
        <div>
            <PreviewGoodsCard goods={goods} />
        </div>
    );
};

export default CardPreview;
