import React, {forwardRef, useImperativeHandle, useRef} from "react";
import './EditTrainingHeader.scss';
import TextInput from "../_Tools/TextInput";
import IconButton from "../_Tools/IconButton";

const EditTrainingHeader = forwardRef(({ name, rename, disabled, play, exam }, ref) => {

    useImperativeHandle(ref, () => ({
        getName() {
            return refName.current.value();
        },
    }));

    const _play = () => {
        play()
    };
    const _exam = () => {
        exam();
    };

    const refName = useRef();
    return (
        <div className="edit-training-header-container">
            <div className="header-row">
                <div className="field name">
                    <TextInput ref={refName} type="training" defaultValue={name} onEnter={rename}
                               noMargin={true} disabled={disabled}
                    />
                </div>
                <div className="edit-training-buttons">
                    <IconButton size={2} faName="running" onClick={_play}/>
                    <IconButton size={2} faName="grin-beam-sweat" onClick={_exam}/>
                </div>
            </div>
        </div>);
});
export default EditTrainingHeader;
