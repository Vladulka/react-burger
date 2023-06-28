import React from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const BurgerConstructorElement = ({name, price, image, isLocked = false, elementType = "main" }) => {
    return (
        <div>
            {!isLocked && <DragIcon type="primary"/>}
            <ConstructorElement
                type={elementType}
                isLocked={isLocked}
                text={name}
                price={price}
                thumbnail={image}
                extraClass={"ml-2 mb-4"}
            />
        </div>
    );
};

BurgerConstructorElement.propTypes = {
    name: PropTypes.string.isRequired,
    elementType: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    isLocked: PropTypes.bool,
}

export default BurgerConstructorElement;