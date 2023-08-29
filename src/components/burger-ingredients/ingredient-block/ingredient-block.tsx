import React, {useMemo} from 'react';
import style from "./ingredient-block.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import {useSelector} from "react-redux";
import { IIngredient } from "../../../types";

export interface IIngredientBlock {
    type: string,
    onModalClick: (data: IIngredient) => void,
    lookRef: (node?: Element | null | undefined) => void
}

const IngredientBlock = ({type, onModalClick, lookRef}: IIngredientBlock) => {

    const data: IIngredient[] = useSelector((store: any) => store.allIngredients.allIngredients);
    const ingredientsRequest: IIngredient[] = useSelector((store: any) => store.allIngredients.ingredientsRequest);

    const ingredients = useMemo(
        () => {
            return data.filter(el => el.type === type);
        },
        [type, data]
    );

    return (
        <div>
            <p ref={lookRef} className={`${style.ingredients_subtitle} text text_type_main-default mt-10 mb-6`}>
                { type === "bun" ? "Булка" : type === "sauce" ? "Соусы" : "Начинки" }
            </p>
            <div className={`${style.ingredients} pl-4 pr-4`} >
                {
                    !ingredientsRequest && ingredients.map((ingredient: IIngredient) => <IngredientCard key={ingredient._id} onModalClick={onModalClick} data={ingredient}/>)
                }
            </div>
        </div>
    );
};

export default IngredientBlock;