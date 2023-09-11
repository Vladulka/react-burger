import React from 'react';
import style from './ingredient-details.module.css'
import { useParams } from "react-router";
import { IIngredient } from "../../../types";
import { useAppSelector } from "../../../utils/hooks";

const IngredientDetails = () => {

	const { ingredientID } = useParams();

	const ingredients = useAppSelector((store) => store.allIngredients.allIngredients);
	const ingredient = ingredients.find((ingredient: IIngredient) => ingredient._id === ingredientID);

	if ( !ingredient || !ingredientID ) {
		return (<></>);
	}

	return (
		<div className={ style.details }>
			<div className={ "pt-10 pl-10 pr-10" }>
				<div className={ style.details_header }>
					<p className="text text_type_main-large">
						Детали ингредиента
					</p>
				</div>
				<img className={ style.img } src={ ingredient.image_large } alt={ ingredient.name }/>
				<p className={ `text text_type_main-default mt-4 ${ style.name }` }>
					{ ingredient.name }
				</p>
				<div className={ `${ style.info_block } mt-8 mb-15` }>
					<div className={ style.info_item }>
						<p className="text text_type_main-default text_color_inactive">
							Калории,ккал
						</p>
						<p className="text text_type_main-default text_color_inactive">
							{ ingredient.calories }
						</p>
					</div>
					<div className={ style.info_item }>
						<p className="text text_type_main-default text_color_inactive">
							Белки, г
						</p>
						<p className="text text_type_main-default text_color_inactive">
							{ ingredient.proteins }
						</p>
					</div>
					<div className={ style.info_item }>
						<p className="text text_type_main-default text_color_inactive">
							Жиры, г
						</p>
						<p className="text text_type_main-default text_color_inactive">
							{ ingredient.fat }
						</p>
					</div>
					<div className={ style.info_item }>
						<p className="text text_type_main-default text_color_inactive">
							Углеводы, г
						</p>
						<p className="text text_type_main-default text_color_inactive">
							{ ingredient.carbohydrates }
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IngredientDetails;