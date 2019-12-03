import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import './MenuGame.scss';
import TopMenu from "../common/TopMenu";
import {useTranslation} from "react-i18next";
import * as types from "../../redux/actionsTypes";
import SubMenuReplay from "./SubMenuReplay";

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

    const size = (cardsDeck && cardsDeck.getSizeTraining()) || 0;
    return (
        <TopMenu hide={hide}>
            <div className="menu-game-col">
                <div className="title">Practice</div>
                <SubMenuReplay playType={t('practice')} replayCb={replayGame} size={size} />
            </div>
        </TopMenu>
    );
};
export default MenuGame;
