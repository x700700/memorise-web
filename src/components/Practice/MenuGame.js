import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import './MenuGame.scss';
import TopMenu from "../common/TopMenu";
import {useTranslation} from "react-i18next";
import * as types from "../../redux/actionsTypes";
import SubMenuReplay from "./SubMenuReplay";
import Switch from "../common/Switch";

const MenuDevider = () => {
    return (
        <div className="menu-devider">
            <div className="devider-line"/>
        </div>
    );
};

const MenuGame = ({ hide }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const cardsDeck = useSelector(state => state.app.gameCardsDeck);

    const replayGame = (size) => {
        cardsDeck.replay(size);
        dispatch({ type: types.APP_SET_GAME_CARDSDECK, cardsDeck: cardsDeck });
        dispatch({ type: types.APP_SHOW_MENU, show: false });
        dispatch({ type: types.APP_SET_GAME_ENDED, ended: false });
        dispatch({ type: types.APP_SET_GAME_DEFAULT_DECK_SIZE, size: size });
    };
    const flipDeck = (flipped) => {
        cardsDeck.setIsDeckFlipped(flipped);
    };

    const size = (cardsDeck && cardsDeck.getSizeTraining()) || 0;
    const isDeckFlipped = (cardsDeck && cardsDeck.getIsDeckFlipped()) || false;
    return (
        <TopMenu hide={hide}>
            {cardsDeck &&
            <div className="menu-game-col">
                <div className="title">Practice</div>
                <div className="flip-container">
                    <Switch label={t('flip-deck-side')} value="flipSwitch" onChange={flipDeck}
                            startValue={isDeckFlipped}/>
                </div>
                <MenuDevider/>
                <SubMenuReplay playType={t('practice')} replayCb={replayGame} size={size}/>
            </div>
            }
        </TopMenu>
    );
};
export default MenuGame;
