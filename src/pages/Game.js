import React, { useRef } from 'react';
import './Game.scss';
import Card from "../components/Practice/Card";
// import Rotate90DegreesCcwTwoToneIcon from '@material-ui/icons/Rotate90DegreesCcwTwoTone';

const Game = (props) => {
    const refGame = useRef();

    const rotateCard = () => {
        console.warn('rotate card');
        refGame.current.rotate();
    };

    return (
        <div className="game">
            <Card ref={refGame} q="Many" a="הרבה"/>
            <div className="rotate-icon">
                <button onClick={rotateCard} className="btn"><i className="fas fa-sync-alt"></i></button>
            </div>
        </div>
    );
};

export default Game;
