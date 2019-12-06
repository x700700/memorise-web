import React from "react";
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { deepPurple, green } from '@material-ui/core/colors';

const theme = createMuiTheme({
        palette: {
            primary: deepPurple,
        },
    },
);

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    font: {
        fontSize: '1.5rem',
        fontWeight: 600,
    },
    inputFocused: {
        '&$focused': {
            color: 'red',
            backgroundColor: 'white',
        }
    },
    focused: {
        '&$focused': {
            color: 'red',
            backgroundColor: 'white',
        }
    }
}));

const TextInput = ({ defaultValue, autoFocus }) => {
    const classes = useStyles();

    return (
        <div className="text-input">
            <MuiThemeProvider theme={theme}>
                <TextField
                    className={classes.margin}
                    id="input-with-icon"
                    label=""
                    defaultValue={defaultValue}
                    autoFocus={autoFocus}
                    InputLabelProps={{
                        classes: {
                            focused: classes.inputFocused,
                        }
                    }}
                    InputProps={{
                        classes: {
                            input: classes.font,
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle/>
                            </InputAdornment>
                        ),
                    }}
                />
            </MuiThemeProvider>
        </div>);
};
export default TextInput;
