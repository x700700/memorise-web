import React, {forwardRef, useImperativeHandle} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextInput from "./TextInput";

const DropDown = forwardRef(({
                                 id, label, width,
                                 options, freeSolo, onChoose,
                                 refInput, autoFocus, error, onChange
                             }, ref) => {
        useImperativeHandle(ref, () => ({
        }));

        return (
        <Autocomplete
            freeSolo={freeSolo}
            id={id}
            options={options.map(option => option.name)}
            onChange={onChoose}
            renderInput={params => (
                <TextInput ref={refInput} label={label} width={width} autoFocus={autoFocus}
                           error={error} onChange={onChange}
                           autoComplete={params}
                />
            )}
        />);
});
export default DropDown;
