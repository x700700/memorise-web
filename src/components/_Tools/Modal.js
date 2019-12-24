import React, {forwardRef, useImperativeHandle} from 'react';
import {useDispatch} from "react-redux";
import * as types from '../../redux/actionsTypes';
import { makeStyles } from '@material-ui/core/styles';
import MaterialModal from '@material-ui/core/Modal';


const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width:  theme.width || '80%',
        height: theme.height || 235,
        backgroundColor: '#eee6ff', // deepPurple[50], // theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Modal = forwardRef(({ children, onClose, title, disableBackdropClick = false }, ref) => {
    useImperativeHandle(ref, () => ({
        open() {
            setOpen(true);
            dispatch({ type: types.APP_SHOW_MODAL, on: true });
        },
        close() {
            setOpen(false);
            dispatch({ type: types.APP_SHOW_MODAL, on: false });
        },
    }));

    const classes = useStyles();
    const dispatch = useDispatch();
    const [modalStyle] = React.useState({
        top: '3.6rem',
        left: window.innerWidth > 812 ? '6%' : '1%',
    });
    const [opened, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        dispatch({ type: types.APP_SHOW_MODAL, on: false });
        onClose && onClose();
    };

    return (
        <MaterialModal
            aria-labelledby=""
            aria-describedby=""
            open={opened}
            onClose={handleClose}
            disableBackdropClick={disableBackdropClick}
        >
            <div style={modalStyle} className={classes.paper}>
                <div className="modal-box">
                    <div className="modal-title">
                        {title}
                    </div>
                    {children}
                </div>
            </div>
        </MaterialModal>
    );
});
export default Modal;
