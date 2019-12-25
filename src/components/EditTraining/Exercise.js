import React, {useEffect, useRef} from "react";
import './Exercise.scss';
import {useDispatch, useSelector} from "react-redux";
import logger from "../../common/logger";
import * as types from "../../redux/actionsTypes";
import {isRtl} from "../../common/utils";
import ExerciseEditModal from "./ExerciseEditModal";


const Exercise = ({ exercise, disable }) => {
    const dispatch = useDispatch();
    const refModal = useRef();
    const lastNewExerciseId = useSelector(state => state.editTraining.lastNewExerciseId);

    const edit = () => {
        !disable && refModal.current.open();
    };


    useEffect(() => {
        logger.trace('Exercise update');
        if (lastNewExerciseId && lastNewExerciseId === exercise.id) {
            logger.trace('new exercise');
            dispatch({ type: types.TRAINING_UPDATE_LAST_NEW_EXERCISE_ID, id: null });
            !disable && refModal.current.open();
        }
    }, [lastNewExerciseId, dispatch, disable, refModal, exercise.id]);

    const styleContainer = {
        backgroundColor: exercise.q.trim() && exercise.a.trim() ? 'lightgoldenrodyellow' : '#ffdddd',
    };
    const styleQ = {
        direction: isRtl(exercise.q) ? 'rtl' : 'ltr',
    };
    const styleA = {
        direction: isRtl(exercise.a) ? 'rtl' : 'ltr',
    };

    return (
        <div className="edit-training-exercise-container" style={styleContainer}>
            <div className="exercise-col" onClick={edit}>
                <div className="exercise question" style={styleQ}>{exercise.q}</div>
                <div className="exercise answer" style={styleA}>{exercise.a}</div>
            </div>

            <ExerciseEditModal modalRef={refModal} exercise={exercise} disable={disable} />
        </div>);
};
export default Exercise;
