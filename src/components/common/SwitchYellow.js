import React, {forwardRef, useImperativeHandle, useState} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ColorSwitchYellow } from '../../common/materialUI styles/Switch'

const SwitchYellow = forwardRef(({ label, value, onChange, startValue }, ref) => {
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
                    <ColorSwitchYellow checked={check} onChange={handleChange()} value={value}/>
                }
                label={label}
                // labelPlacement="start"
            />
        </div>
    );
});
export default SwitchYellow;
