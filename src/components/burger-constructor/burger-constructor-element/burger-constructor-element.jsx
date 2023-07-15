import React, {useRef} from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import {DEL_INGREDIENT, SORT_INGREDIENTS} from "../../../services/actions/burger-constructor";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";

const BurgerConstructorElement = ({itemID, name, price, image, isLocked = false, elementType = "main", index}) => {

    const ref = useRef(null);
    const dispatch = useDispatch();

    const [, dropSort] = useDrop({
        accept: 'ingredientSort',
        hover(item, monitor) {
            const dragIndex = item.index;
            const hoverIndex = index;

            if (!ref.current) { return }
            if (item.index === index) { return }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
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

    const handleClose = (e) => {
        e.preventDefault();
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
                handleClose={(e) => handleClose(e)}
            />
        </div>
    );
};

BurgerConstructorElement.propTypes = {
    name: PropTypes.string.isRequired,
    elementType: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    isLocked: PropTypes.bool,
}

export default BurgerConstructorElement;