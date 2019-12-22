import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ColorSwitchGreen } from '../../common/materialUI styles/Switch'

const SwitchGreen = forwardRef(({ label, value, onChange }, ref) => {
    const [check, setCheck] = useState(value);
    useImperativeHandle(ref, () => ({
        check() {
            return check;
        },
    }));

    const handleChange = (event, value) => {
        setCheck(value);
        onChange && onChange(value);
    };

    useEffect(() => {
        setCheck(value || false);
    }, [value, setCheck]);

    return (
        <div>
            <FormControlLabel
                control={
                    <ColorSwitchGreen checked={check} onChange={handleChange}/>
                }
                label={label}
                // labelPlacement="start"
            />
        </div>
    );
});
export default SwitchGreen;
