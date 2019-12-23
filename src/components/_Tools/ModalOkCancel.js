import React, {forwardRef, useImperativeHandle, useRef} from "react";
import './ModalOkCancel.scss';
import Modal from "./Modal";
import Button from './Button';
import {createMuiTheme} from "@material-ui/core/styles";
import {red, green} from "@material-ui/core/colors";


const ModalOkCancel = forwardRef(({ children, title, okMsg, cancelMsg, onOk, onCancel, buttonsColors, disableBackdropClick = true }, ref) => {
    useImperativeHandle(ref, () => ({
        open() {
            refModal.current.open();
        },
        close() {
            refModal.current.close();
        },
    }));

    const themeButtons = createMuiTheme({
        palette: {
            primary: (buttonsColors && buttonsColors[0]) || green,
            secondary: (buttonsColors && buttonsColors[1]) || red,
        },
    });

    const refModal = useRef();
    return (
        <Modal ref={refModal} title={title} disableBackdropClick={disableBackdropClick}>
            <div className="modal-ok-cancel-container">

                {children}

                <div className="buttons">
                    <div className="button-container">
                        <Button type={'cancel'} text={cancelMsg} onClick={onCancel} muiTheme={themeButtons} />
                    </div>
                    <div className="button-container">
                        <Button type={'ok'} text={okMsg} onClick={onOk} muiTheme={themeButtons} />
                    </div>
                </div>
            </div>
        </Modal>
    );
});
export default ModalOkCancel;
