import React, { useEffect } from 'react';
import styles from './feed.module.css';
import { WS_CONNECT, WS_DISCONNECT } from "../../services/actions/web-socket";
import OrderDetails from "../../components/order-details/order-details";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { API_WS_URL } from "../../utils/api";

const FeedPage = () => {

	const dispatch = useAppDispatch();
	const { orders, total, totalToday } = useAppSelector((state) => state.orderHistoryDetails.orderDetails);

	useEffect(() => {

		dispatch({ type: WS_CONNECT, payload: `${API_WS_URL}/orders/all` });

		return () => {
			dispatch({ type: WS_DISCONNECT });
		}

	}, [ dispatch ]);

	return (
		<>
			<p className={ `text text_type_main-large mt-10 ${ styles.title }` }>
				Лента заказов
			</p>
			<div className={ styles.orders_list }>
				{
					orders.map(order => {
						return <OrderDetails key={order._id} { ...order }/>
					})
				}
			</div>
			<div>
				<div className={ styles.dashboard }>
					<div>
						<p className="text text_type_main-medium">
							Готовы:
						</p>
						<ul className={styles.done_list}>
							{orders.filter(i => i.status === 'done').slice(0, 5).map(i => (
								<li className='text text_type_digits-default text_color_success' key={i._id}>{i.number}</li>
							))}
						</ul>
					</div>
					<div>
						<p className="text text_type_main-medium">
							В работе:
						</p>
						<ul className={styles.pending_list}>
							{orders.filter(i => i.status === 'pending').map(i => (
								<li className='text text_type_digits-default' key={i._id}>{i.number}</li>
							))}
						</ul>
					</div>
				</div>
				<p className="text text_type_main-medium mt-15">
					Выполнено за все время:
				</p>
				<p className={ `text text_type_digits-large ${ styles.shadow_num }` }>{ total }</p>
				<p className="text text_type_main-medium mt-15">
					Выполнено за сегодня:
				</p>
				<p className={ `text text_type_digits-large ${ styles.shadow_num }` }>{ totalToday }</p>
			</div>
		</>
	);
};

export default FeedPage;