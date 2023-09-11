import React from 'react';
import styles from './order-details.module.css';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { IIngredient, OrderType } from "../../types";
import { useAppSelector } from "../../utils/hooks";
import { getOrderIngredients } from "../../utils/helper";

const OrderDetails = (order: OrderType) => {

	const location = useLocation();
	const allIngredients = useAppSelector((state) => state.allIngredients.allIngredients);

	let orderIngredients: IIngredient[] = getOrderIngredients(order.ingredients, allIngredients);

	const totalPrice = orderIngredients.reduce(function (previousValue, item) {
		return item.type === "bun" ? previousValue + item.price * 2 : previousValue + item.price;
	}, 0);

	return (
		<Link
			to={ { pathname: `/feed/${ order.number }` } }
			state={ { background: location } }
			className={ `${ styles.main }` }
		>
			<div>
				<div className={ `${ styles.header }` }>
					<p className={ `${ styles.number } text text_type_digits-default` }>
						{ `#${ order.number }` }
					</p>
					<p
						className={ `text text_type_main-default text_color_inactive` }
					>
						<FormattedDate date={ new Date(order.createdAt) }/>
					</p>
				</div>
				<h3 className={ `${ styles.title } text text_type_main-medium mt-6` }>
					{ order.name }
				</h3>
				<p className={
					orderIngredients.length > 6 ? `mt-6 mr-6 ml-6 text text_type_main-small ${ styles.num_span } ${ styles.num_span_shown }` :
						`mt-6 mr-6 ml-6 text text_type_main-small ${ styles.num_span }`
				}>
					{ order.status === "done" ? "Выполнен" : order.status === "pending" ? "Готовится" : "Создан" }
				</p>
				<div className={ `${ styles.image_block } mt-6` }>
					<div className={ styles.image_list }>
						{ orderIngredients.slice(0, 6).map((item) => (
							<img className={ styles.image } key={ item._id } src={ item.image } alt={item.name}/>
						)) }
						<span className={
							orderIngredients.length > 6 ? `mt-6 mr-6 ml-6 text text_type_main-small ${ styles.num_span } ${ styles.num_span_shown }` :
								`mt-6 mr-6 ml-6 text text_type_main-small ${ styles.num_span }`
						}>
							+{ orderIngredients.slice(6).length }</span>
					</div>
					<div className={ `${ styles.price } pr-5` }>
						<p className="text text_type_digits-medium">{ totalPrice }</p>
						<div>
							<CurrencyIcon type="primary"/>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default OrderDetails;