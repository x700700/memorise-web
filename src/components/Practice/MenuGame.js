import React, {useRef} from 'react';
import {useSelector} from "react-redux";
import cardsDeck from "./cardsDeck";
import './MenuGame.scss';
import TopMenu from "../common/TopMenu";
import Slider from "../common/Slider";
import consts from "../../common/consts";
import Button from "../common/Button";
import {useTranslation} from "react-i18next";

const MenuGame = (props) => {
    const { t } = useTranslation();
    const refSlider = useRef();
    const storeCardsDeck = useSelector(state => state.app.gameCardsDeck);

    let cards;
    if (storeCardsDeck) {
        cards = new cardsDeck();
        cards.setStorage(storeCardsDeck);
    }

    const replayGame = () => {
        const size = refSlider.current.value();
        console.warn('Replay with # of cards = ', size);
    };

    const size = (cards && cards.sizeStart()) || 0;
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
