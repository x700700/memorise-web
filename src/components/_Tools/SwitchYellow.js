import React, {forwardRef, useImperativeHandle, useState} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { ColorSwitchYellow } from '../../common/materialUI styles/Switch'

const SwitchYellow = forwardRef(({ label, value, onChange }, ref) => {
    const [check, setCheck] = useState(false);
    useImperativeHandle(ref, () => ({
        check() {
            return check;
        },
        set(_check) {
            setCheck(_check);
        },
    }));

    const handleChange = (event, value) => {
        setCheck(value);
        onChange && onChange(value);
    };

    return (
        <div>
            <FormControlLabel
                control={
                    <ColorSwitchYellow checked={check} onChange={handleChange}/>
                }
                label={label}
                // labelPlacement="start"
            />
        </div>
    );
});
export default SwitchYellow;
