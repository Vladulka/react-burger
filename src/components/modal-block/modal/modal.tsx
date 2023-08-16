import React, {useEffect} from 'react';
import style from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { IModal } from "../../../types";

const Modal = ({children, onModalClose}: IModal) => {

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            onModalClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, []);

    return (
        <div className={style.modal_body} onKeyDown={() => onKeyDown}>
            <div className={style.close_btn}>
                <CloseIcon type="primary" onClick={onModalClose}/>
            </div>
            <div>
                {children}
            </div>
        </div>
    );

};

Modal.propTypes = {
    children: PropTypes.object,
    onModalClick: PropTypes.func
}

export default Modal;