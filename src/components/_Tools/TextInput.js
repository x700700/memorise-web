import React, {useState, forwardRef, useImperativeHandle, useEffect} from 'react';
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

const TextInput = forwardRef(({ label, type, defaultValue, autoFocus, onEnter, onFocus, onBlur, noMargin, disabled }, ref) => {
    useImperativeHandle(ref, () => ({
        value() {
            return val;
        },
        setValue(_val) {
            setVal(_val);
        },
    }));

    const classes = useStyles();
    const [val, setVal] = useState(defaultValue);

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
            onEnter && onEnter();
            onBlur && onBlur(val);
        }
    };
    const onMyFocus = (ev) => {
        // console.warn('FOCUS');
        onFocus && onFocus();
    };
    const onMyBlur = (ev) => {
        // console.warn('BLUR');
        onBlur && onBlur();
    };

    // onMount
    useEffect(() => {
        setVal(defaultValue);
    }, [setVal, defaultValue]);

    const className = noMargin ? classes.margin : classes.noMargin;
    let inputClassName = ['q', 'a'].includes(type) && classes.fontExercise;
    inputClassName = (type === 'training' && classes.fontTraining) || inputClassName;

    return (
        <div className="text-input">
            <MuiThemeProvider theme={theme}>
                <TextField
                    value={val}
                    className={className}
                    style={style}
                    label={label || ''}
                    variant={label ? 'outlined' : 'standard'}
                    autoFocus={autoFocus}
                    onFocus={onMyFocus}
                    onBlur={onMyBlur}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    disabled={disabled}

                    autoComplete="off"
                    type="text"
                    id="input-with-icon"

                    InputLabelProps={{
                        // shrink: true,
                        classes: {},
                    }}
                    InputProps={{
                        // maxLength: 15, // Todo - does not work
                        classes: {
                            input: inputClassName,
                        },
                        startAdornment: label ? null : (
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
