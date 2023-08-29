import React, { useEffect } from 'react';
import { useParams } from "react-router";
import { IIngredient, OrderType } from "../../../types";
import { DEL_ORDER_INFO_DETAIL, GET_ORDER_INFO_DETAIL } from "../../../services/actions/order-info";
import styles from './order-details.module.css';
import OrderElement from "../../../pages/order-details/order-element/order-element";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { getOrderIngredients, getUniqIngredients } from "../../../utils/helper";

const OrderDetails = () => {
	const { id } = useParams();

	const dispatch = useAppDispatch();
	const { orders } = useAppSelector((state) => state.orderHistoryDetails.orderDetails);
	const { currentOrder } = useAppSelector((state) => state.orderInfo);
	const allIngredients = useAppSelector((state) => state.allIngredients.allIngredients);

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
		<div className={styles.main}>
			<p className={`text text_type_digits-default mt-6 ${styles.number}`}>#{currentOrder.number}</p>
			<div className={'mt-6'}>
				<h4 className='text text_type_main-medium'>{currentOrder.name}</h4>
				<span className={
					currentOrder.status === "done"
						? `mt-2 text text_type_main-small text_color_success ${ styles.status }`
						: `mt-2 text text_type_main-small ${styles.status}`
				}>
					{
						currentOrder.status === "done" ? 'Выполнен' : 'Готовится'
					}
				</span>
			</div>
			<div className={'mt-15'}>
				<p className='text text_type_main-medium'>Состав:</p>
				<ul className={`mt-6 ${styles.image_block}`}>
					{uniqIngredients.map((item: IIngredient) => (
						<OrderElement key={item._id} ingredient={item} ingredients={orderIngredients} />
					))}
				</ul>
			</div>
			<div className={`mt-6 mb-6 ${styles.total_block}`}>
				<FormattedDate className="text text_type_main-small text_color_inactive" date={new Date(currentOrder!.createdAt)} />
				<div className={styles.price}>
					<span className='mr-2 text text_type_digits-default'>{totalPrice}</span>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</div>
	);
};

export default OrderDetails;