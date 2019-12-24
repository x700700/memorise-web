import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
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

    const theme = createMuiTheme({
        palette: {
            primary: color || purple,
        },
    });

    const handleChange = (event, value) => {
        setCheck(value);
        onChange && onChange(value);
    };

    useEffect(() => {
        setCheck(value || false);
    }, [value, setCheck]);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <FormControlLabel
                    control={
                        <MaterialSwitch color="primary" checked={check} onChange={handleChange}/>
                    }
                    label={label}
                    // labelPlacement="start"
                />
            </ThemeProvider>
        </div>
    );
});
export default Toggle;
