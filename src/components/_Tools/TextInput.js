import React, {useState, forwardRef, useImperativeHandle, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import consts from "../../common/consts";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff, Clear } from '@material-ui/icons';
import { deepPurple } from '@material-ui/core/colors';
import logger from "../../common/logger";
import {isRtl} from "../../common/utils";


const themeDefault = createMuiTheme({
        palette: {
            primary: deepPurple,
        },
    },
);

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.margin || '0rem',
        marginTop: theme.marginTop,
        fontSize: theme.fontSize || '1rem',
        fontWeight: theme.fontWeight || 400,
    },
    iconMargin: {
        margin: '0 .2rem',
    },
}));

const TextInput = forwardRef(({
                                  muiTheme, startInputAdornment,
                                  autoComplete, width, label, type, defaultValue, autoFocus,
                                  clearTextIcon,
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
            _val && setStyle(rtlStyle(_val));
        },
        showPassword(show) {
            setShowPass(show);
        },
        focus() {
            setFocused(true);
            inputRef.current.focus();
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
        const  text = e.target.value;
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
        onChange && onChange('');
    };


    useEffect(() => {
        setShowPass(forceShowPassword);
    }, [forceShowPassword]);

    useEffect(() => {
        logger.trace('TextInput mounted');
        setVal(defaultValue);
    }, [setVal, defaultValue]);

    let typeName = type || 'text';
    if (type === 'password') typeName = showPass ? 'text' : 'password';

    const inputRef = React.useRef();
    const inputProps = autoComplete ? {} : { inputProps: { maxLength: consts.ui.inputMaxLength } };
    return (
        <div className="text-input">
            <MuiThemeProvider theme={muiTheme || themeDefault}>
                <TextField
                    {...autoCompleteSafeParams}
                    inputRef={inputRef}
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

                    {...inputProps}

                    InputProps={{
                        // type: autoComplete && 'search',
                        ...autoCompleteSafeParams.InputProps,
                        classes: {
                            input: classes.root,
                        },
                        startAdornment: !startInputAdornment ? null : (
                            <InputAdornment position="start" className={classes.iconMargin}>
                                {startInputAdornment}
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
                        ) : clearTextIcon ? (
                            <IconButton onClick={clearText}>
                                <Clear />
                            </IconButton>
                        ) : !autoComplete ? null : (
                            <React.Fragment>
                                {autoComplete.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            </MuiThemeProvider>
        </div>);
});
export default TextInput;
