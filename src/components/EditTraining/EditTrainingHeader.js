import React, {forwardRef, useImperativeHandle, useRef} from "react";
import './EditTrainingHeader.scss';
import TextInput from "../_Tools/TextInput";

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
                    <button onClick={_play} className="btn btn-game"><i className="fas fa-running"></i></button>
                    <button onClick={_exam} className="btn btn-exam"><i className="fas fa-grin-beam-sweat"></i></button>
                </div>
            </div>
        </div>);
});
export default EditTrainingHeader;
