import React, {useEffect, useState} from 'react';
import './ExamTable.scss';
import ExamPage from "./ExamPage";

const ExamTable = ({ size, num, q, answers, nextQuestion, setAnswer, isAnswered, answeredId }) => {
    const [prevQ, setPrevQ] = useState();
    const [prevNum, setPrevNum] = useState();
    const [prevAnswers, setPrevAnswers] = useState();
    const [currQ, setCurrQ] = useState();
    const [currNum, setCurrNum] = useState();
    const [currAnswers, setCurrAnswers] = useState();
    const [showPrev, setShowPrev] = useState(false);

    useEffect(() => {
        // console.warn(`===> q=[${q}] <> currQ=[${currQ}] - answers=[${answers && answers.length}] <> currAnswers=[${currAnswers && currAnswers.length}]`);
        if (!currQ || !currAnswers || (currAnswers && currAnswers.length === 0)) {
            setCurrQ(q);
            setCurrNum(num);
            q && setCurrAnswers(answers);
        } else if (prevQ && prevQ !== q) {
            setShowPrev(true);
            setCurrQ(q);
            setCurrNum(num);
            setCurrAnswers(answers);
        } else {
            setPrevQ(q);
            setPrevNum(num);
            setPrevAnswers(answers);
        }
        const prevPaperIsOut = () => {
            setPrevNum(num);
            setPrevAnswers(answers);
            setShowPrev(false);
        };

        document.getElementById("exam-previous-paper").addEventListener("transitionend", prevPaperIsOut);
        return () => {
            document.getElementById("exam-previous-paper").removeEventListener("transitionend", prevPaperIsOut);
        }
    }, [q, answers, setShowPrev, prevQ, currQ, currAnswers, setCurrAnswers, prevAnswers]);

    return (
        <div className="exam-table">
            <div id="exam-previous-paper" className={`exam-previous-paper-container ${showPrev ? 'prev-show' : ''}`}>
                <ExamPage size={size} num={prevNum} q={prevQ} answers={prevAnswers} nextQuestion={nextQuestion}
                          isPrevPage={true} isAnswered={isAnswered} showPrev={showPrev}/>
            </div>
            <ExamPage size={size} num={currNum} q={currQ} answers={currAnswers} nextQuestion={nextQuestion}
                      setAnswer={setAnswer} isAnswered={isAnswered} answeredId={answeredId}/>
        </div>
    );
};
export default ExamTable;
