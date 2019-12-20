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
    const name = useSelector(state => state.game.name);
    const size = useSelector(state => state.game.fullDeckSize);
    const isDeckFlipped = useSelector(state => state.game.isDeckFlipped);
    const playSize = useSelector(state => state.game.playSize);

    const replayGame = (size) => {
        dispatch({ type: types.APP_SHOW_MENU, show: false });
        dispatch({ type: types.GAME_SET_ENDED, ended: false });
        dispatch({ type: types.GAME_SET_PLAY_SIZE, size: size });
        dispatch({ type: types.GAME_REPLAY });
    };
    const flipDeck = (flipped) => {
        dispatch({ type: types.GAME_FLIP, flip: flipped });
    };

    const styleTitle = {
        direction: name && isRtl(name) ? 'rtl' : 'ltr',
    };

    return (
        <TopMenu hide={hide}>
            {name &&
            <div className="menu-game-col">
                <div className="title" style={styleTitle}>{name}</div>
                <div className="flip-container">
                    <SwitchYellow label={t('flip-deck-side')} value="gameFlipSwitch" onChange={flipDeck} startValue={isDeckFlipped}/>
                </div>
                <MenuDivider/>
                <SubMenuReplay playType="practice" sliderTitle={t("cards num to practice")} replayMsg={t('replay')}
                               replayCb={replayGame} size={size} playSize={playSize}/>
            </div>
            }
        </TopMenu>
    );
};
export default MenuGame;
