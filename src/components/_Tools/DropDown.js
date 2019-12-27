import React, {forwardRef, useImperativeHandle} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextInput from "./TextInput";

const DropDown = forwardRef(({
                                 id, label, defaultValue = '', width,
                                 options, freeSolo, onChoose, disabled = false,
                                 refInput, autoFocus, error, onChange, onDelayedChange
                             }, ref) => {
    useImperativeHandle(ref, () => ({
    }));

    const title = disabled && defaultValue ? '' : label;
    return (
    <Autocomplete
        freeSolo={disabled || freeSolo}
        id={id}
        options={options.map(option => option.name)}
        onChange={onChoose}
        disabled={disabled}
        renderInput={params => (
            <TextInput ref={refInput} label={title} width={width} autoFocus={autoFocus}
                       error={error} onChange={onChange} onDelayedChange={onDelayedChange}
                       autoComplete={params} variant="outlined" defaultValue={defaultValue}
                       disabled={disabled}
            />
        )}
    />);
});
export default DropDown;
