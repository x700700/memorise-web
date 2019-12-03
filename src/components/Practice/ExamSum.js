import React, {forwardRef, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import Button from "../common/Button";
import './ExamSum.scss';

const ExamSum = forwardRef(({ setStats, cardsNum, playsNum, replayExam }, ref) => {
    const { t } = useTranslation();
    const [cards, setCards] = useState(0);
    const [plays, setPlays] = useState(0);

    useEffect(() => {
        if (setStats) {
            setCards(cardsNum);
            setPlays(playsNum);
        }
    }, [setStats, cardsNum, playsNum]);

    return (
        <div className="exam-sum-container">
            <div className="sum-col">
                <div className="stats">
                    <p>{cards} cards played</p>
                    <p>{plays - cards} misses</p>
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
