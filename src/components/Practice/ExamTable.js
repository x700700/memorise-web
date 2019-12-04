import React, {useEffect, useState} from 'react';
import './ExamTable.scss';
import ExamPage from "./ExamPage";

const ExamTable = ({ size, num, q, answers, replaceCard, setAnswer, isAnswered, answeredId }) => {
    const [currQ, setCurrQ] = useState();
    const [currAnswers, setCurrAnswers] = useState();
    const [showPrev, setShowPrev] = useState(false);

    useEffect(() => {
        if (currQ && currQ !== q) {
            setShowPrev(true);
        } else {
            setCurrQ(q);
            setCurrAnswers(answers);
        }
        const prevPaperIsOut = () => {
            setCurrQ(q);
            setCurrAnswers(answers);
            setShowPrev(false);
        };

        document.getElementById("exam-previous-paper").addEventListener("transitionend", prevPaperIsOut);
        return () => {
            document.getElementById("exam-previous-paper").removeEventListener("transitionend", prevPaperIsOut);
        }
    }, [q, answers, setShowPrev, currQ, currAnswers]);

    return (
        <div className="exam-table">
            <div id="exam-previous-paper" className={`exam-previous-paper-container ${showPrev ? 'prev-show' : ''}`}>
                <ExamPage size={size} num={num} q={currQ} answers={currAnswers} replaceCard={replaceCard}
                          isPrevPage={true} isAnswered={isAnswered}/>
            </div>
            <ExamPage size={size} num={num} q={q} answers={answers} replaceCard={replaceCard}
                      setAnswer={setAnswer} isAnswered={isAnswered} answeredId={answeredId}/>
        </div>
    );
};
export default ExamTable;
