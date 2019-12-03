import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import * as types from '../redux/actionsTypes';
import './Exam.scss';
import consts from "../common/consts";
import CardsDeck from '../components/Practice/cardsDeck';
import { loadPlay } from "../common/playUtils";
import mockTraining from '../mock/training-multiply';
import ExamSum from "../components/Practice/ExamSum";
import PopUpBox from "../components/common/PopUpBox";
import ExamTable from "../components/Practice/ExamTable";

const Exam = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [, setTopCard] = useState(null); // !! This is necessary for making the dom render on next card !!
    // const showMenu = useSelector(state => state.app.showMenu);
    const cardsDeck = useSelector(state => state.app.examCardsDeck);
    const examEnded = useSelector(state => state.app.isExamEnded);
    const defaultDeckSize = useSelector(state => state.app.examDefaultDeckSize);

    const replaceCard = (good) => {
        const ended = cardsDeck.nextCard(good);
        ended && dispatch({ type: types.APP_SET_EXAM_ENDED, ended: true });
        setTopCard(cardsDeck.top()); // !! This is necessary for making the dom render on next card !!
    };
    const replayExam = () => {
        dispatch({ type: types.APP_SET_EXAM_ENDED, ended: false });
        cardsDeck.replay(defaultDeckSize);
        dispatch({ type: types.APP_SET_EXAM_CARDSDECK, cardsDeck: cardsDeck });
    };

    useEffect(() => {
        // console.warn('Exam mount');
        dispatch({ type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.exam });
        dispatch({type: types.APP_SHOW_MENU, show: false});

        const createNewDeck = (shouldFlipped) => {
            return new CardsDeck(consts.localStorage.examId, mockTraining, shouldFlipped);
        };

        const shouldDeckFlipped = (cardsDeck && cardsDeck.getIsDeckFlipped()) || false;
        loadPlay(consts.localStorage.examId, createNewDeck,
                    () => dispatch({ type: types.APP_SET_EXAM_ENDED, ended: true }),
                    (newDeck) => dispatch({ type: types.APP_SET_EXAM_CARDSDECK, cardsDeck: newDeck }),
                     shouldDeckFlipped);

    }, [dispatch, history]);

    // const id = props.match.params.id;

    const size = cardsDeck && cardsDeck.getSizeDeck();
    const playsNum = cardsDeck && cardsDeck.playsNum();
    const curr = cardsDeck && cardsDeck.sizeCurr();
    const currQ = cardsDeck && cardsDeck.topQ();
    const answers = ['40', '26', '81', '100', '524,781,924.346'];
    return (
        <div className="exam-desktop-container">
            <div className="exam-container">
                {(currQ || examEnded) &&
                <div className="exam">
                    <ExamTable size={size} num={size-curr+1} q={currQ} answers={answers} replaceCard={replaceCard}/>
                </div>}
            </div>
            <PopUpBox show={examEnded}>
                <ExamSum setStats={examEnded} cardsNum={size} playsNum={playsNum} replayExam={() => replayExam}/>
            </PopUpBox>
        </div>
    );
};
export default Exam;
