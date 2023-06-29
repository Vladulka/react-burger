import React from 'react';
import style from "./order-details.module.css";
import done from "../../../images/done.svg"

const OrderDetails = () => {
    return (
        <div className={style.order_details}>
            <p className={`text text_type_digits-large mt-30 ${style.order_num}`}>034536</p>
            <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
            <img className={style.image} alt={"done"} src={done}/>
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-8 mb-30">Дождитесь готовности на орбитальной станции</p>

        </div>
    );
};

export default OrderDetails;