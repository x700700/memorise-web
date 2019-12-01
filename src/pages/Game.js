import React, {useRef, useState} from 'react';
import './Game.scss';
import Card from "../components/Practice/Card";
// import Rotate90DegreesCcwTwoToneIcon from '@material-ui/icons/Rotate90DegreesCcwTwoTone';

const game = [
    {
        q: "Many",
        a: "הרבה",
    },
    {
        q: "Home",
        a: "בית",
    },
    {
        q: "Antilope",
        a: "אנטילופה",
    },
];

const Game = (props) => {
    const [cardNum, setCardNum] = useState(0);
    const [cardInMove, setCardInMove] = useState(false);

    const refGame = useRef();

    const rotateCard = () => {
        refGame.current.rotate();
    };

    const replaceCard = () => {
        const next = cardNum < game.length - 1 ? cardNum + 1 : 0;
        setCardNum(next);
    };
    const respGood = () => {
        console.warn('good');
        replaceCard();
    };
    const respBad = () => {
        console.warn('bad');
        replaceCard();
    };

    const currQ = game[cardNum].q;
    const currA = game[cardNum].a;
    return (
        <div className="game">
            <Card ref={refGame} q={currQ} a={currA} setCardInMove={setCardInMove}/>
            <div className={`game-buttons ${cardInMove ? 'buttons-disable' : ''}`}>
                <button onClick={respBad} className="btn btn-bad"><i className="fas fa-times"></i></button>
                <button onClick={rotateCard} className="btn"><i className="fas fa-sync-alt"></i></button>
                <button onClick={respGood} className="btn btn-good"><i className="fas fa-check"></i></button>
            </div>
        </div>
    );
};

export default Game;
