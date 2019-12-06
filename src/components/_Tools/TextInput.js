import React, {useState} from "react";
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

    const rtlStyle = text => {
        return isRtl(text) ? {
            direction: 'rtl',
            textAlign: 'right',
        } : {};
    };
    const [style, setStyle] = useState(rtlStyle(defaultValue));
    const checkRtl = e => {
        const text = e.target.value || defaultValue;
        setStyle(rtlStyle(text));
    };

    return (
        <div className="text-input">
            <MuiThemeProvider theme={theme}>
                <TextField
                    className={classes.margin}
                    style={style}
                    defaultValue={defaultValue}
                    autoFocus={autoFocus}
                    onChange={checkRtl}

                    autoComplete="off"
                    type="text"
                    id="input-with-icon"
                    label=""

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
