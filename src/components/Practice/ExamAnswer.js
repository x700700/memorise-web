import React from 'react';
import './ExamAnswer.scss'

const ExamAnswer = ({ id, text, answered, right, wrong, trueAnswer, setAnswer }) => {

    let bg = 'white';
    if (answered) {
        if (right) {
            bg = 'forestgreen';
        } else if (trueAnswer) {
            bg = '#e6ffcc';
        } else if (wrong) {
            bg = 'brown';
        }
    }
    const styleBtn = {
        backgroundColor: bg,
        color: answered && wrong ? 'white' : 'inherit',
    };

    const Answered = () => {
        if (!answered) {
            setAnswer(id, text);
        }
    };

    return (
        <div className="exam-answer-container">
            <div className="btn-container" style={styleBtn} onClick={() => Answered()}>
                {text} - [{trueAnswer}]
            </div>
        </div>
    );

};
export default ExamAnswer;
