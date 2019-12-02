import React from 'react';
import {useSelector} from "react-redux";
import cardsDeck from "./cardsDeck";
import './MenuGame.scss';
import TopMenu from "../common/TopMenu";

const MenuGame = (props) => {
    const storage = useSelector(state => state.app.gameCardsDeck);
    let cards;
    if (storage) {
        cards = new cardsDeck();
        cards.setStorage(storage);
    }

    const q = ((cards && cards.top()) || {}).q || '';
    return (
        <div className="top-menu-container">
            <TopMenu>
                <div className="menu-col">
                    <h1>Game Menu - [{q}]</h1>
                </div>
            </TopMenu>
        </div>
    );
};
export default MenuGame;
