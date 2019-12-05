import React from "react";
import './Exercise.scss';

const Exercise = ({ exercise }) => {
    return (
        <div className="edit-training-exercise-container">
            <div className="exercise-col">
                <div className="exercise question">{exercise.q}</div>
                <div className="exercise answer">{exercise.a}</div>
            </div>
        </div>);
};
export default Exercise;
