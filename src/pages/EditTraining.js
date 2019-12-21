import React, {useEffect, useRef, useState} from "react";
import './EditTraining.scss';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import logger from "../common/logger";
import consts from "../common/consts";
import * as types from "../redux/actionsTypes";
import {deleteTraining, getEditTraining} from "../redux/actions";
import Exercise from "../components/EditTraining/Exercise";
import EditTrainingHeader from "../components/EditTraining/EditTrainingHeader";
import ModalOkCancel from "../components/_Tools/ModalOkCancel";


const EditTraining = (props) => {
    const paramId = props.match.params.id;
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();

    const showMenu = useSelector(state => state.app.showMenu);
    const isFetching = useSelector(state => state.editTraining.isFetching);
    const isLoaded = useSelector(state => state.editTraining.isLoaded);
    const training = useSelector(state => state.editTraining.training);
    const idToFetch = useSelector(state => state.editTraining.idToFetch);
    const fetchedId = useSelector(state => state.editTraining.fetchedId);
    const idToDelete = useSelector(state => state.editTraining.idToDelete);

    const exercisesMap = isLoaded && training && training.exercises;
    const exercisesList = exercisesMap && Object.values(exercisesMap);
    const [disableExercisesEdit, setDisableExercisesEdit] = useState(false);

    const play = () => {
        // logger.warn('play training - ', training);
        dispatch({ type: types.GAME_SET_TRAINING_ID, id: training.id, friendName: null });
        history.push('/practice');
    };
    const exam = () => {
        // logger.warn('exam training - ', training);
        dispatch({ type: types.EXAM_SET_TRAINING_ID, id: training.id, friendName: null });
        history.push('/exam');
    };
    const onNameEdit = (edit) => {
        // logger.warn('on name edit - ', edit);
        edit && setDisableExercisesEdit(edit);
        !edit && setTimeout(() => setDisableExercisesEdit(edit), 100);
    };
    const trainingDelete = () => {
        dispatch(deleteTraining(training.id));
        refModal.current.close();
        dispatch({ type: types.TRAINING_RESET });
        history.push('/trainings');
    };
    const cancelDelete = () => {
        refModal.current.close();
    };


    useEffect(() => {
        logger.trace('EditTraining update - id to delete, open approval modal');
        if (idToDelete) {
            refModal.current.open();
            dispatch({ type: types.TRAINING_SET_DELETE_ID, id: null });
        }
    }, [idToDelete, dispatch]);

    useEffect(() => {
        logger.trace('EditTraining update - fetch status, redirect on error');
        if (!isFetching && !isLoaded && idToFetch && !fetchedId) {
            logger.error('Training was not fetched - redirect to list');
            dispatch({ type: types.TRAINING_RESET });
            history.push('/trainings');
        }
    }, [isFetching, isLoaded, idToFetch, fetchedId, history, dispatch]);



    // const getEditTrainingCb = useCallback((id) => dispatch(getEditTraining(id)), [getEditTraining]);
    useEffect(() => {
        logger.trace('EditTraining loading data - ', paramId , isFetching, idToDelete, training && training.id);
        if ((paramId && !training && !isFetching) || (training && paramId && paramId !== training.id)) {
            paramId !== '-' && !isFetching && paramId !== idToDelete && dispatch(getEditTraining(paramId));
        }
    }, [dispatch, paramId, idToDelete, training, isFetching]);

    useEffect(() => {
        logger.trace('EditTraining mounted');
        dispatch({type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.edit});
        dispatch({type: types.APP_SHOW_MENU, show: false});
        dispatch({ type: types.GAME_SET_TRAINING_ID, id: null, friendName: null });
        dispatch({ type: types.EXAM_SET_TRAINING_ID, id: null, friendName: null });
    }, [dispatch]);

    const refModal = useRef();
    return (
        <div className="edit-training-page">
            <div className="edit-training-container">
                <div className="header-container">
                    <div className="header-box">
                        {training &&
                        <EditTrainingHeader id={training.id} onNameEdit={onNameEdit} play={play} exam={exam}
                        />
                        }
                    </div>
                    <div className="header-place-holder"/>
                </div>
                <div className="edit-training-flex">
                    {exercisesList && exercisesList.map((x,i) => {
                        return (
                            <div key={`edit-training-exercise-${i}`} className="exercise-container">
                                <Exercise exercise={x} disable={showMenu || disableExercisesEdit}/>
                            </div>);
                    })}
                </div>
            </div>
            <ModalOkCancel ref={refModal} title={training && training.name}
                           okMsg={t('delete')} cancelMsg={t('cancel')} cancelType="cancel-delete"
                           onOk={() => trainingDelete} onCancel={() => cancelDelete}
                           disableBackdropClick={false}
            >
                <div className="delete-approval-container">
                    {t('delete-training-approval')}
                </div>
            </ModalOkCancel>
        </div>)
};
export default EditTraining;
