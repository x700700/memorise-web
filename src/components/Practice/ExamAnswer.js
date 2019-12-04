import React, { useEffect, useState} from 'react';
import './ExamAnswer.scss'

const ExamAnswer = ({ id, text, answered, right, wrong, trueAnswer, setAnswer, answeredId }) => {
    const [answeredRight, setAnsweredRight] = useState(right);
    const [answeredWrong, setAnsweredWrong] = useState(wrong);

    let bg = 'white';
    if (answered) {
        if (answeredRight) {
            bg = 'forestgreen';
        } else if (trueAnswer) {
            bg = '#e6ffcc';
        } else if (answeredWrong) {
            bg = 'brown';
        }
    }
    const styleBtn = {
        backgroundColor: bg,
        color: answered && answeredWrong ? 'white' : 'inherit',
    };

    const Answered = () => {
        if (!answered) {
            setAnswer(id, text);
        }
    };

    useEffect(() => {
        console.warn('answerID CHANGED')
        if (id === answeredId) {
            if (trueAnswer) {
                setAnsweredRight(true);
            }
            else {
                setAnsweredWrong(true);
            }
        }
    }, [id, answeredId, setAnsweredRight, setAnsweredWrong]);

    return (
        <div className="exam-answer-container">
            <div className="btn-container" style={styleBtn} onClick={() => Answered()}>
                {text} - [{trueAnswer}]
            </div>
        </div>
    );

};
export default ExamAnswer;
