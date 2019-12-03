import React from 'react';
import TopMenu from "../common/TopMenu";
// import { useSelector } from "react-redux";
// import cardsDeck from "./cardsDeck";

const MenuExam = ({ hide }) => {
    return (
        <TopMenu hide={hide}>
            <div className="menu-exam-col">
                <h1>Exam Menu</h1>
            </div>
        </TopMenu>
    );
};
export default MenuExam;
