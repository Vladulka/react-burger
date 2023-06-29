import React, {useMemo} from 'react';
import style from "./burger-constructor-footer.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import OrderDetails from "../order-details/order-details";

const BurgerConstructorFooter = ({ingredients, onModalClick}) => {

    const total = useMemo(
        () => {
            return ingredients.reduce((sum, a) => sum + a.price, 0);
        },
        [ingredients]
    );

    return (
        <div className={`${style.total} mt-10`}>
            <div className={`${style.total_price} mr-10`}>
                <p className="text text_type_digits-medium mr-2">{total}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={onModalClick(<OrderDetails/>)}>
                Оформить заказ
            </Button>
        </div>
    );
};

BurgerConstructorFooter.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        price: PropTypes.number.isRequired,
    })).isRequired,
}

export default BurgerConstructorFooter;