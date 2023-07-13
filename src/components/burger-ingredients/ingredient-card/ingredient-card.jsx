import React, {useEffect, useState} from 'react';
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";

const IngredientCard = ({onModalClick, card}) => {

    const [counter, setCounter] = useState(0);
    const { items, bun } = useSelector(state => state.burgerConstructor);

    useEffect(() => {
        if (bun._id === card._id) {
            setCounter(1)
        } else {
            setCounter(items.filter(ingredient => ingredient._id === card._id).length);
        }
    }, [items, bun, card._id]);

    const [{ isDrag }, dragRef] = useDrag({
        type: 'ingredients',
        item: { card },
        collect: (monitor) => ({
            isDrag: monitor.isDragging()
        })
    });


    return (
        <div ref={dragRef} className={style.ingredient_card} onClick={onModalClick(<IngredientDetails ingredient={card}/>)}>
            {counter > 0 && <Counter count={counter} size="default" extraClass="m-1"/>}
            <img className="ml-4 mr-4" src={card.image} alt={card.name}/>
            <div className={`${style.price} mt-1 mb-1`}>
                <p className="text text_type_digits-default mr-1">{card.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`text text_type_main-default mb-8 ${style.ingredient_card}`} >
                {card.name}
            </p>
        </div>
    );
};

IngredientCard.propTypes = {
    ingredient: PropTypes.objectOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        count: PropTypes.number,
    })),
    onModalClick: PropTypes.func
}


export default IngredientCard;