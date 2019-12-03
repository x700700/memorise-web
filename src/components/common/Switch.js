import React, {forwardRef, useImperativeHandle, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MaterialSwitch from '@material-ui/core/Switch';
import { yellow } from '@material-ui/core/colors';

const switchColor = yellow;
const ColorSwitch = withStyles(theme => ({
    switchBase: {
        color: switchColor[300],
        '&$checked': {
            color: switchColor[500],
            transform: 'translate(24px, .7px)',
        },
        '&$checked + $track': {
            backgroundColor: switchColor[500],
        },
        thumb: {
            width: 26,
            height: 26,
        },
        padding: 2,
        transform: 'translateY(.7px)',
    },
    root: {
        width: 50,
        height: 26,
        padding: 0,
        margin: theme.spacing(1.5),
    },
    checked: {},
    track: {
        borderRadius: 26 / 2,
        // border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: '#dddddd',
    },
}))(MaterialSwitch);

const Switch = forwardRef(({ label, value, onChange, startValue }, ref) => {
    const [check, setCheck] = useState(startValue);

    useImperativeHandle(ref, () => ({
        check() {
            return check;
        },
    }));

    const handleChange = () => event => {
        const val = event.target.checked;
        setCheck(val);
        onChange(val)
    };

    return (
        <div>
            <FormControlLabel
                control={
                    <ColorSwitch checked={check} onChange={handleChange()} value={value}/>
                }
                label={label}
                // labelPlacement="start"
            />
        </div>
    );
});
export default Switch;
