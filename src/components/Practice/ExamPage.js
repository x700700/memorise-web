import React from 'react';
import './ExamPage.scss';
import ExamAnswer from "../../components/Practice/ExamAnswer";

const ExamPage = ({ size, num, q, answers, replaceCard }) => {

    return (
        <div className="exam-page-container">
            <div className="exam-page">
                {q &&
                <div className="cards-left">
                    {num} ({size})
                </div>
                }
                <div className="exam-col">
                    <div className="question">
                        <span>{q}</span>
                    </div>
                    <div className="answers-container">
                        <div className="answers-col">
                            {answers.map((a, i) => (
                                <div key={i}>
                                    <ExamAnswer text={i} />
                                </div>))}
                        </div>
                    </div>
                    <div className="next-btn-container">
                        <button onClick={replaceCard} className="btn"><i className="fas fa-forward"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ExamPage;
