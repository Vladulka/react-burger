import React from 'react';
import style from "./modal-overlay.module.css";
const ModalOverlay = ({onModalClose}: {onModalClose: () => void}) => {
    return (
        <div className={style.modal} onClick={onModalClose} />
    );
};

export default ModalOverlay;