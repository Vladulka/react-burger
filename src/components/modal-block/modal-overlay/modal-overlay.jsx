import React from 'react';
import style from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({onModalClose}) => {
    return (
        <div className={style.modal} onClick={onModalClose} />
    );
};

ModalOverlay.propTypes = {
    onModalClick: PropTypes.func
}

export default ModalOverlay;