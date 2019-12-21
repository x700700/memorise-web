import React, {useState, forwardRef, useImperativeHandle, useEffect} from 'react';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { HelpOutline, ErrorOutline, Edit } from '@material-ui/icons';
import { deepPurple } from '@material-ui/core/colors';
import logger from "../../common/logger";
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

const TextInput = forwardRef(({ autoComplete, width, label, type, defaultValue, autoFocus, onEnter, onFocus, onBlur, onChange, noMargin, disabled, error }, ref) => {
    useImperativeHandle(ref, () => ({
        value() {
            return val;
        },
        setValue(_val, callOnChange = false) {
            setVal(_val);
            callOnChange && onChange && onChange(_val);
        },
    }));

    const autoCompleteSafeParams = autoComplete || {};
    const classes = useStyles();
    const [val, setVal] = useState(defaultValue);
    const [focused, setFocused] = useState(false);

    const rtlStyle = text => {
        return isRtl(text) ? {
            direction: 'rtl',
            textAlign: 'right',
            width: width,
        } : {
            width: width,
        };
    };
    const [style, setStyle] = useState(rtlStyle(defaultValue));
    const onMyChange = e => {
        let text = e.target.value;
        text = text.slice(0, consts.inputProps.exercise.maxLength);
        e.target.value = text;
        setVal(text);
        setStyle(rtlStyle(text || defaultValue));
        onChange && onChange(text);
    };
    const onKeyPress = (ev) => {
        // logger.warn('********** key pressed', ev.ctrlKey, ev.key);
        if (ev.key === 'Enter') {
            onEnter && onEnter();
            onBlur && onBlur(val, true);
        }
    };
    const onMyFocus = (ev) => {
        // logger.warn('FOCUS');
        setFocused(true);
        onFocus && onFocus();
    };
    const onMyBlur = (ev) => {
        // logger.warn('BLUR');
        setFocused(false);
        onBlur && onBlur(val);
    };

    // onMount
    useEffect(() => {
        logger.trace('TextInput mounted');
        setVal(defaultValue);
    }, [setVal, defaultValue]);

    const className = noMargin ? classes.margin : classes.noMargin;
    let inputClassName = ['q', 'a'].includes(type) && classes.fontExercise;
    inputClassName = (type === 'training' && classes.fontTraining) || inputClassName;
    const typeName = ['q', 'a', 'training'].includes(type) ? 'text' : type || 'text';

    return (
        <div className="text-input">
            <MuiThemeProvider theme={theme}>
                <TextField
                    {...autoCompleteSafeParams}
                    value={val}
                    variant={label ? 'outlined' : 'standard'}
                    type={typeName}
                    autoComplete={type === 'password' ? 'current-password' : 'off'}
                    className={className}
                    style={style}
                    label={label || ''}
                    size="small"
                    fullWidth

                    error={error && !focused}
                    helperText={error || ''}

                    autoFocus={autoFocus}
                    onFocus={onMyFocus}
                    onBlur={onMyBlur}
                    onChange={onMyChange}
                    onKeyPress={onKeyPress}
                    disabled={disabled}
                    // id="input-with-icon"

                    InputLabelProps={{
                        // shrink: true,
                        classes: {},
                    }}

                    InputProps={{
                        // maxLength: 15, // Todo - does not work
                        // type: autoComplete && 'search',
                        ...autoCompleteSafeParams.InputProps,
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
