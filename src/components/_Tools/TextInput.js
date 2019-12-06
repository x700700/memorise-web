import React from "react";
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { HelpOutline, ErrorOutline } from '@material-ui/icons';
import { deepPurple } from '@material-ui/core/colors';
import {isRtl} from "../../common/utils";

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
    iconMargin: {
        margin: '0 .2rem',
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

const TextInput = ({ type, defaultValue, autoFocus }) => {
    const classes = useStyles();

    const rtlStyle = () => {
        return isRtl(defaultValue) ? {
            direction: 'rtl',
            textAlign: 'right',
        } : {};
    };

    return (
        <div className="text-input">
            <MuiThemeProvider theme={theme}>
                <TextField
                    style={rtlStyle()}
                    className={classes.margin}
                    autoComplete="off"
                    type="text"

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
                            <InputAdornment position="start" className={classes.iconMargin}>
                                {type === 'q' &&
                                <HelpOutline/>
                                }
                                {type === 'a' &&
                                <ErrorOutline/>
                                }
                            </InputAdornment>
                        ),
                    }}
                />
            </MuiThemeProvider>
        </div>);
};
export default TextInput;
