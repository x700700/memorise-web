import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import {useTranslation} from "react-i18next";
import * as types from '../redux/actionsTypes';
import './Exam.scss';
import consts from "../common/consts";
import CardsDeck from '../components/Practice/cardsDeck';
import { loadPlay } from "../common/playUtils";
import mockTrainingMultiply from '../mock/training-multiply';
import ExamSum from "../components/Practice/ExamSum";
import PopUpBox from "../components/_Tools/PopUpBox";
import ExamTable from "../components/Practice/ExamTable";
import {getExamTraining} from "../redux/actions";


const Exam = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [, setTopCard] = useState(null); // !! This is necessary for making the dom render on next card !!
    const [isPageAnswered, setIsPageAnswered] = useState();
    const [topQAnswerId, setTopQAnswerId] = useState(null);
    const [answers, setAnswers] = useState(null);

    const showMenu = useSelector(state => state.app.showMenu);
    const cardsDeck = useSelector(state => state.app.examCardsDeck);
    const examEnded = useSelector(state => state.app.isExamEnded);
    const defaultDeckSize = useSelector(state => state.app.examDefaultDeckSize);

    const examTrainingId = useSelector(state => state.app.examTrainingId);
    const friendName = useSelector(state => state.app.friendName);
    const examTrainingIsFetching = useSelector(state => state.app.examTrainingIsFetching);
    const examTrainingIsLoaded = useSelector(state => state.app.examTrainingIsLoaded);
    const examTraining = useSelector(state => state.app.examTraining);


    const setAnswer = (id, text) => {
        cardsDeck.setTopQAnswer(id);
        setIsPageAnswered(cardsDeck.getIsExamPageAnswered());
        setTopQAnswerId(id);
        setAnswers(cardsDeck.getTopQAnswers());
        setTopCard(cardsDeck.top()); // !! This is necessary for making the dom render on next card !!
    };
    const nextQuestion = () => {
        const ended = cardsDeck.nextQuestion();
        ended && dispatch({ type: types.APP_SET_EXAM_ENDED, ended: true });
        setIsPageAnswered(false);
        setTopQAnswerId(null);
        setAnswers(cardsDeck.getTopQAnswers());
    };
    const replayExam = () => {
        dispatch({ type: types.APP_SET_EXAM_ENDED, ended: false });
        cardsDeck.replay(defaultDeckSize);
        dispatch({ type: types.APP_SET_EXAM_CARDSDECK, cardsDeck: cardsDeck });
    };

    useEffect(() => {
        if (cardsDeck) {
            const isAnswered = cardsDeck.getIsExamPageAnswered();
            // console.warn('**** Exam is updating ***** isAnswered = ', isAnswered);
            setIsPageAnswered(isAnswered);
            setTopQAnswerId(cardsDeck.getTopQAnswerId());
            setAnswers(cardsDeck.getTopQAnswers());
        }
    }, [cardsDeck, setIsPageAnswered, setAnswers, topQAnswerId, answers, examEnded, showMenu]);


    const loadExam = (training) => {
        const createNewDeck = (shouldFlipped) => {
            return new CardsDeck(consts.localStorage.examId, training, shouldFlipped);
        };
        const shouldDeckFlipped = (cardsDeck && cardsDeck.getIsDeckFlipped()) || false;
        return loadPlay(consts.localStorage.examId, createNewDeck,
            () => dispatch({ type: types.APP_SET_EXAM_ENDED, ended: true }),
            (newDeck) => dispatch({ type: types.APP_SET_EXAM_CARDSDECK, cardsDeck: newDeck }),
            shouldDeckFlipped);
    };
    useEffect(() => {
        if (examTraining) {
            // console.warn('loadExam(examTraining);');
            const newDeck = loadExam(examTraining);
            newDeck && setAnswers(newDeck.getTopQAnswers());
            if (newDeck.getSize() < 3) {
                localStorage.removeItem(consts.localStorage.examId);
                dispatch({ type: types.APP_RESET_EXAM_TRAINING });
                dispatch({ type: types.APP_SET_ERROR, error: t('err-exam-too-small') });
                history.push(`/trainings/${examTrainingId || '-'}/edit`);
            }
        }
    }, [examTraining, setAnswers]);

    useEffect(() => {
        // console.warn('Exam mount - ', examTrainingId);
        dispatch({ type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.exam });
        dispatch({type: types.APP_SHOW_MENU, show: false});

        if (examTrainingId) {
            localStorage.removeItem(consts.localStorage.examId);
            dispatch({ type: types.APP_SET_EXAM_CARDSDECK, cardsDeck: null });
            dispatch({ type: types.APP_SET_EXAM_ENDED, ended: false });
            dispatch(getExamTraining(examTrainingId, friendName));
        } else if (!cardsDeck) {
            // console.warn('loadExam(mock);');
            loadExam(mockTrainingMultiply.__T001);
        }
    }, [dispatch, history]);

    const size = cardsDeck && cardsDeck.getSizeDeck();
    const rightsNum = cardsDeck && cardsDeck.getRightsNum();
    const curr = cardsDeck && cardsDeck.sizeCurr();
    const currQ = cardsDeck && cardsDeck.topQ();

    return (
        <div className="exam-desktop-container">
            <div className={`exam-container ${showMenu ? 'disable-pointer' : ''}`}>
                {!examTrainingIsFetching && (currQ || examEnded) ?
                    <div className="exam">
                        <ExamTable size={size} num={size - curr + 1} q={currQ} answers={answers}
                                   isAnswered={isPageAnswered} answeredId={topQAnswerId}
                                   nextQuestion={nextQuestion} setAnswer={setAnswer}/>
                    </div> : examTrainingId && !examTrainingIsFetching && !examTrainingIsLoaded &&
                    <div>
                        Network Error -
                        Either refresh for Default Exam, or go back to Training tab.
                    </div>
                }
            </div>
            <PopUpBox show={examEnded}>
                <ExamSum setStats={examEnded} cardsNum={size} rightsNum={rightsNum} replayExam={() => replayExam}/>
            </PopUpBox>
        </div>
    );
};
export default Exam;
