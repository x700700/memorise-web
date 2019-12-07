import React from "react";
import './Training.scss'
import SampleExercise from "./SampleExercise";
import {useHistory} from "react-router-dom";
import { isRtl } from "../../common/utils";
import {useDispatch, useSelector} from "react-redux";
import * as types from '../../redux/actionsTypes';
import CardsDeck from '../Practice/cardsDeck';
import consts from "../../common/consts";

const Training = ({ training }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const edit = () => {
        console.warn('Edit training - ', training.id);
        history.push(`/trainings/${training.id}/edit`)
    };
    const play = () => {
        console.warn('Play training - ', training);
        // const cardsDeck = new CardsDeck(consts.localStorage.examId, training, false);
        // dispatch({ type: types.APP_SET_GAME_CARDSDECK, cardsDeck: cardsDeck });
    };

    const rtlName = text => {
        return isRtl(text) ? {
            direction: 'rtl',
            textAlign: 'right',
        } : {};
    };

    return (
        <div className="training-container">
            <div className="training-box">
                <div className="training-btn-edit-absolute">
                    <div className="training-btn-edit">
                        <button onClick={edit} className="btn"><i className="fas fa-edit"></i></button>
                    </div>
                </div>
                <div className="training-row">
                    <div className="name-container">
                        <div className="name" style={rtlName(training.name)}>
                            {training.name}
                        </div>
                    </div>
                    <div className="sample-exercises-container" onClick={edit}>
                        <div className="exercises-row">
                            {training.sampleExercise &&
                            <div key={`sample-exercise-`} style={{ width: '100%' }}>
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
        </div>
    );
};
export default Training;
