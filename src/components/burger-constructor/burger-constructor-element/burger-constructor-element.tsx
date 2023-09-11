import React, {useRef} from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {DEL_INGREDIENT, SORT_INGREDIENTS} from "../../../services/actions/burger-constructor";
import {useDispatch} from "react-redux";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";
import { IDropItem, IIngredient } from "../../../types";

const BurgerConstructorElement = ({itemID, name, price, image, isLocked = false, elementType = undefined, index}: IIngredient) => {

    const ref = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const [, dropSort] = useDrop<IDropItem, unknown, unknown>
    ({
        accept: 'ingredientSort',
        hover(item: IDropItem, monitor: DropTargetMonitor) {
            const dragIndex = item.index;
            const hoverIndex = index;


            if (!ref.current) { return }
            if (dragIndex === hoverIndex) { return }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset: XYCoord | null = monitor.getClientOffset() || { x: 0, y: 0 };
            const hoverClientY = clientOffset && clientOffset.y - hoverBoundingRect.top;

            if ((dragIndex && hoverIndex) && (dragIndex < hoverIndex && hoverClientY < hoverMiddleY)) {
                return
            }

            if ((dragIndex && hoverIndex) && (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) {
                return
            }
            dispatch({
                type: SORT_INGREDIENTS,
                dragIndex: item.index,
                hoverIndex: index
            })

            item.index = hoverIndex;
        }
    })

    const [{ isDragging }, dragSort] = useDrag({
        type: 'ingredientSort',
        item: {
            id: itemID,
            index: index
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const opacity = isDragging ? 0 : 1;
    dragSort(dropSort(ref));

    const handleClose = () => {
        dispatch({ type: DEL_INGREDIENT, id: itemID })
    }

    return (
        <div ref={ref} style={{ opacity }} key={itemID}>
            {!isLocked && <DragIcon type="primary"/>}
            <ConstructorElement
                type={elementType}
                isLocked={isLocked}
                text={name}
                price={price}
                thumbnail={image}
                extraClass={"ml-2 mb-4"}
                handleClose={handleClose}
            />
        </div>
    );
};

export default BurgerConstructorElement;