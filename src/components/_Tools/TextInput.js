import React, {useState, forwardRef, useImperativeHandle, useEffect} from 'react';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { HelpOutline, ErrorOutline, Edit, Visibility, VisibilityOff, Clear } from '@material-ui/icons';
import { deepPurple } from '@material-ui/core/colors';
import logger from "../../common/logger";
import {isRtl} from "../../common/utils";
import consts from "../../common/consts";
import {useTranslation} from "react-i18next";

const defaultTheme = createMuiTheme({
        palette: {
            primary: deepPurple,
        },
    },
);

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.margin || '0rem',
        marginTop: theme.marginTop,
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

const TextInput = forwardRef(({
                                  muiTheme,
                                  autoComplete, width, label, type, defaultValue, autoFocus,
                                  onEnter, onFocus, onBlur, onChange, disabled, error,
                                  forceShowPassword, onShowPassword,
                              }, ref) => {
    useImperativeHandle(ref, () => ({
        value() {
            return val;
        },
        setValue(_val, callOnChange = false) {
            setVal(_val);
            callOnChange && onChange && onChange(_val);
        },
        showPassword(show) {
            setShowPass(show);
        },
    }));

    const { t } = useTranslation();
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


    const [showPass, setShowPass] = useState(false);
    const handleClickShowPassword = () => {
        setShowPass(!showPass);
        onShowPassword && onShowPassword(!showPass);
    };
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    const clearText = () => {
        setVal('');
    };


    useEffect(() => {
        setShowPass(forceShowPassword);
    }, [forceShowPassword]);

    useEffect(() => {
        logger.trace('TextInput mounted');
        setVal(defaultValue);
    }, [setVal, defaultValue]);

    let inputClassName = ['q', 'a'].includes(type) && classes.fontExercise;
    inputClassName = (type === 'training' && classes.fontTraining) || inputClassName;
    let typeName = ['q', 'a', 'training'].includes(type) ? 'text' : type || 'text';
    if (type === 'password') typeName = showPass ? 'text' : 'password';

    return (
        <div className="text-input">
            <MuiThemeProvider theme={muiTheme || defaultTheme}>
                <TextField
                    {...autoCompleteSafeParams}
                    value={val}
                    variant={label ? 'outlined' : 'standard'}
                    type={typeName}
                    autoComplete={type === 'password' ? 'current-password' : 'off'}
                    className={classes.root}
                    style={style}
                    label={label || ''}
                    size="small"
                    fullWidth={autoComplete && true}

                    error={error && !focused}
                    helperText={error || ''}

                    autoFocus={autoFocus}
                    onFocus={onMyFocus}
                    onBlur={onMyBlur}
                    onChange={onMyChange}
                    onKeyPress={onKeyPress}
                    disabled={disabled}

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

                        endAdornment: type === 'password' ? (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={t('show pass')}
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPass ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ) : !['q', 'a'].includes(type) ? null : (
                            <IconButton onClick={clearText}>
                                <Clear />
                            </IconButton>
                        ),
                    }}
                />
            </MuiThemeProvider>
        </div>);
});
export default TextInput;
