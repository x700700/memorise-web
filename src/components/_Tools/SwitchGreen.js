import React, {forwardRef, useImperativeHandle, useState} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ColorSwitchGreen } from '../../common/materialUI styles/Switch'

const SwitchGreen = forwardRef(({ label, value, onChange, startValue }, ref) => {
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
                    <ColorSwitchGreen checked={check} onChange={handleChange()} value={value}/>
                }
                label={label}
                // labelPlacement="start"
            />
        </div>
    );
});
export default SwitchGreen;
