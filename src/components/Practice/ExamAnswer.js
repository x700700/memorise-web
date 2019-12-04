import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import './ExamAnswer.scss'

const ExamAnswer = forwardRef(({ id, text, answered, right, wrong, trueAnswer, setPageAnswered, answeredId }, ref) => {
    const [answeredRight, setAnsweredRight] = useState(right);
    const [answeredWrong, setAnsweredWrong] = useState(wrong);

    useImperativeHandle(ref, () => ({
        setResult(right, wrong) {
            if (right) setAnsweredRight(true);
            if (wrong) setAnsweredWrong(true);
        },
    }));

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
        /*
        if (trueAnswer) {
            console.warn('Right - ', text);
            setAnsweredRight(true);
        } else {
            console.warn('Wrong - ', text);
            setAnsweredWrong(true);
        }
         */
        if (!answered) {
            setPageAnswered(id, text);
        }
    };

    useEffect(() => {
        setAnsweredRight(false);
        setAnsweredWrong(false);
    }, [text]);

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

});
export default ExamAnswer;
