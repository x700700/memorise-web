import React, { useEffect, useRef, useState } from 'react';
import './ExamTable.scss';
import ExamPage from "./ExamPage";

const ExamTable = ({ size, num, q, answers, replaceCard }) => {
    const [currQ, setCurrQ] = useState(q);
    const [showPrev, setShowPrev] = useState(false);

    useEffect(() => {
        if (q !== currQ) {
            setShowPrev(true);
        }
    }, [q, setShowPrev]);

    useEffect(() => {
        const prevPaperIsOut = () => {
            setCurrQ(q);
            setShowPrev(false);
        };

        document.getElementById("exam-previous-paper").addEventListener("transitionend", prevPaperIsOut);
    }, [setShowPrev, q]);

    return (
        <div className="exam-table">
            <div id="exam-previous-paper" className={`exam-previous-paper-container ${showPrev ? 'prev-show' : ''}`}>
                <ExamPage size={size} num={size-num+1} q={currQ} answers={answers} replaceCard={replaceCard}/>
            </div>
            <ExamPage size={size} num={size-num+1} q={q} answers={answers} replaceCard={replaceCard}/>
        </div>
    );
};
export default ExamTable;
