import React, {forwardRef, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import Button from "../common/Button";
import './ExamSum.scss';
import { RadialChart } from 'react-vis';

const ExamSum = forwardRef(({ setStats, cardsNum, rightsNum, replayExam }, ref) => {
    const { t } = useTranslation();
    const [cards, setCards] = useState(0);
    const [rights, setRights] = useState(0);

    useEffect(() => {
        if (setStats) {
            setCards(cardsNum);
            setRights(rightsNum);
        }
    }, [setStats, cardsNum, rightsNum]);

    const score = Math.round(rights / cards * 100);
    return (
        <div className="exam-sum-container">
            <div className="sum-col">
                <div className="stats">
                    <p>{cards} cards played</p>
                    <br/>
                    <div className="exam-score">Score: {score}</div>
                    {false &&
                    <div className="exam-score-pie">
                        <RadialChart
                            width={170}
                            height={170}
                            data={[{angle: 3, radius: 50}, {angle: 8, radius: 14}]}
                        >
                        </RadialChart>
                    </div>
                    }
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
