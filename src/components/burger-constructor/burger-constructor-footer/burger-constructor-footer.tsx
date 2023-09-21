import React, {useEffect, useReducer, useState} from 'react';
import style from "./burger-constructor-footer.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import ModalBlock from "../../modal-block/modal-block";
import {getOrderDetails} from "../../../services/actions/order-details";
import {getCookie} from "../../../utils/cookie";
import {useNavigate} from "react-router";
import { IIngredient } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";

const initialState =  { count: 0 };

function reducer(state: any, action: any) {
    switch (action.type) {
        case "increment":
            return { count: state.count + action.price };
        case "buns":
            return { count: state.count + action.price * 2};
        case "drop":
            return { count: 0 };
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

const BurgerConstructorFooter = () => {

    const navigate = useNavigate();
    const dispatchRedux = useAppDispatch();

    const {items, bun} = useAppSelector((store) => store.burgerConstructor);
    const {order, orderRequest} = useAppSelector((store) => store.orderDetails);

    const [modal, setModal] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({type: "drop"})
        const total = items.reduce((sum: number, a: { price: number }) => sum + a.price, 0);
        dispatch({type: "buns", price: bun.price})
        dispatch({type: "increment", price: total})
    }, [bun, items]);

    const onModalClick = () => {
        if (!bun._id) {
            alert("Выберите булку!");
        } else if(items.length === 0) {
            alert("Добавьте ингредиенты!");
        } else  {
            if(getCookie('accessToken') && localStorage.getItem('refreshToken')) {
                const ingredientsId = items.map((item: IIngredient) => item._id)
                ingredientsId.push(bun._id);
                ingredientsId.push(bun._id);

                dispatchRedux(getOrderDetails(ingredientsId));
                setModal(true);
            } else {
                navigate('/login');
            }
        }
    }

    const onModalClose = () => {
        setModal(false);
    }

    return (
        <div className={`${style.total} mt-10`}>
            <div className={`${style.total_price} mr-10`}>
                <p className="text text_type_digits-medium mr-2">{state.count ? state.count : 0}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={onModalClick} data-test-marker="submit-order-button">
                Оформить заказ
            </Button>
            {
                order && !orderRequest && modal &&
                <ModalBlock onModalClose={onModalClose}>
                    <OrderDetails />
                </ModalBlock>
            }
        </div>
    );
};

export default BurgerConstructorFooter;