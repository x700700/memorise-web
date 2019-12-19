import React, {forwardRef, useImperativeHandle} from "react";
import MaterialTooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';


const HtmlTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: '#ddd',
        color: '#220066',
        fontSize: '1.2rem',
        fontWeight: '400',
        border: '.5px solid #220066',
        direction: 'rtl',
        // maxWidth: 220,
    },
}))(MaterialTooltip);

const Tooltip = forwardRef(({ children, text, placement }, ref) => {
    useImperativeHandle(ref, () => ({
        open() {
            setOpen(true);
        },
        switch() {
            setOpen(!open);
        },
    }));

    const [open, setOpen] = React.useState(false);
    const handleTooltipClose = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <HtmlTooltip
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
            </HtmlTooltip>
        </ClickAwayListener>);
});
export default Tooltip;
