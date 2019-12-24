import React, {forwardRef, useEffect, useState} from 'react';
import './ExamSum.scss';
import './Sum.scss';
import {useTranslation} from "react-i18next";
import Button from "../_Tools/Button";
import logger from "../../common/logger";


const ExamSum = forwardRef(({ trainingName, setStats, cardsNum, rightsNum, replayExam }, ref) => {
    const { t } = useTranslation();
    const [cards, setCards] = useState(0);
    const [rights, setRights] = useState(0);

    useEffect(() => {
        logger.trace('Exam Sum set stats');
        if (setStats) {
            setCards(cardsNum);
            setRights(rightsNum);
        }
    }, [setStats, cardsNum, rightsNum]);

    const score = cards > 0 ? Math.round(rights / cards * 100) : 100;
    return (
        <div className="exam-sum-container">
            <div className="sum-col">
                <div className="training-name">
                    {trainingName}
                </div>

                <div className="stats">
                    <p>{rights} {t('of')} {cards} {t("questions answered right")}</p>
                    <br/>
                    <div className="exam-score">
                        <div>{t("Score")}</div>
                        <div className="score-val-container">
                            <div className="score-val">{`${score}`}</div>
                            <div className="score-val-circle"/>
                        </div>
                    </div>
                </div>
                <div className="play-sum-btns-container">
                    <div className="btns-replay">
                        <Button text={t('reexam')} onClick={replayExam} />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ExamSum;
