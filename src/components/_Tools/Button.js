import React from 'react';
import { ThemeProvider, createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import MaterialButton from '@material-ui/core/Button';
import { green, red, purple } from '@material-ui/core/colors';

const themeStd = createMuiTheme({
    palette: {
        primary: green,
        secondary: red,
    },
});

const themePurple = createMuiTheme({
    palette: {
        primary: green,
        secondary: purple,
    },
});

const ColorButton = withStyles(theme => ({
    /*
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
     */
}))(MaterialButton);

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const Button = ({ type, text, onClick, disabled }) => {
    const classes = useStyles();
    const color = type && type.startsWith('cancel') ? 'secondary' : 'primary';
    const style = {
        // backgroundColor: type === 'cancel' ? 'red' : 'green',
    };

    const themeButton = type === 'cancel-delete' ? themePurple : themeStd;
    return (
        <div>
            <ThemeProvider theme={themeButton}>
                <ColorButton variant="contained" style={style} color={color} size="medium" fullWidth={true} className={classes.margin}
                             onClick={onClick()} disabled={disabled}
                >
                    {text}
                </ColorButton>
            </ThemeProvider>
        </div>
    );

};
export default Button;
