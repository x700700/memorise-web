import React from 'react';
import './ExamAnswer.scss'

const ExamAnswer = ({ text }) => {
    return (
        <div className="exam-answer-container">
            <div className="btn-container">
                {text}
            </div>
        </div>
    );

};
export default ExamAnswer;
