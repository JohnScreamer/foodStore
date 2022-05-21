import { FC, ReactNode } from "react";
import s from "./SectionName.module.scss";
interface ISectionName {
    children: string | ReactNode;
}
const SectionName: FC<ISectionName> = (props) => {
    return (
        <div className={s.margin0}>
            <h1>{props.children}</h1>
        </div>
    );
};

export default SectionName;
