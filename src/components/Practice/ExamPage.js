import React from 'react';
import './ExamPage.scss';
import {useTranslation} from "react-i18next";
import ExamAnswer from "../../components/Practice/ExamAnswer";
import {isRtl} from "../../common/utils";


const ExamPage = ({ trainingName, size, num, q, answers, nextQuestion, isPrevPage, setAnswer, isAnswered, showPrev }) => {
    const { t } = useTranslation();
    const styleQ = {
        direction: isRtl(q) ? 'rtl' : 'ltr',
    };

    return (
        <div className="exam-page-container">
            <div className={`exam-page ${isPrevPage && showPrev ? 'prev-page-flow' : ''}`}>
                {q &&
                <div className="cards-left">
                    <span><i className="fas fa-arrow-up"/></span>
                    <span>{num} / {size}</span>
                </div>
                }
                <div className="training-name">
                    {t('exam in')} {trainingName}
                </div>
                <div className="exam-col">
                    <div className="question">
                        <div style={styleQ}>{q}</div>
                    </div>
                    <div className="answers-container">
                        <div className="answers-col">
                            {answers && Array.isArray(answers) && answers.length > 0 && answers.map((a, i) => {
                                return (
                                    <div key={`answer-${i+1}`} className="each-answer-container">
                                        <ExamAnswer id={a.id} text={a.examA}
                                                    rightAnswer={a.rightAnswer} right={a.answeredRight} wrong={a.answeredWrong}
                                                    answered={isAnswered || isPrevPage}
                                                    setAnswer={setAnswer}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={`next-btn-container ${isPrevPage || !isAnswered ? 'next-btn-disable' : ''}`}>
                        <button onClick={() => nextQuestion()} className="btn"><i className="fas fa-forward"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ExamPage;
