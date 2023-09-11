import React from 'react';
import style from "./order-details.module.css";
import Done from "../../../images/done";
import { useAppSelector } from "../../../utils/hooks";

const OrderDetails = () => {

    const orderData = useAppSelector((store) => store.orderDetails);

    return (
        <div className={style.order_details}>
            <p className={`text text_type_digits-large mt-30 ${style.order_num}`}>{orderData.order.number}</p>
            <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
            <Done />
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-8 mb-30">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default OrderDetails;