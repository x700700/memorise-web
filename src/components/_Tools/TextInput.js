import React, {useState, forwardRef, useImperativeHandle} from 'react';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { HelpOutline, ErrorOutline, Edit } from '@material-ui/icons';
import { deepPurple } from '@material-ui/core/colors';
import {isRtl} from "../../common/utils";
import consts from "../../common/consts";

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
    noMargin: {
        margin: 0,
    },
    iconMargin: {
        margin: '0 .2rem',
    },
    fontExercise: {
        fontSize: '1.5rem',
        fontWeight: 600,
    },
    fontTraining: {
        fontSize: '1.1rem',
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

const TextInput = forwardRef(({ type, defaultValue, autoFocus, onEnter, noMargin, disabled }, ref) => {
    const classes = useStyles();
    const [val, setVal] = useState(defaultValue);

    useImperativeHandle(ref, () => ({
        value() {
            return val;
        },
    }));

    const rtlStyle = text => {
        return isRtl(text) ? {
            direction: 'rtl',
            textAlign: 'right',
        } : {};
    };
    const [style, setStyle] = useState(rtlStyle(defaultValue));
    const onChange = e => {
        let text = e.target.value;
        text = text.slice(0, consts.inputProps.exercise.maxLength);
        e.target.value = text;
        setVal(text);
        setStyle(rtlStyle(text || defaultValue));
    };
    const onKeyPress = (ev) => {
        // console.warn('********** key pressed', ev.ctrlKey, ev.key);
        if (ev.key === 'Enter') {
            // inputRef.current.blur(); // Todo - Does not solve Training name bug (Enter doesn't blur)
            onEnter && onEnter();
        }
    };

    const className = noMargin ? classes.margin : classes.noMargin;
    let inputClassName = ['q', 'a'].includes(type) && classes.fontExercise;
    inputClassName = (type === 'training' && classes.fontTraining) || inputClassName;

    // const inputRef = useRef();

    return (
        <div className="text-input">
            <MuiThemeProvider theme={theme}>
                <TextField
                    // ref={inputRef}
                    className={className}
                    style={style}
                    defaultValue={defaultValue}
                    autoFocus={autoFocus}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    disabled={disabled}

                    autoComplete="off"
                    type="text"
                    id="input-with-icon"
                    label=""

                    InputLabelProps={{
                        classes: {
                        },
                    }}
                    InputProps={{
                        // maxLength: 15, // Todo - does not work
                        classes: {
                            input: inputClassName,
                        },
                        startAdornment: (
                            <InputAdornment position="start" className={classes.iconMargin}>
                                {type === 'q' &&
                                <HelpOutline/>
                                }
                                {type === 'a' &&
                                <ErrorOutline/>
                                }
                                {type === 'training' &&
                                <Edit/>
                                }
                            </InputAdornment>
                        ),
                    }}
                />
            </MuiThemeProvider>
        </div>);
});
export default TextInput;
