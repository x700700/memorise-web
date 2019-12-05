import React from "react";
import './SampleExercise.scss';

const SampleExercise = ({ q, a }) => {
    return (
        <div className="sample-exercise-container">
            <div className="sample-exercise-col">
                <div className="sample-q">{q}</div>
                <div className="sample-a">{a}</div>
            </div>

        </div>);
};
export default  SampleExercise;
