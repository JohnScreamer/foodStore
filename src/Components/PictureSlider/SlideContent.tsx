import { FC } from "react";
import { NavLink } from "react-router-dom";
import s from "./PictureSlider.module.scss";
interface SlideContent {
    url: string;
    id: number;
}

const SlideContent: FC<SlideContent> = ({ url, id }) => {
    return (
        <NavLink to={`/discount/${id}`}>
            <div
                className={s.img}
                style={{
                    backgroundImage: `linear-gradient(90deg, #211F20 1%, rgba(68, 64, 63, 0) 60%), url(${url})`,
                }}
            ></div>
        </NavLink>
    );
};

export default SlideContent;
