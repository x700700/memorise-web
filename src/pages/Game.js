import React, { useRef } from 'react';
import './Game.scss';
import Card from "../components/Practice/Card";
// import Rotate90DegreesCcwTwoToneIcon from '@material-ui/icons/Rotate90DegreesCcwTwoTone';

const Game = (props) => {
    const refGame = useRef();

    const rotateCard = () => {
        refGame.current.rotate();
    };
    const respGood = () => {
        console.warn('good');
    };
    const respBad = () => {
        console.warn('bad');
    };

    return (
        <div className="game">
            <Card ref={refGame} q="Many" a="הרבה"/>
            <div className="game-buttons">
                <button onClick={respBad} className="btn btn-bad"><i className="fas fa-times"></i></button>
                <button onClick={rotateCard} className="btn"><i className="fas fa-sync-alt"></i></button>
                <button onClick={respGood} className="btn btn-good"><i className="fas fa-check"></i></button>
            </div>
        </div>
    );
};

export default Game;
