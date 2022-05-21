import { FC } from "react";
import s from "./PictureSlider.module.scss";
interface SlideContent {
    url: string;
}

const SlideContent: FC<SlideContent> = ({ url }) => {
    return (
        <div
            className={s.img}
            style={{
                backgroundImage: `linear-gradient(90deg, #211F20 1%, rgba(68, 64, 63, 0) 60%), url(${url})`,
            }}
        ></div>
    );
};

export default SlideContent;
