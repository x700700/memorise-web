import React from "react";
import TextInput from "../_Tools/TextInput";

export const renderTextInput = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextInput label={label}
               error={(touched && error) || custom.formError}
               width={custom.width}
               ref={custom.customRef}
               {...input}
               {...custom}
    />
);
