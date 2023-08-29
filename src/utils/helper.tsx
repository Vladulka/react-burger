import { IIngredient } from "../types";

export const getOrderIngredients = (ingredients: string[], allIngredients: IIngredient[]) => {
	let orderIngredients: IIngredient[] = []

	ingredients && allIngredients.forEach((item: IIngredient) => {
		if ( item._id && ingredients.includes(item._id) ) {
			orderIngredients.push(item)
		}
	});
	return orderIngredients;
}

export const getUniqIngredients = (ingredients: IIngredient[]) => {
	let orderIngredients: IIngredient[] = [];

	ingredients.forEach(item => {
		const existingItem = orderIngredients.find(i => i._id === item._id);
		if (!existingItem) { orderIngredients.push(item) }
	});

	return orderIngredients;
}