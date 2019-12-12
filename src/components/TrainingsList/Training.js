import React from "react";
import {useDispatch, useSelector} from "react-redux";
import './Training.scss'
import * as types from '../../redux/actionsTypes';
import SampleExercise from "./SampleExercise";
import {useHistory} from "react-router-dom";
import { isRtl } from "../../common/utils";
import DrawerButtons from "./DrawerButtons";
import CardsDeck from "../Practice/cardsDeck";
import consts from "../../common/consts";


const Training = ({ training }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoggedIn = useSelector(state => state.app.userName) && true;
    const activeDrawerTrainingId = useSelector(state => state.app.activeDrawerTrainingId);

    const sampleExercise = (training && training.sampleExercise) || {q: '', a: ''};

    const edit = () => {
        if (!isLoggedIn || activeDrawerTrainingId) return;
        console.warn('Edit training - ', training.id);
        if (!training.id.startsWith('__')) {
            dispatch({type: types.TRAINING_RESET});
            history.push(`/trainings/${training.id}/edit`)
        }
    };
    const play = () => {
        // if (!isLoggedIn) return;
        console.warn('Play training - ', training.id);
        if (!training.id.startsWith('__')) {
            dispatch({ type: types.APP_SET_GAME_TRAINING_ID, id: training.id });
        } else {
            dispatch({ type: types.APP_SET_GAME_TRAINING_ID, id: null });
            const cardsDeck = new CardsDeck(consts.localStorage.gameId, training, false);
            dispatch({ type: types.APP_SET_GAME_CARDSDECK, cardsDeck: cardsDeck });
            dispatch({ type: types.APP_SET_GAME_ENDED, ended: false });
        }
        history.push('/practice');
    };
    const exam = () => {
        // if (!isLoggedIn) return;
        console.warn('Exam training - ', training.id);
        if (!training.id.startsWith('__')) {
            dispatch({type: types.APP_SET_EXAM_TRAINING_ID, id: training.id});
        } else {
            dispatch({ type: types.APP_SET_EXAM_TRAINING_ID, id: null });
            const cardsDeck = new CardsDeck(consts.localStorage.examId, training, false);
            dispatch({ type: types.APP_SET_EXAM_CARDSDECK, cardsDeck: cardsDeck });
            dispatch({ type: types.APP_SET_EXAM_ENDED, ended: false });
        }
        history.push('/exam');
    };

    const playIcons = [
        {
            name: 'copy',
            onClick: play,
        },
        {
            name: 'grin-beam-sweat',
            onClick: exam,
        },
    ];

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
                    <div className="name-container" onClick={!activeDrawerTrainingId ? play : () => {}}>
                        <div className="name" style={rtlName(training.name)}>
                            {training.name}
                        </div>
                    </div>
                    <div className="sample-exercises-container" onClick={edit}>
                        <div className="exercises-row">
                            {sampleExercise &&
                            <div key={`sample-exercise-`} style={{ width: '100%' }}>
                                <SampleExercise q={sampleExercise.q} a={sampleExercise.a}/>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="training-btns-container">
                        <DrawerButtons size={2} backgroundColor="f3f3f3" backgroundColorDraw="e3e3e3"
                                       icons={playIcons}
                                       trainingId={training.id} forceClose={training.id !== activeDrawerTrainingId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Training;
