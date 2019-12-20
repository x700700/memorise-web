import React from 'react';
import './MenuExam.scss';
import { useDispatch, useSelector } from "react-redux";
import TopMenu from "../_Tools/TopMenu";
import {useTranslation} from "react-i18next";
import * as types from "../../redux/actionsTypes";
import SubMenuReplay from "./SubMenuReplay";
import SwitchGreen from "../_Tools/SwitchGreen";
import {isRtl} from "../../common/utils";


const MenuExam = ({ hide }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const name = useSelector(state => state.exam.name);
    const size = useSelector(state => state.exam.fullDeckSize);
    const isDeckFlipped = useSelector(state => state.exam.isDeckFlipped);
    const playSize = useSelector(state => state.exam.playSize);

    const replayExam = (size) => {
        dispatch({ type: types.APP_SHOW_MENU, show: false });
        dispatch({ type: types.EXAM_SET_ENDED, ended: false });
        dispatch({ type: types.EXAM_SET_PLAY_SIZE, size: size });
        dispatch({ type: types.EXAM_REPLAY });
    };
    const flipDeck = (flipped) => {
        dispatch({ type: types.EXAM_FLIP, flip: flipped });
    };

    const styleTitle = {
        direction: name && isRtl(name) ? 'rtl' : 'ltr',
    };

    return (
        <TopMenu hide={hide}>
            {name &&
            <div className="menu-exam-col">
                <div className="title" style={styleTitle}>{name}</div>
                <div className="flip-container">
                    <SwitchGreen label={t('flip-exam-side')} value="examFlipSwitch" onChange={flipDeck} startValue={isDeckFlipped}/>
                </div>
                <SubMenuReplay playType="exam" sliderTitle={t('questions num for exam')} replayMsg={t('reexam')}
                               replayCb={replayExam} size={size} playSize={playSize} />
            </div>
            }
        </TopMenu>
    );
};
export default MenuExam;
