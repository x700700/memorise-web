import React, {forwardRef, useImperativeHandle, useRef} from "react";
import './ModalOkCancel.scss';
import Modal from "./Modal";
import Button from './Button';


const ModalOkCancel = forwardRef(({ children, title, okMsg, cancelMsg, onOk, onCancel, buttonsColors, disableBackdropClick = true }, ref) => {
    useImperativeHandle(ref, () => ({
        open() {
            refModal.current.open();
        },
        close() {
            refModal.current.close();
        },
        setOkFocused() {
            refOk.current.focus();
        },
    }));

    const refModal = useRef();
    const refOk = useRef();
    return (
        <Modal ref={refModal} title={title} disableBackdropClick={disableBackdropClick}>
            <div className="modal-ok-cancel-container">

                {children}

                <div className="buttons">
                    <div className="button-container">
                        <Button color={buttonsColors && buttonsColors[0]} type="cancel" text={cancelMsg} onClick={onCancel} />
                    </div>
                    <div className="button-container">
                        <Button ref={refOk} color={buttonsColors && buttonsColors[1]} type="delete" text={okMsg} onClick={onOk} />
                    </div>
                </div>
            </div>
        </Modal>
    );
});
export default ModalOkCancel;
