import React, {useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";
import './MenuGame.scss';
import TopMenu from "../common/TopMenu";
import Slider from "../common/Slider";
import consts from "../../common/consts";
import Button from "../common/Button";
import {useTranslation} from "react-i18next";
import * as types from "../../redux/actionsTypes";

const MenuGame = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const refSlider = useRef();
    const cardsDeck = useSelector(state => state.app.gameCardsDeck);

    const replayGame = () => {
        const size = refSlider.current.value();
        console.warn('Replay with # of cards = ', size);
        cardsDeck.replay();
        dispatch({ type: types.APP_SET_GAME_CARDSDECK, cardsDeck: cardsDeck });
        dispatch({ type: types.APP_SHOW_MENU, show: false });
    };

    const size = (cardsDeck && cardsDeck.sizeStart()) || 0;
    return (
        <div className="top-menu-container">
            <TopMenu>
                <div className="menu-col">
                    <div className="title">Practice</div>
                    <div className="size-slider-container">
                        <Slider ref={refSlider} min={consts.play.minCards} max={size} />
                    </div>
                    <div className="footline size-slider-foot">Choose Number Of Cards to Practice</div>
                    <div className="replay-btn">
                        <Button text={t('replay')} onClick={() => replayGame} />
                    </div>
                </div>
            </TopMenu>
        </div>
    );
};
export default MenuGame;
