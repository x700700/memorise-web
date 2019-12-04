import React, {useEffect, useRef, useState} from 'react';
import './ExamTable.scss';
import ExamPage from "./ExamPage";

const ExamTable = ({ size, num, q, answers, replaceCard, setAnswer, isAnswered, answeredId }) => {
    const [currQ, setCurrQ] = useState();
    const [currAnswers, setCurrAnswers] = useState();
    const [showPrev, setShowPrev] = useState(false);
    const refPrevPage = useRef();

    const copyAnswerToPrev = (id, text) => {
        // refPrevPage.current.setResult(answers);
        // setCurrAnswers(answers);
        setAnswer(id, text);
    };

    useEffect(() => {
        if (currQ && currQ !== q) {
            setShowPrev(true);
        } else {
            setCurrQ(q);
            setCurrAnswers(answers);
        }
    }, [q, answers, setShowPrev, currQ, currAnswers]);

    useEffect(() => {
        const prevPaperIsOut = () => {
            setCurrQ(q);
            setCurrAnswers(answers);
            setShowPrev(false);
        };

        document.getElementById("exam-previous-paper").addEventListener("transitionend", prevPaperIsOut);
        return () => {
            document.getElementById("exam-previous-paper").removeEventListener("transitionend", prevPaperIsOut);
        }
    }, [setShowPrev, q, answers]);

    return (
        <div className="exam-table">
            <div id="exam-previous-paper" className={`exam-previous-paper-container ${showPrev ? 'prev-show' : ''}`}>
                <ExamPage ref={refPrevPage}
                          size={size} num={num} q={currQ} answers={currAnswers} replaceCard={replaceCard}
                          isPrevPage={true} isAnswered={isAnswered}/>
            </div>
            <ExamPage size={size} num={num} q={q} answers={answers} replaceCard={replaceCard}
                      setAnswer={copyAnswerToPrev} isAnswered={isAnswered} answeredId={answeredId}/>
        </div>
    );
};
export default ExamTable;
