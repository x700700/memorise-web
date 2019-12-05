import React from "react";
import './Training.scss'
import SampleExercise from "./SampleExercise";

const Training = ({ training }) => {

    const play = () => {
        console.warn('Play training - ', training.id);
    };
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
                            <SampleExercise q={training.sampleExercise.q} a={training.sampleExercise.a}/>
                        </div>
                        }
                    </div>
                </div>
                <div className="training-btns-container">
                    <div className="btns-col">
                        <div className="btn-play">
                            <button onClick={() => play()} className="btn"><i className="fas fa-running"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Training;
