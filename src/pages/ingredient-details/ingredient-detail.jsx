import React from 'react';
import {useParams} from "react-router";
import {useSelector} from "react-redux";

const IngredientDetailPage = () => {

    const { ingredientID } = useParams();
    const ingredients = useSelector((store) => store.allIngredients.allIngredients);

    const ingredient = ingredients.find((el) => el._id === ingredientID);

    return (
        <>
            Ингредиенты {ingredientID} {ingredient._id}
        </>
    );
};

export default IngredientDetailPage;