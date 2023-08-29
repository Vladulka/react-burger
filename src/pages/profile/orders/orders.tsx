import React, { useEffect } from 'react';
import styles from './order.module.css';
import { getCookie } from "../../../utils/cookie";
import { WS_CONNECT, WS_DISCONNECT } from "../../../services/actions/web-socket";
import OrderDetails from "../../../components/order-details/order-details";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { API_WS_URL } from "../../../utils/api";

const OrdersPage = () => {

    const dispatch = useAppDispatch();
    const { orders } = useAppSelector((state) => state.orderHistoryDetails.orderDetails);

    useEffect(() => {
        let token = getCookie('accessToken')?.split("Bearer ")[1];

        if ( token ) {
            dispatch({ type: WS_CONNECT, payload: `${API_WS_URL}/orders?token=${ token }` });
        }
        return () => {
            dispatch({ type: WS_DISCONNECT });
        }

    }, [ dispatch ]);

    return (
        <div className={`${styles.orders_list} ${styles.item}`}>
            {
                orders && orders.map(order => {
                    return <OrderDetails key={order._id} { ...order }/>
                })
            }
        </div>
    );
};

export default OrdersPage;