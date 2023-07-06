import React, {useContext, useEffect, useMemo, useReducer, useState} from 'react';
import style from "./burger-constructor-footer.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import OrderDetails from "../order-details/order-details";
import {getOrderDetailsData} from "../../../utils/api";
import ModalBlock from "../../modal-block/modal-block";
import {BurgerContext} from "../../../context/BurgerContext";


const BurgerConstructorFooter = () => {

    const ingredients = useContext(BurgerContext);

    const [modal, setModal] = useState(false);
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    const [orderDetails, setOrderDetails] = useState({ orderData: {}, isLoading: false, hasError: false});

    function reducer(state, action) {
        switch (action.type) {
            case "increment":
                return { count: state.count + action.price };
            case "decrement":
                return { count: state.count - action.price };
            case "buns":
                return { count: state.count + action.price * 2};
            default:
                throw new Error(`Wrong type of action: ${action.type}`);
        }
    }

    useMemo(() => {
        dispatch({type: "buns", price: ingredients.filter(ingredient => ingredient.type === "bun")[0].price})
        ingredients.filter(ingredient => ingredient.type !== "bun").map(ingredient => dispatch({type: "increment", price: ingredient.price}))
    }, [ingredients]);

    const onModalClick = () => {
        setOrderDetails({...orderDetails, isLoading: true})
        getOrderDetailsData(ingredients.map(_id => _id))
            .then(data => {
                setOrderDetails({...orderDetails, orderData: data})
            })
            .catch(e => console.log(e))
            .finally(
                setOrderDetails({...orderDetails, isLoading: false}),
                setModal(true)
            );

    }

    const onModalClose = () => {
        setOrderDetails({...orderDetails, orderData: {}});
        setModal(false);
    }

    return (
        <div className={`${style.total} mt-10`}>
            <div className={`${style.total_price} mr-10`}>
                <p className="text text_type_digits-medium mr-2">{state.count}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={onModalClick}>
                Оформить заказ
            </Button>
            {
                !orderDetails.isLoading && orderDetails.orderData.order && modal &&
                <ModalBlock onModalClose={onModalClose}>
                    {
                        <OrderDetails orderData={orderDetails.orderData} />
                    }
                </ModalBlock>
            }
        </div>
    );
};

BurgerConstructorFooter.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        price: PropTypes.number.isRequired,
    })).isRequired,
}

export default BurgerConstructorFooter;