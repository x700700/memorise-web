import React from 'react';
import './ExamAnswer.scss'
import {isRtl} from "../../common/utils";

const ExamAnswer = ({ id, text, answered, right, wrong, rightAnswer, setAnswer }) => {

    let bg = 'white';
    if (answered) {
        if (right) {
            bg = 'forestgreen';
        } else if (rightAnswer) {
            bg = '#e6ffcc';
        } else if (wrong) {
            bg = 'brown';
        }
    }
    const styleBtn = {
        transition: `background-color ${answered ? '.2s' : '0s'} linear`,
        backgroundColor: bg,
        color: answered && wrong ? 'white' : 'inherit',
        textAlign: isRtl(text) ? 'right' : 'left',
        direction: isRtl(text) ? 'rtl' : 'ltr'
    };

    const Answered = () => {
        if (!answered) {
            setAnswer(id, text);
        }
    };

    return (
        <div className="exam-answer-container">
            <div className="btn-container" style={ styleBtn } onClick={() => Answered()}>
                {text}
            </div>
        </div>
    );

};
export default ExamAnswer;
