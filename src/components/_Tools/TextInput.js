import React from "react";
import { makeStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

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
    }
}));

const TextInput = ({ defaultValue, autoFocus }) => {
    const classes = useStyles();

    return (
        <div className="text-input">
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
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
            />
        </div>);
};
export default TextInput;
