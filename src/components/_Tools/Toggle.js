import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {createMuiTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";
import MaterialSwitch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {purple} from "@material-ui/core/colors";


const Toggle = forwardRef(({ muiTheme, label, color, value, onChange }, ref) => {
    const [check, setCheck] = useState(value);
    useImperativeHandle(ref, () => ({
        check() {
            return check;
        },
    }));

    const _color = color || purple;
    const theme = createMuiTheme({
        palette: {
            primary: _color,
        },
    });
    const useStyles = makeStyles({
        switchBase: {
            color: _color[200],
            '&$checked': {
                color: _color[500],
            },
            '&$checked + $track': {
                backgroundColor: _color[500],
            },
            // padding: 4,
            // transform: 'translateY(.7px)',
        },
        /*
        root: {
            width: 50,
            height: 26,
            padding: 0,
            margin: theme.spacing(1.5),
            marginLeft: 0,
        },
         */
        checked: {},
        track: {
            border: `.5px solid ${_color[500]}`,
            backgroundColor: '#ccc',
        },
    });

    const handleChange = (event, value) => {
        setCheck(value);
        onChange && onChange(value);
    };

    useEffect(() => {
        setCheck(value || false);
    }, [value, setCheck]);

    const classes = useStyles();
    return (
        <div>
            <ThemeProvider theme={theme}>
                <FormControlLabel
                    control={
                        <MaterialSwitch color="primary"
                                        checked={check} onChange={handleChange}
                                        classes={{
                                            root: classes.root,
                                            switchBase: classes.switchBase,
                                            thumb: classes.thumb,
                                            track: classes.track,
                                            checked: classes.checked,
                                        }}
                        />
                    }
                    label={label}
                    // labelPlacement="start"
                />
            </ThemeProvider>
        </div>
    );
});
export default Toggle;
