import React from 'react';
import ModalOverlay from "./modal-overlay/modal-overlay";
import {createPortal} from "react-dom";
import Modal from "./modal/modal";
import PropTypes from "prop-types";

const ModalBlock = ({onModalClose, children}) => {

    return createPortal(
        (
            <>
                <Modal onModalClose={onModalClose}>
                    {children}
                </Modal>
                <ModalOverlay onModalClose={onModalClose}/>
            </>
        ),
        document.getElementById("react-modals")
    );
};

ModalBlock.propTypes = {
    children: PropTypes.object,
    onModalClick: PropTypes.func
}

export default ModalBlock;