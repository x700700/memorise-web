import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import './MenuExam.scss';
import TopMenu from "../common/TopMenu";
import {useTranslation} from "react-i18next";
import * as types from "../../redux/actionsTypes";
import SubMenuReplay from "./SubMenuReplay";
import Switch from "../common/Switch";


const MenuExam = ({ hide }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const cardsDeck = useSelector(state => state.app.examCardsDeck);

    const replayExam = (size) => {
        cardsDeck.replay(size);
        dispatch({ type: types.APP_SET_EXAM_CARDSDECK, cardsDeck: cardsDeck });
        dispatch({ type: types.APP_SHOW_MENU, show: false });
        dispatch({ type: types.APP_SET_EXAM_ENDED, ended: false });
        dispatch({ type: types.APP_SET_EXAM_DEFAULT_DECK_SIZE, size: size });
    };
    const flipDeck = (flipped) => {
        cardsDeck.setIsDeckFlipped(flipped);
    };

    const size = (cardsDeck && cardsDeck.getSizeTraining()) || 0;
    const isDeckFlipped = (cardsDeck && cardsDeck.getIsDeckFlipped()) || false;
    return (
        <TopMenu hide={hide}>
            {cardsDeck &&
            <div className="menu-exam-col">
                <div className="title">Exam</div>
                <SubMenuReplay playType="exam" sliderTitle={t('questions num for exam')} replayCb={replayExam} size={size}/>
                <div className="flip-container">
                    <Switch label={t('flip-exam-side')} value="examFlipSwitch" onChange={flipDeck} startValue={isDeckFlipped}/>
                </div>
            </div>
            }
        </TopMenu>
    );
};
export default MenuExam;
