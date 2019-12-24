import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import MaterialButton from '@material-ui/core/Button';
import {purple, red} from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.margin || theme.spacing(1),
        marginTop: theme.marginTop,
        padding: theme.padding || '.3rem',
        fontSize: theme.fontSize || '1.2rem',
        fontWeight: theme.fontWeight || 600,
    },
}));

const Button = forwardRef(({ color, muiTheme, type, text, onClick, disabled }, ref) => {
    useImperativeHandle(ref, () => ({
        focus() {
            refBtn.current.focus();
        },
    }));

    const themeDefault = createMuiTheme({
        palette: {
            primary: color || {
                main: purple[400],
            },
            secondary: {
                main: red[400],
            },
        },
    });

    const refBtn = useRef();
    const classes = useStyles();
    const buttonType = !color && type && type.startsWith('cancel') ? 'secondary' : 'primary';
    return (
        <div>
            <ThemeProvider theme={muiTheme || themeDefault}>
                <MaterialButton ref={refBtn}
                                variant="contained" color={buttonType} size="medium" fullWidth={true}
                                className={classes.root}
                                onClick={onClick && onClick()} disabled={disabled}
                                type={type && type === 'submit' ? 'submit' : undefined}
                >
                    {text}
                </MaterialButton>
            </ThemeProvider>
        </div>
    );

});
export default Button;
