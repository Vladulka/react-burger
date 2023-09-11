import React, {useEffect} from 'react';
import style from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
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
                <a data-test-marker="modal-close">
                    <CloseIcon type="primary" onClick={onModalClose} />
                </a>
            </div>
            <div>
                {children}
            </div>
        </div>
    );

};

export default Modal;