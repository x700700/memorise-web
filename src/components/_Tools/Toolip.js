import React, {forwardRef, useImperativeHandle} from "react";
import MaterialTooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    tooltip: {
        backgroundColor: '#ddd',
        color: '#220066',
        fontSize: '1.2rem',
        fontWeight: '400',
        border: '.5px solid #220066',
        direction: 'rtl',
        // maxWidth: 220,
    },
}));

const Tooltip = forwardRef(({ children, text, placement }, ref) => {
    useImperativeHandle(ref, () => ({
        open() {
            setOpen(true);
        },
        close() {
            setOpen(false);
        },
        switch() {
            setOpen(!open);
        },
    }));

    const [open, setOpen] = React.useState(false);
    const handleTooltipClose = () => {
        setOpen(false);
    };

    const classes = useStyles();
    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <MaterialTooltip
                arrow
                classes={{
                    tooltip: classes.tooltip,
                }}
                PopperProps={{
                    disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={text}
                placement={placement}
            >
                {children}
            </MaterialTooltip>
        </ClickAwayListener>);
});
export default Tooltip;
