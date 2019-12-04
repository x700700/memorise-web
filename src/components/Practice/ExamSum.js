import React, {forwardRef, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import Button from "../common/Button";
import './ExamSum.scss';

const ExamSum = forwardRef(({ setStats, cardsNum, rightsNum, replayExam }, ref) => {
    const { t } = useTranslation();
    const [cards, setCards] = useState(0);
    const [rights, setRights] = useState(0);
    const score = Math.round(rightsNum / cardsNum * 100);

    useEffect(() => {
        if (setStats) {
            setCards(cardsNum);
            setRights(rightsNum);
        }
    }, [setStats, cardsNum, rightsNum]);

    return (
        <div className="exam-sum-container">
            <div className="sum-col">
                <div className="stats">
                    <p>{cards} cards played</p>
                    <br/>
                    <div className="exam-score">Score: {score}</div>
                </div>
                <div className="btns-container">
                    <div className="btns-replay">
                        <Button text={t('replay')} onClick={replayExam} />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ExamSum;
