import React from "react";
import './Exercise.scss';

const Exercise = ({ exercise }) => {
    return (
        <div className="edit-training-exercise-container">
            <div className="exercise-col">
                <div className="question">{exercise.q}</div>
                <div className="answer">{exercise.a}</div>
                <br/>
                <br/>
            </div>
        </div>);
};
export default Exercise;
