import React, {useEffect, useRef} from "react";
import './AddButton.scss';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {useTranslation} from "react-i18next";
import logger from "../../common/logger";
import consts from "../../common/consts";
import {createExercise, createTraining} from "../../redux/actions";
import IconButton from "../_Tools/IconButton";
import * as types from "../../redux/actionsTypes";
import Tooltip from "../_Tools/Toolip";


const AddButton = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    const authCheckEnded = useSelector(state => state.app.authCheckEnded);
    const loggedInUserName = useSelector(state => state.app.userName);
    const authError = useSelector(state => state.app.authError);
    const currPage = useSelector(state => state.app.currentPage);
    const showMenu = useSelector(state => state.app.showMenu);
    const isModalOn = useSelector(state => state.app.isModalOn);
    const trainingNameIsOnEdit = useSelector(state => state.app.trainingNameIsOnEdit);
    const editTrainingId = useSelector(state => state.editTraining.fetchedId);

    const login = (e) => {
        refTooltip.current.close();
        history.push('/login');
    };

    const addTraining = (e) => {
        // logger.warn('Add Training');
        refTooltip.current.close();
        dispatch({ type: types.APP_SET_ACTIVE_DRAWER_TRAINING, id: null });
        window.scrollTo(0, 0);
        dispatch(createTraining());
    };
    const addExercise = (e) => {
        // logger.warn('Add Exercise');
        refTooltip.current.close();
        window.scrollTo(0, 0);
        dispatch(createExercise(editTrainingId));
    };

    useEffect(() => {
        logger.trace('Add Button mounted');
        if (authError && (currPage === consts.pageName.trainings || currPage === consts.pageName.edit)) {
            refTooltip.current.open();
            dispatch({ type: types.APP_RESET_AUTH_ERROR });
        }
    }, [authError, currPage, dispatch]);

    const refTooltip = useRef();
    const disableAddBtn = !loggedInUserName || showMenu || isModalOn || trainingNameIsOnEdit;
    return (
        <div className="add-button-container">
            <Tooltip ref={refTooltip} text={t('press me to login')} placement="left">
                <div className="btn-container">
                    <IconButton size={3} faName="user" onClick={login}
                                hide={!authCheckEnded || loggedInUserName || [consts.pageName.practice, consts.pageName.exam, consts.pageName.login].includes(currPage)}
                                color="ffe6ff" backgroundColor="ff4ddd"
                    />
                    <IconButton size={3} faName="plus" onClick={addTraining} hide={disableAddBtn || currPage !== consts.pageName.trainings}
                                color="eee6ff" backgroundColor="884dff"
                    />
                    <IconButton size={3} faName="plus" onClick={addExercise} hide={disableAddBtn || currPage !== consts.pageName.edit}
                                color="eee6ff" backgroundColor="884dff"
                    />
                </div>
            </Tooltip>
        </div>)
};
export default AddButton;
