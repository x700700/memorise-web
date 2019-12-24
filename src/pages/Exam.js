import React, {useEffect} from 'react';
import './Exam.scss';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import logger from "../common/logger";
import * as types from '../redux/actionsTypes';
import consts from "../common/consts";
import ExamSum from "../components/Practice/ExamSum";
import PopUpBox from "../components/_Tools/PopUpBox";
import ExamTable from "../components/Practice/ExamTable";
import {getExamTraining} from "../redux/actions";
import {useTranslation} from "react-i18next";


const Exam = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();

    const showMenu = useSelector(state => state.app.showMenu);
    const trainingIdToFetch = useSelector(state => state.exam.trainingIdToFetch);
    const trainingFriendName = useSelector(state => state.exam.friendName);
    const examTrainingIsFetching = useSelector(state => state.exam.trainingIsFetching);
    const examTrainingIsLoaded = useSelector(state => state.exam.trainingIsLoaded);
    const isDeckLoaded = useSelector(state => state.exam.isDeckLoaded);

    const trainingId = useSelector(state => state.exam.trainingId);
    const fullTrainingName = useSelector(state => state.exam.fullName);
    const playDeckSize = useSelector(state => state.exam.playDeckSize);
    const rightsNum = useSelector(state => state.exam.rightsNum);
    const deckCurrentSize = useSelector(state => state.exam.deckCurrentSize);
    const currQ = useSelector(state => state.exam.cardQ);
    const answers = useSelector(state => state.exam.answers);
    const topQAnswerId = useSelector(state => state.exam.topQAnswerId);
    const isPageAnswered = useSelector(state => state.exam.isExamPageAnswered);
    const examEnded = useSelector(state => state.exam.isEnded);


    const setAnswer = (id, text) => {
        dispatch({ type: types.EXAM_SET_ANSWER, id: id });
    };
    const nextQuestion = () => {
        dispatch({ type: types.EXAM_NEXT_QUESTION });
    };
    const replayExam = () => {
        dispatch({ type: types.EXAM_SET_ENDED, ended: false });
        dispatch({ type: types.EXAM_REPLAY });
    };


    useEffect(() => {
        logger.trace('Exam loaded - validaing it -  ', examTrainingIsLoaded, trainingId, playDeckSize);
        if (examTrainingIsLoaded && trainingId && playDeckSize < 3) {
            localStorage.removeItem(consts.localStorage.examId);
            dispatch({ type: types.EXAM_SET_TRAINING_ID, id: null, friendName: null });
            dispatch({ type: types.APP_SET_ERROR, error: t('err-exam-too-small') });
            dispatch({ type: types.EXAM_LOAD });
            history.push(`/trainings/${trainingId || '-'}/edit`);
        }
    }, [examTrainingIsLoaded, trainingId, playDeckSize, t, dispatch, history]);

    useEffect(() => {
        logger.trace('Exam mounted');
        dispatch({ type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.exam });
        dispatch({type: types.APP_SHOW_MENU, show: false});

        if (!examTrainingIsFetching && trainingIdToFetch) {
            dispatch(getExamTraining(trainingIdToFetch, trainingFriendName));
        } else if (!examTrainingIsFetching && !isDeckLoaded) {
            dispatch({ type: types.EXAM_LOAD });
        }
    }, [trainingIdToFetch, examTrainingIsFetching, trainingFriendName, isDeckLoaded, dispatch, history]);

    return (
        <div className="exam-desktop-container">
            <div className={`exam-container ${showMenu ? 'disable-pointer' : ''}`}>
                {!examTrainingIsFetching && (currQ || examEnded) ?
                    <div className="exam">
                        <ExamTable trainingName={fullTrainingName}
                                   size={playDeckSize} num={playDeckSize - deckCurrentSize + 1}
                                   q={currQ} answers={answers}
                                   isAnswered={isPageAnswered} answeredId={topQAnswerId}
                                   nextQuestion={nextQuestion} setAnswer={setAnswer}/>
                    </div> : trainingIdToFetch && !examTrainingIsFetching && !examTrainingIsLoaded &&
                    <div>
                    </div>
                }
            </div>
            <PopUpBox show={examEnded}>
                <ExamSum trainingName={fullTrainingName}
                         setStats={examEnded} cardsNum={playDeckSize} rightsNum={rightsNum} replayExam={() => replayExam}/>
            </PopUpBox>
        </div>
    );
};
export default Exam;
