import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import './ExamPage.scss';
import ExamAnswer from "../../components/Practice/ExamAnswer";

const ExamPage = forwardRef(({ size, num, q, answers, replaceCard, isPrevPage, setAnswer }, ref) => {
    const [answered, setAnswered] = useState(false);

    useImperativeHandle(ref, () => ({
        setResult(id) {
            console.warn('search id', id, answers);

        },
    }));

    const answeredCb = (id, text) => {
        setAnswered(true);
        setAnswer(id, text);
    };

    useEffect(() => {
        setAnswered(false);
    }, [q, setAnswered]);

    return (
        <div className="exam-page-container">
            <div className={`exam-page ${isPrevPage ? 'prev-page-flow' : ''}`}>
                {q &&
                <div className={`cards-left ${isPrevPage ? 'disable-prev-card' : ''}`}>
                    <span><i className="fas fa-arrow-up"/></span>
                    <span>{num} / {size}</span>
                </div>
                }
                <div className="exam-col">
                    <div className="question">
                        <span>{q}</span>
                    </div>
                    <div className="answers-container">
                        <div className="answers-col">
                            {answers && Array.isArray(answers) && answers.length > 0 && answers.map((a, i) => {
                                // console.warn('=-=-=-=->', a.right);
                                return (
                                    <div key={`answer-${i+1}`} className="each-answer-container">
                                        <ExamAnswer id={a.id} text={a.examA} answered={answered || isPrevPage}
                                                    trueAnswer={a.right}
                                                    setPageAnswered={answeredCb}
                                                    right={a.answeredRight}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={`next-btn-container ${isPrevPage || !answered ? 'next-btn-disable' : ''}`}>
                        <button onClick={replaceCard} className="btn"><i className="fas fa-forward"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
});
export default ExamPage;
