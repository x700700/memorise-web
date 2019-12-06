import React, {forwardRef, useImperativeHandle} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialModal from '@material-ui/core/Modal';

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: '50%',
        height: 200,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Modal = forwardRef(({ children, onClose }, ref) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle); // getModalStyle is not a pure function, we roll the style only on the first render
    const [opened, setOpen] = React.useState(false);

    useImperativeHandle(ref, () => ({
        handleOpen() {
            setOpen(true);
        },
    }));

    const handleClose = () => {
        setOpen(false);
        onClose && onClose();
    };

    return (
        <MaterialModal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={opened}
            onClose={handleClose}
        >
            <div style={modalStyle} className={classes.paper}>
                {children}
            </div>
        </MaterialModal>
    );
});
export default Modal;
