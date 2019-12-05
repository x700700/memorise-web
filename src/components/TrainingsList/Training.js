import React from "react";
import './Training.scss'

const Training = ({ training }) => {

    return (
        <div className="training-container">
            <div className="training-row">
                <div className="name">
                    {training.name}
                </div>
                <div className="sample-exercises-container">
                    <div className="exercises-row">
                        {training.sampleExercise &&
                        <div key={`sample-exercise-`}>
                            {training.sampleExercise.q}
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Training;
