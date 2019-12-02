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

    const size = cards && cards.sizeStart();
    return (
        <div className="top-menu-container">
            <TopMenu>
                <div className="menu-col">
                    <div className="title">Practice</div>
                    <div className="headline">Choose Number Of Cards to Practice:</div>
                </div>
            </TopMenu>
        </div>
    );
};
export default MenuGame;
