import React, { useEffect } from 'react';
import styles from './order-details.module.css';
import { WS_CONNECT, WS_DISCONNECT } from "../../services/actions/web-socket";
import { IIngredient, OrderType } from "../../types";
import { useParams } from "react-router";
import { DEL_ORDER_INFO_DETAIL, GET_ORDER_INFO_DETAIL } from "../../services/actions/order-info";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderElement from "./order-element/order-element";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { API_WS_URL } from "../../utils/api";
import { getOrderIngredients, getUniqIngredients } from "../../utils/helper";

const OrderDetailsPage = () => {
	const { id } = useParams();

	const dispatch = useAppDispatch();
	const { orders } = useAppSelector((state) => state.orderHistoryDetails.orderDetails);
	const { currentOrder } = useAppSelector((state) => state.orderInfo);
	const allIngredients = useAppSelector((state) => state.allIngredients.allIngredients);

	useEffect(() => {
		dispatch({ type: WS_CONNECT, payload: `${ API_WS_URL }/orders/all` });

		return () => {
			dispatch({ type: WS_DISCONNECT });
		}

	}, [ dispatch ]);

	useEffect(() => {
		if ( orders ) {
			const order = orders.find((item: OrderType) => {
				return item.number == id
			});
			if ( order ) {
				dispatch({ type: GET_ORDER_INFO_DETAIL, currentOrder: order })
			}
		}
	}, [ orders ])

	useEffect(() => {
		return () => {
			dispatch({ type: DEL_ORDER_INFO_DETAIL })
		}
	}, []);

	let orderIngredients: IIngredient[] = getOrderIngredients(currentOrder.ingredients, allIngredients);
	let uniqIngredients = getUniqIngredients(orderIngredients);

	const totalPrice = orderIngredients.reduce(function (previousValue, item) {
		return item.type === "bun" ? previousValue + item.price * 2 : previousValue + item.price;
	}, 0);

	return (
		<div className={ styles.main }>
			<p className={ `${ styles.number } text_type_digits-default` }>#{ currentOrder.number }</p>
			<div className={ 'mt-5' }>
				<h4 className='text text_type_main-medium'>{ currentOrder.name }</h4>
				<span className={
					currentOrder.status === "done"
						? `mt-2 text text_type_main-small text_color_success ${ styles.status }`
						: `mt-2 text text_type_main-small ${ styles.status }`
				}>
					{
						currentOrder.status === "done" ? 'Выполнен' : currentOrder.status === 'pending' ? 'Готовится' : 'Создан'
					}
				</span>
			</div>
			<div className={ 'mt-15' }>
				<p className='text text_type_main-medium'>Состав:</p>
				<ul className={ `mt-6 ${ styles.image_block }` }>
					{ uniqIngredients.map((item: IIngredient) => (
						<OrderElement key={ item._id } ingredient={ item } ingredients={ orderIngredients }/>
					)) }
				</ul>
			</div>
			<div className={ `mt-10 mb-10 ${ styles.total }` }>
				<FormattedDate className="text text_type_main-small text_color_inactive"
							   date={ new Date(currentOrder!.createdAt) }/>
				<div className={ styles.price }>
					<span className='mr-2 text text_type_digits-default'>{ totalPrice }</span>
					<CurrencyIcon type="primary"/>
				</div>
			</div>
		</div>
	);
};

export default OrderDetailsPage;