import React, { useMemo } from 'react';
import styles from './order-element.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "../../../types";

type TOrderElement = {
	ingredient: IIngredient,
	ingredients: IIngredient[]
}

const OrderElement = ({ ingredient, ingredients }: TOrderElement) => {

	const similarIngredientsCount = useMemo(
		() => {
			return ingredient.type === "bun" ? 2: ingredients.filter(element => ingredient._id === element._id).length;
		},
		[ingredient]
	);

	return (
		<li className={ `mr-6 ${styles.main}` }>
			<div className={ styles.image_block }>
				<img className={ styles.image } src={ ingredient.image_mobile } alt={ ingredient.name }/>
				<p className='ml-4 text text_type_main-small'>{ ingredient.name }</p>
			</div>
			<div className={ styles.span }>
				<p className='mr-2 text text_type_digits-default'>{ similarIngredientsCount } x</p>
				<span className='mr-2 text text_type_digits-default'>{ ingredient.price }</span>
				<CurrencyIcon type="primary"/>
			</div>
		</li>
	)
};

export default OrderElement;