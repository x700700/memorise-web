import React, {forwardRef, useEffect, useState} from 'react';
import './GameSum.scss';
import {useTranslation} from "react-i18next";
import logger from "../../common/logger";
import Button from "../_Tools/Button";
import { PieChart } from 'react-chartkick';
import 'chart.js'

const GameSum = forwardRef(({ setStats, cardsNum, playsNum, replayGame }, ref) => {
    const { t } = useTranslation();
    const [cards, setCards] = useState(0);
    const [plays, setPlays] = useState(0);

    useEffect(() => {
        logger.trace('GameSum mounted');
        if (setStats) {
            setCards(cardsNum);
            setPlays(playsNum);
        }
    }, [setStats, cardsNum, playsNum]);

    const rights = cards;
    const wrongs = plays - cards;
    return (
        <div className="game-sum-container">
            <div className="sum-col">
                <div className="stats">
                    <div>{cards} {t("cards played")}</div>
                    {/*<div className="stats-misses">{plays - cards} {t("misses")}</div>*/}
                </div>
                <div className="exam-score-pie">
                    <PieChart width="250px" height="250px" colors={["#272", "#822"]} legend={false}
                              data={[["Rights", rights], ["Wrongs", wrongs]]} />
                </div>
                <div className="btns-container">
                    <div className="btns-replay">
                        <Button text={t('replay')} onClick={replayGame} />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default GameSum;
