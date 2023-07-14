import React, {useEffect, useState} from 'react';
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {useDrag} from "react-dnd";

const IngredientCard = ({onModalClick, data}) => {

    const [totalCount, setTotalCount] = useState(0);
    const { items, bun } = useSelector(state => state.burgerConstructor);

    useEffect(() => {
        if (bun._id === data._id) {
            setTotalCount(1)
        } else {
            setTotalCount(items.filter(ingredient => ingredient._id === data._id).length);
        }
    }, [items, bun, data._id]);

    const [, dragRef] = useDrag({
        type: 'ingredients',
        item: { data },
        collect: (monitor) => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        <div ref={dragRef} className={style.ingredient_card} onClick={onModalClick(data)}>
            {totalCount > 0 && <Counter count={totalCount} size="default" extraClass="m-1"/>}
            <img className="ml-4 mr-4" src={data.image} alt={data.name}/>
            <div className={`${style.price} mt-1 mb-1`}>
                <p className="text text_type_digits-default mr-1">{data.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`text text_type_main-default mb-8 ${style.ingredient_card}`} >
                {data.name}
            </p>
        </div>
    );
};

IngredientCard.propTypes = {
    data: PropTypes.objectOf(PropTypes.shape({
        _id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        count: PropTypes.number,
    })),
    onModalClick: PropTypes.func.isRequired
}


export default IngredientCard;