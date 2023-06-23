import React from 'react';
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ingredient-card.module.css";
import PropTypes from "prop-types";

const IngredientCard = ({name, price, image, count}) => {
    return (
        <div style={{position: "relative"}}>
            {count && <Counter count={count} size="default" extraClass="m-1"/>}
            <img className="ml-4 mr-4" src={image} alt={name}/>
            <div className={`${style.price} mt-1 mb-1`}>
                <p className="text text_type_digits-default mr-1">{price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={"text text_type_main-default"} style={{textAlign: "center"}}>
                {name}
            </p>
        </div>
    );
};

IngredientCard.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    count: PropTypes.number,
}


export default IngredientCard;