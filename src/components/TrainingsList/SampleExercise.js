import React from "react";
import './SampleExercise.scss';

/*
const Divider = ({ width }) => {
    return (
        <div className="divider-container">
            <div className="divider" style={{ width: width }}></div>
        </div>);
};
*/

const SampleExercise = ({ q, a, hideEditIcon }) => {
    return (
        <div className="sample-exercise-container">
            <div className="sample-exercise-col">
                <div className="exercise question">{q}</div>
                {/*<Divider width="80%"/>*/}
                <div className="exercise answer">{a}</div>
            </div>
            {!hideEditIcon &&
            <div className="icon-edit-absolute">
                <i className="fas fa-edit"/>
            </div>
            }
        </div>);
};
export default  SampleExercise;
