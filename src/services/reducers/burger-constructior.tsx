import {
	ADD_BUN,
	ADD_INGREDIENT,
	DEL_INGREDIENT,
	DROP_CONSTRUCTOR,
	SORT_INGREDIENTS
} from "../actions/burger-constructor";
import { AllInitialTypes, IIngredient } from "../../types";

const initialData = {
	items: [] as Array<IIngredient>,
	bun: {} as IIngredient
}

type InitialBurgerConstructorType = {
	items: Array<IIngredient>,
	bun: IIngredient
};

export const burgerConstructorReducer = (state = initialData, action: AllInitialTypes): InitialBurgerConstructorType => {
	switch ( action.type ) {
		case ADD_BUN: {
			return {
				...state,
				bun: action.bun
			}
		}
		case ADD_INGREDIENT: {
			return {
				...state,
				items: [ ...state.items, action.item ]
			}
		}
		case DEL_INGREDIENT: {
			return {
				...state,
				items: state.items.filter((item: IIngredient) => {
					return item.itemID !== action.id
				})
			}
		}
		case SORT_INGREDIENTS: {
			const dragItem = state.items[action.dragIndex];
			const newItems = [ ...state.items ];
			newItems.splice(action.dragIndex, 1);
			newItems.splice(action.hoverIndex, 0, dragItem);
			return {
				...state,
				items: newItems
			}
		}
		case DROP_CONSTRUCTOR: {
			return {
				items: [],
				bun: {} as IIngredient
			}
		}
		default: {
			return state;
		}
	}
}