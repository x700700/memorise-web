import React from "react";
import './SampleExercise.scss';

const Divider = ({ width }) => {
    return (
        <div className="divider-container">
            <div className="divider" style={{ width: width }}></div>
        </div>);
};

const SampleExercise = ({ q, a }) => {
    return (
        <div className="sample-exercise-container">
            <div className="sample-exercise-col">
                <div className="sample sample-q">{q}</div>
                {/*<Divider width="80%"/>*/}
                <div className="sample sample-a">{a}</div>
            </div>

        </div>);
};
export default  SampleExercise;
