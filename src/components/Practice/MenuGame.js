import React, {useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";
import './MenuGame.scss';
import TopMenu from "../common/TopMenu";
import Slider from "../common/Slider";
import consts from "../../common/consts";
import Button from "../common/Button";
import {useTranslation} from "react-i18next";
import * as types from "../../redux/actionsTypes";

const MenuGame = ({ hide }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const refSlider = useRef();
    const cardsDeck = useSelector(state => state.app.gameCardsDeck);

    const replayGame = () => {
        const size = refSlider.current.value();
        cardsDeck.replay(size);
        dispatch({ type: types.APP_SET_GAME_CARDSDECK, cardsDeck: cardsDeck });
        dispatch({ type: types.APP_SHOW_MENU, show: false });
        dispatch({ type: types.APP_SET_GAME_ENDED, ended: false });
        dispatch({ type: types.APP_SET_GAME_DEFAULT_DECK_SIZE, size: size });
    };

    const size = (cardsDeck && cardsDeck.getSizeTraining()) || 0;
    return (
        <TopMenu hide={hide}>
            <div className="menu-game-col">
                <div className="title">Practice</div>
                <div className="size-slider-container">
                    <Slider ref={refSlider} min={consts.play.minCards} max={size} />
                </div>
                <div className="footline size-slider-foot">Number Of Cards to Practice</div>
                <div className="replay-btn">
                    <Button text={t('replay')} onClick={() => replayGame} />
                </div>
            </div>
        </TopMenu>
    );
};
export default MenuGame;
