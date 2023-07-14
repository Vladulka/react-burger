import {ADD_BUN, ADD_INGREDIENT, DEL_INGREDIENT, SORT_INGREDIENTS} from "../actions";

const initialData = {
    items: [],
    bun: {}
}

export const burgerConstructorReducer = (state = initialData, action) => {
    switch (action.type) {
        case ADD_BUN: {
            return {
                ...state,
                bun: action.bun
            }
        }
        case ADD_INGREDIENT: {
            return {
                ...state,
                items: [...state.items, action.item]
            }
        }
        case DEL_INGREDIENT: {
            return {
                ...state,
                items: state.items.filter(item => {
                    return item.itemID !== action.id
                })
            }
        }
        case SORT_INGREDIENTS: {
            const dragItem = state.items[action.dragIndex];
            const newItems = [...state.items];
            newItems.splice(action.dragIndex, 1);
            newItems.splice(action.hoverIndex, 0, dragItem);
            return {
                ...state,
                items: newItems
            }
        }
        default: {
            return state;
        }
    }
}