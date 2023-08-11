import React, {useEffect, useReducer, useState} from 'react';
import style from "./burger-constructor-footer.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import ModalBlock from "../../modal-block/modal-block";
import {useDispatch, useSelector} from "react-redux";
import {getOrderDetails} from "../../../services/actions/order-details";
import {getCookie} from "../../../utils/cookie";
import {useNavigate} from "react-router";

const initialState =  { count: 0 };

function reducer(state, action) {
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
    const dispatchRedux = useDispatch();

    const {items, bun} = useSelector(store => store.burgerConstructor);
    const {order, orderRequest} = useSelector(store => store.orderDetails);

    const [modal, setModal] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({type: "drop"})
        const total = items.reduce((sum, a) => sum + a.price, 0);
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
                dispatchRedux(getOrderDetails(...items.map(({ _id }) => _id), bun.itemID, bun.itemID));
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
            <Button htmlType="button" type="primary" size="large" onClick={onModalClick}>
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