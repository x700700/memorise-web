import React from 'react';
import './ExamAnswer.scss'

const ExamAnswer = ({ text, answered, right, wrong, trueAnswer }) => {
    let bg = 'white';
    if (answered) {
        if (right) bg = 'forestgreen';
        if (wrong) bg = 'brown';
        if (trueAnswer) bg = '#e6ffcc';
    }
    const styleBtn = {
        backgroundColor: bg,
        color: answered && wrong ? 'white' : 'inherit',
    };
    return (
        <div className="exam-answer-container">
            <div className="btn-container" style={styleBtn}>
                {text}
            </div>
        </div>
    );

};
export default ExamAnswer;
