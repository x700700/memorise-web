import React, {forwardRef, useImperativeHandle} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialModal from '@material-ui/core/Modal';

function getModalStyle() {
    // const top = 0;
    // const left = 50;
    return {
        top: '3.6rem', // `${top}%`,
        left: 0, // `${left}%`,
        // transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: '81%',
        height: 235,
        backgroundColor: '#eee6ff', // deepPurple[50], // theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Modal = forwardRef(({ children, onClose, title }, ref) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle); // getModalStyle is not a pure function, we roll the style only on the first render
    const [opened, setOpen] = React.useState(false);

    useImperativeHandle(ref, () => ({
        open() {
            setOpen(true);
        },
        close() {
            setOpen(false);
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
            disableBackdropClick={true}
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
