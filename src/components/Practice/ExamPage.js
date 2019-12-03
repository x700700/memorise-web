import React from 'react';
import './ExamPage.scss';
import ExamAnswer from "../../components/Practice/ExamAnswer";

const ExamPage = ({ size, num, q, answers, replaceCard, isPrevPage }) => {

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
                            {answers && answers.length > 0 && answers.map((a, i) => {
                                return (
                                    <div key={i} className="each-answer-container">
                                        <ExamAnswer text={a} answered={false} right={i==3} wrong={i==1} trueAnswer={i===2} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={`next-btn-container ${isPrevPage ? 'disable-prev-card' : ''}`}>
                        <button onClick={replaceCard} className="btn"><i className="fas fa-forward"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ExamPage;
