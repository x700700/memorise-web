import React, {useEffect, useState} from 'react';
import './ExamPage.scss';
import ExamAnswer from "../../components/Practice/ExamAnswer";

const ExamPage = ({ size, num, q, answers, replaceCard, isPrevPage }) => {
    const [answered, setAnswered] = useState(false);

    const answeredCb = () => {
        setAnswered(true);
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
                                return (
                                    <div key={i} className="each-answer-container">
                                        <ExamAnswer text={a.examA} answered={answered || isPrevPage}
                                                    right={false} wrong={false} trueAnswer={a.right}
                                                    setPageAnswered={answeredCb}
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
};
export default ExamPage;
