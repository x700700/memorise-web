import React, {forwardRef, useImperativeHandle, useRef} from "react";
import './EditTrainingHeader.scss';
import TextInput from "../_Tools/TextInput";

const EditTrainingHeader = forwardRef(({ name, rename, disabled }, ref) => {

    useImperativeHandle(ref, () => ({
        getName() {
            return refName.current.value();
        },
    }));

    const refName = useRef();
    return (
        <div className="edit-training-header-container">
            <div className="header-row">
                <div className="field name">
                    <TextInput ref={refName} type="training" defaultValue={name} onEnter={rename}
                               noMargin={true} disabled={disabled}
                    />
                </div>
                <div className="btn">
                </div>
            </div>
        </div>);
});
export default EditTrainingHeader;
