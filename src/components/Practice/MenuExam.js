import React from 'react';
import TopMenu from "../common/TopMenu";
// import { useSelector } from "react-redux";
// import cardsDeck from "./cardsDeck";

const MenuExam = (props) => {
    /*
    const storage = useSelector(state => state.app.examCardsDeck);
    let cards;
    if (storage) {
        cards = new cardsDeck();
        cards.setStorage(storage);
    }
     */

    return (
        <div className="top-menu-container">
            <TopMenu>
                <div className="menu-col">
                    <h1>EXAM Menu</h1>
                </div>
            </TopMenu>
        </div>
    );
};
export default MenuExam;
