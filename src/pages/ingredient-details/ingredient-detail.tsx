import React from 'react';
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import { IIngredient } from "../../types";

const IngredientDetailPage = () => {

    const { ingredientID } = useParams();
    const ingredients = useSelector((store: any) => store.allIngredients.allIngredients);

    const ingredient = ingredients.find((el: IIngredient) => el._id === ingredientID);

    return (
        <>
            Ингредиенты {ingredientID} {ingredient._id}
        </>
    );
};

export default IngredientDetailPage;