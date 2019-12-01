import React, {useEffect, useRef, useState} from 'react';
import './Game.scss';
import Card from "../components/Practice/Card";
import CardsDeck from '../components/Practice/cardsDeck';
import mockTraining from '../mock/training-multiply';
import GameSum from "../components/Practice/GameSum";
// import Rotate90DegreesCcwTwoToneIcon from '@material-ui/icons/Rotate90DegreesCcwTwoTone';

const Game = (props) => {
    const [cardsDeck, setCardsDeck] = useState(null);
    const [gameEnded, setGameEnded] = useState(false);
    const [, setTopCard] = useState(null);
    const [cardInMove, setCardInMove] = useState(false);

    const refGame = useRef();

    const rotateCard = () => {
        refGame.current.rotate();
    };

    const replaceCard = (good) => {
        const ended = cardsDeck.nextCard(good);
        ended && setGameEnded(ended);
        const top = cardsDeck.top();
        setTopCard(top);
    };
    const respGood = () => {
        // console.warn('good');
        replaceCard(true);
    };
    const respBad = () => {
        // console.warn('bad');
        replaceCard(false);
    };
    const replayGame = () => {
        console.warn('replay');
        setGameEnded(false);
        cardsDeck.reset();
    };

    useEffect(() => {
        console.warn('loading cards deck on mount');
        const newDeck = new CardsDeck(mockTraining);
        setCardsDeck(newDeck);
    }, []);

    const top = cardsDeck && cardsDeck.top();
    const size = cardsDeck && cardsDeck.sizeStart();
    const playsNum = cardsDeck && cardsDeck.playsNum();
    const curr = cardsDeck && cardsDeck.sizeCurr();
    const currQ = (top || {}).q || '';
    const currA = (top || {}).a || '';
    return (
        <div className="game-container">
            {currQ &&
            <div className="game">
                <div className="cards-left">
                    {curr} / {size}
                </div>
                <Card ref={refGame} q={currQ} a={currA} setCardInMove={setCardInMove}/>
                <div className={`game-buttons ${cardInMove ? 'buttons-disable' : ''}`}>
                    <button onClick={respBad} className="btn btn-bad"><i className="fas fa-times"></i></button>
                    <button onClick={rotateCard} className="btn"><i className="fas fa-sync-alt"></i></button>
                    <button onClick={respGood} className="btn btn-good"><i className="fas fa-check"></i></button>
                </div>
            </div>}
            <div className={`sum-box ${gameEnded ? 'popup-sum' : ''}`}>
                <GameSum cardsNum={size} playsNum={playsNum} replayGame={() => replayGame}/>
            </div>
        </div>
    );
};

export default Game;
