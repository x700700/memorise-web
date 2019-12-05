import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import * as types from '../redux/actionsTypes';
import './Exam.scss';
import consts from "../common/consts";
import CardsDeck from '../components/Practice/cardsDeck';
import { loadPlay } from "../common/playUtils";
import training from '../mock/training-words1';
import ExamSum from "../components/Practice/ExamSum";
import PopUpBox from "../components/_Tools/PopUpBox";
import ExamTable from "../components/Practice/ExamTable";

const Exam = (props) => {
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

    useEffect(() => {
        // console.warn('Exam mount');
        dispatch({ type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.exam });
        dispatch({type: types.APP_SHOW_MENU, show: false});

        const createNewDeck = (shouldFlipped) => {
            return new CardsDeck(consts.localStorage.examId, training, shouldFlipped);
        };

        const shouldDeckFlipped = (cardsDeck && cardsDeck.getIsDeckFlipped()) || false;
        loadPlay(consts.localStorage.examId, createNewDeck,
                    () => dispatch({ type: types.APP_SET_EXAM_ENDED, ended: true }),
                    (newDeck) => dispatch({ type: types.APP_SET_EXAM_CARDSDECK, cardsDeck: newDeck }),
                     shouldDeckFlipped);

    }, [dispatch, history]);

    const size = cardsDeck && cardsDeck.getSizeDeck();
    const rightsNum = cardsDeck && cardsDeck.getRightsNum();
    const curr = cardsDeck && cardsDeck.sizeCurr();
    const currQ = cardsDeck && cardsDeck.topQ();

    return (
        <div className="exam-desktop-container">
            <div className={`exam-container ${showMenu ? 'disable-pointer' : ''}`}>
                {(currQ || examEnded) &&
                <div className="exam">
                    <ExamTable size={size} num={size-curr+1} q={currQ} answers={answers}
                               isAnswered={isPageAnswered} answeredId={topQAnswerId}
                               nextQuestion={nextQuestion} setAnswer={setAnswer}/>
                </div>}
            </div>
            <PopUpBox show={examEnded}>
                <ExamSum setStats={examEnded} cardsNum={size} rightsNum={rightsNum} replayExam={() => replayExam}/>
            </PopUpBox>
        </div>
    );
};
export default Exam;
