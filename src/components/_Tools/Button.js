import React from 'react';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import MaterialButton from '@material-ui/core/Button';
import { green, red } from '@material-ui/core/colors';

const themeDefault = createMuiTheme({
    palette: {
        primary: green,
        secondary: red,
    },
});

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.margin || theme.spacing(1),
        marginTop: theme.marginTop,
        padding: theme.padding || '.3rem',
        fontSize: theme.fontSize || '1.2rem',
        fontWeight: theme.fontWeight || 600,
    },
}));

const Button = ({ muiTheme, type, text, onClick, disabled }) => {
    const classes = useStyles();
    const color = type && type.startsWith('cancel') ? 'secondary' : 'primary';
    return (
        <div>
            <ThemeProvider theme={muiTheme || themeDefault}>
                <MaterialButton variant="contained" color={color} size="medium" fullWidth={true}
                                className={classes.root}
                                onClick={onClick && onClick()} disabled={disabled}
                                type={type && type === 'submit' ? 'submit' : undefined}
                >
                    {text}
                </MaterialButton>
            </ThemeProvider>
        </div>
    );

};
export default Button;
