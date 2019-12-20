import React from 'react';
import './MenuGame.scss';
import { useDispatch, useSelector } from "react-redux";
import TopMenu from "../_Tools/TopMenu";
import {useTranslation} from "react-i18next";
import * as types from "../../redux/actionsTypes";
import SubMenuReplay from "./SubMenuReplay";
import SwitchYellow from "../_Tools/SwitchYellow";
import {isRtl} from "../../common/utils";

const MenuDivider = () => {
    return (
        <div className="menu-divider">
            <div className="divider-line"/>
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

    const styleTitle = {
        direction: cardsDeck && isRtl(cardsDeck.name) ? 'rtl' : 'ltr',
    };

    const size = (cardsDeck && cardsDeck.getSizeTraining()) || 0;
    const isDeckFlipped = (cardsDeck && cardsDeck.getIsDeckFlipped()) || false;
    return (
        <TopMenu hide={hide}>
            {cardsDeck &&
            <div className="menu-game-col">
                <div className="title" style={styleTitle}>{cardsDeck && cardsDeck.name}</div>
                <div className="flip-container">
                    <SwitchYellow label={t('flip-deck-side')} value="gameFlipSwitch" onChange={flipDeck} startValue={isDeckFlipped}/>
                </div>
                <MenuDivider/>
                <SubMenuReplay playType="practice" sliderTitle={t("cards num to practice")} replayCb={replayGame} size={size} replayMsg={t('replay')}/>
            </div>
            }
        </TopMenu>
    );
};
export default MenuGame;
