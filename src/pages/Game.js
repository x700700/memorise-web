import React from 'react';
import './Game.scss';
import Card from "../components/Practice/Card";
// import Rotate90DegreesCcwTwoToneIcon from '@material-ui/icons/Rotate90DegreesCcwTwoTone';

function Game() {
    return (
        <div className="game">
            <Card q="Many"/>
            <div className="rotate-icon">
                <button className="btn"><i className="fas fa-sync-alt"></i></button>
            </div>
        </div>
    );
}

export default Game;
