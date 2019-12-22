import React from 'react';
import './MenuTrainings.scss';
import { useSelector } from "react-redux";
import TopMenu from "../_Tools/TopMenu";


const MenuTrainings = ({ hide }) => {
    const userName = useSelector(state => state.app.userName);

    return (
        <TopMenu hide={hide}>
            {userName &&
            <div className="menu-trainings-col">
                <div className="title">{userName}</div>
            </div>
            }
        </TopMenu>
    );
};
export default MenuTrainings;
