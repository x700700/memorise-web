import React, {forwardRef, useImperativeHandle, useRef} from "react";
import './ModalOkCancel.scss';
import Modal from "./Modal";
import Button from './Button';

const ModalOkCancel = forwardRef(({ children, title, okMsg, cancelMsg, onOk, onCancel, cancelType, disableBackdropClick = true }, ref) => {
    useImperativeHandle(ref, () => ({
        open() {
            refModal.current.open();
        },
        close() {
            refModal.current.close();
        },
    }));

    const refModal = useRef();
    return (
        <Modal ref={refModal} title={title} disableBackdropClick={disableBackdropClick}>
            <div className="modal-ok-cancel-container">

                {children}

                <div className="buttons">
                    <div className="button-container">
                        <Button type={cancelType || 'cancel'} text={cancelMsg} onClick={onCancel} />
                    </div>
                    <div className="button-container">
                        <Button type={cancelType ? 'cancel' : 'ok'} text={okMsg} onClick={onOk} />
                    </div>
                </div>
            </div>
        </Modal>
    );
});
export default ModalOkCancel;
