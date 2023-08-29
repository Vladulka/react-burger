import React from 'react';
import ModalOverlay from "./modal-overlay/modal-overlay";
import {createPortal} from "react-dom";
import Modal from "./modal/modal";
import { IModal } from "../../types";

const ModalBlock = ({onModalClose, children}: IModal) => {

    const block = document.getElementById('react-modals');

    return createPortal(
        (
            <>
                <Modal onModalClose={onModalClose}>
                    {children}
                </Modal>
                <ModalOverlay onModalClose={onModalClose}/>
            </>
        ), block as HTMLFormElement
    );
};

export default ModalBlock;