import classNames from "classnames";
import { FC, useState } from "react";
import {
    defaultEditValue,
    filterByName,
} from "../../InterfacesTypes/GoodsInterface";
import { AllGoodsType } from "../../InterfacesTypes/ReducersInterface";
import CasualBtn from "../Buttons/CasualBtn/CasualBtn";
import CardPreview from "./CardPreview";
import s from "./EditCardForm.module.scss";
interface IEditCardForm {
    register: any;
    errors: any;
    goods?: AllGoodsType;
}
const EditCardForm: FC<IEditCardForm> = ({ register, errors, goods }) => {
    const [defaultValue, setDefaultValue] = useState(goods || defaultEditValue);
    const [isWeight, setWeight] = useState(false);
    const typeOptions = filterByName.map((option) => (
        <option key={option.value} value={option.value ? option.value : 0}>
            {option.name}
        </option>
    ));
    const handlerChanger = (value: any, name: string) => {
        setDefaultValue((state) => {
            return { ...state, [name]: value };
        });
    };
    return (
        <div className={s.content}>
            <div className={s.formWrapper}>
                <label htmlFor="name">Назва товара </label>
                <input
                    className={classNames(s.inputStyle, {
                        [s.error]: errors.name,
                    })}
                    {...register("name", { required: true })}
                    onChange={(e) => handlerChanger(e.target.value, "name")}
                    value={defaultValue.name}
                    id="name"
                    placeholder="name"
                />
                <label htmlFor="description">Опис</label>
                <input
                    className={classNames(s.inputStyle, {
                        [s.error]: errors.description,
                    })}
                    error={errors.description}
                    {...register("description", {
                        required: true,
                    })}
                    onChange={(e) =>
                        handlerChanger(e.target.value, "description")
                    }
                    value={defaultValue.description}
                    id="description"
                    placeholder="description"
                />
                <label htmlFor="price">Ціна</label>
                <input
                    className={classNames(s.inputStyle, {
                        [s.error]: errors.price,
                    })}
                    error={errors.price}
                    {...register("price", {
                        required: true,
                    })}
                    type={"number"}
                    onChange={(e) => handlerChanger(e.target.value, "price")}
                    value={defaultValue.price}
                    id="price"
                    placeholder="price"
                />
                <label
                    htmlFor="type"
                    className={classNames(s.labelError, {
                        [s.error]: errors.capacity,
                    })}
                >
                    Тип товара
                </label>

                <select
                    {...register("type", {
                        required: true,
                    })}
                    value={defaultValue.type}
                    onChange={(e) => handlerChanger(e.target.value, "type")}
                    id="type"
                >
                    {typeOptions}
                </select>
                <label htmlFor="imgUrl">Посилання на картинку</label>
                <input
                    className={classNames(s.inputStyle, {
                        [s.error]: errors.img,
                    })}
                    error={errors.img}
                    {...register("img", {
                        required: true,
                    })}
                    onChange={(e) => handlerChanger(e.target.value, "img")}
                    value={defaultValue.img}
                    id="imgUrl"
                    placeholder="url"
                />

                {isWeight ? (
                    <>
                        <label htmlFor="weight">Вага в грамах</label>
                        <input
                            className={classNames(s.inputStyle, {
                                [s.error]: errors.weight,
                            })}
                            {...register("weight", {
                                required: true,
                            })}
                            onChange={(e) =>
                                handlerChanger(e.target.value, "weight")
                            }
                            value={defaultValue.weight}
                            id="weight"
                            type={"number"}
                            placeholder="weight"
                        />
                    </>
                ) : (
                    <>
                        {" "}
                        <label htmlFor="capacity">Обєм в літрах</label>
                        <input
                            className={classNames(s.inputStyle, {
                                [s.error]: errors.capacity,
                            })}
                            {...register("capacity", {
                                required: true,
                            })}
                            onChange={(e) =>
                                handlerChanger(e.target.value, "capacity")
                            }
                            value={defaultValue.capacity}
                            id="capacity"
                            type={"number"}
                            placeholder="capacity"
                        />
                    </>
                )}
                <div className={s.btnwrapper}>
                    <CasualBtn br callBack={() => setWeight(!isWeight)}>
                        {isWeight
                            ? "Переклчити на літри"
                            : "Переключити на грами"}
                    </CasualBtn>
                </div>
                <label htmlFor="agreement">Чи доступний товар?</label>
                <input
                    id="agreement"
                    className={s.inputAgree}
                    {...register("available")}
                    type="checkbox"
                />
                <label className={s.inputLabel} htmlFor="agreement"></label>
            </div>
            <div className={s.previeWrapper}>
                <h4>Preview</h4>
                <CardPreview goods={defaultValue} />
            </div>
        </div>
    );
};

export default EditCardForm;
