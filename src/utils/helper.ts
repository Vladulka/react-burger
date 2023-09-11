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
	let orderIngredients: IIngredient[] = ingredients.reduce((prevValue: IIngredient[], item: IIngredient) => {
		const existingItem = prevValue.find(i => i._id === item._id);
		if (!existingItem) { prevValue.push(item); }

		return prevValue;
	}, [] as IIngredient[])

	return orderIngredients;
};