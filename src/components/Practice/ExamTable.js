import React, {useEffect, useState} from 'react';
import './ExamTable.scss';
import ExamPage from "./ExamPage";

const ExamTable = ({ size, num, q, answers, nextQuestion, setAnswer, isAnswered, answeredId }) => {
    const [prevQ, setPrevQ] = useState();
    const [prevAnswers, setPrevAnswers] = useState();
    const [currQ, setCurrQ] = useState();
    const [currAnswers, setCurrAnswers] = useState();
    const [showPrev, setShowPrev] = useState(false);

    useEffect(() => {
        if (!currQ || !currAnswers) {
            setCurrQ(q);
            setCurrAnswers(answers);
        } else if (prevQ && prevQ !== q) {
            setShowPrev(true);
            setCurrQ(q);
            setCurrAnswers(answers);
        } else {
            setPrevQ(q);
            setPrevAnswers(answers);
        }
        const prevPaperIsOut = () => {
            setPrevQ(q);
            setPrevAnswers(answers);
            setShowPrev(false);
        };

        document.getElementById("exam-previous-paper").addEventListener("transitionend", prevPaperIsOut);
        return () => {
            document.getElementById("exam-previous-paper").removeEventListener("transitionend", prevPaperIsOut);
        }
    }, [q, answers, setShowPrev, prevQ, currQ, currAnswers, prevAnswers]);

    return (
        <div className="exam-table">
            <div id="exam-previous-paper" className={`exam-previous-paper-container ${showPrev ? 'prev-show' : ''}`}>
                <ExamPage size={size} num={num} q={prevQ} answers={prevAnswers} nextQuestion={nextQuestion}
                          isPrevPage={true} isAnswered={isAnswered} showPrev={showPrev}/>
            </div>
            <ExamPage size={size} num={num} q={currQ} answers={currAnswers} nextQuestion={nextQuestion}
                      setAnswer={setAnswer} isAnswered={isAnswered} answeredId={answeredId}/>
        </div>
    );
};
export default ExamTable;
