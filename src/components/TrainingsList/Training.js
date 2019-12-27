import React from "react";
import './Training.scss'
import {useDispatch, useSelector} from "react-redux";
import logger from "../../common/logger";
import * as types from '../../redux/actionsTypes';
import SampleExercise from "./SampleExercise";
import {useHistory} from "react-router-dom";
import { isRtl } from "../../common/utils";
import DrawerButtons from "../_Tools/DrawerButtons";


const Training = ({ training }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoggedIn = !!useSelector(state => state.app.userName);
    const activeDrawerTrainingId = useSelector(state => state.app.activeDrawerTrainingId);

    const sampleExercise = (training && training.sampleExercise) || {q: '', a: ''};

    const edit = () => {
        if (!isLoggedIn || activeDrawerTrainingId || friendName) return;
        if (!training.id.startsWith('__')) {
            logger.trace('Edit training - ', training.id);
            dispatch({type: types.TRAINING_RESET});
            history.push(`/trainings/${training.id}/edit`)
        }
    };
    const play = () => {
        // if (!isLoggedIn) return;
        // logger.warn('Play training - ', training.id);
        if (!training.id.startsWith('__')) {
            dispatch({ type: types.GAME_SET_TRAINING_ID, id: training.id, friendName: friendName || null });
        } else {
            // Offline Game (Multiply Chart)
            dispatch({ type: types.GAME_SET_TRAINING_ID, id: null });
            dispatch({ type: types.GAME_LOAD, training: training })
        }
        history.push('/practice');
    };
    const exam = () => {
        // if (!isLoggedIn) return;
        // logger.warn('Exam training - ', training.id);
        if (!training.id.startsWith('__')) {
            dispatch({ type: types.EXAM_SET_TRAINING_ID, id: training.id, friendName: friendName || null });
        } else {
            // Offline Exam (Multiply Chart)
            dispatch({ type: types.EXAM_SET_TRAINING_ID, id: null });
            dispatch({ type: types.EXAM_LOAD, training: training })
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

    const friendName = training.info.friendName;
    const disableEdit = friendName || training.id.startsWith('__');

    const styleContainer = {
        backgroundColor: friendName && '#eee6ff',
    };

    return (
        <div className="training-container" style={styleContainer}>
            <div className="training-box">
                <div className="training-btn-edit-absolute">
                    <div className="training-btn-edit">
                        <button onClick={edit} className="btn"><i className="fas fa-edit"></i></button>
                    </div>
                </div>
                <div className="training-row">
                    <div className="name-container" onClick={!activeDrawerTrainingId ? play : () => {}}>
                        <div className="name" style={rtlName(training.name)}>
                            {friendName &&
                            <span>
                                <span className="friend-name">{friendName}</span>
                                <span> - </span>
                            </span>
                            }
                            {training.name}
                        </div>
                    </div>
                    <div className="sample-exercises-container" onClick={edit}>
                        <div className="exercises-row">
                            {sampleExercise &&
                            <div key={`sample-exercise-`} style={{ width: '100%' }}>
                                <SampleExercise q={sampleExercise.q} a={sampleExercise.a} hideEditIcon={disableEdit}/>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="training-btns-container">
                        <DrawerButtons size={2} backgroundColor="#f3f3f3" backgroundColorDraw="#e3e3e3"
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
