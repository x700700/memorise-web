import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import * as types from '../redux/actionsTypes';
import './Game.scss';
import consts from "../common/consts";
import Card from "../components/Practice/Card";
import CardsDeck from '../components/Practice/cardsDeck';
import { loadPlay } from "../common/playUtils";
import mockTraining from '../mock/training-multiply';
import GameSum from "../components/Practice/GameSum";
import PopUpBox from "../components/common/PopUpBox";
// import Rotate90DegreesCcwTwoToneIcon from '@material-ui/icons/Rotate90DegreesCcwTwoTone';

const Game = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [, setTopCard] = useState(null); // !! This is necessary for making the dom render on next card !!
    const [cardInMove, setCardInMove] = useState(false);
    const showMenu = useSelector(state => state.app.showMenu);
    const cardsDeck = useSelector(state => state.app.gameCardsDeck);
    const gameEnded = useSelector(state => state.app.isGameEnded);
    const defaultDeckSize = useSelector(state => state.app.gameDefaultDeckSize);
    const refGame = useRef();

    const rotateCard = () => {
        refGame.current.rotate();
    };

    const replaceCard = (good) => {
        const ended = cardsDeck.nextCard(good);
        ended && dispatch({ type: types.APP_SET_GAME_ENDED, ended: true });
        setTopCard(cardsDeck.top()); // !! This is necessary for making the dom render on next card !!
    };
    const respGood = () => {
        replaceCard(true);
    };
    const respBad = () => {
        replaceCard(false);
    };
    const replayGame = () => {
        dispatch({ type: types.APP_SET_GAME_ENDED, ended: false });
        cardsDeck.replay(defaultDeckSize);
        dispatch({ type: types.APP_SET_GAME_CARDSDECK, cardsDeck: cardsDeck });
    };

    useEffect(() => {
        // console.warn('Game mount');
        dispatch({ type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.practice });
        dispatch({type: types.APP_SHOW_MENU, show: false});

        const createNewDeck = (shouldFlipped) => {
            return new CardsDeck(mockTraining, shouldFlipped);
        };

        const shouldDeckFlipped = (cardsDeck && cardsDeck.getIsDeckFlipped()) || false;
        loadPlay(consts.localStorage.gameId, createNewDeck,
                    () => dispatch({ type: types.APP_SET_GAME_ENDED, ended: true }),
                    (newDeck) => dispatch({ type: types.APP_SET_GAME_CARDSDECK, cardsDeck: newDeck }),
                     shouldDeckFlipped);

    }, [dispatch, history]);

    // const id = props.match.params.id;

    const size = cardsDeck && cardsDeck.getSizeDeck();
    const playsNum = cardsDeck && cardsDeck.playsNum();
    const curr = cardsDeck && cardsDeck.sizeCurr();
    const currQ = cardsDeck && cardsDeck.topQ();
    const currA = cardsDeck && cardsDeck.topA();
    return (
        <div className="game-desktop-container">
            <div className="game-container">
                {(currQ || gameEnded) &&
                <div className="game">
                    {currQ &&
                    <div className="cards-left">
                        {curr} / {size}
                    </div>
                    }
                    <Card ref={refGame} q={currQ} a={currA} setCardInMove={setCardInMove}/>
                    <div className={`game-buttons ${cardInMove || gameEnded || showMenu ? 'buttons-disable' : ''}`}>
                        <button onClick={respBad} className="btn btn-bad"><i className="fas fa-times"></i></button>
                        <button onClick={rotateCard} className="btn"><i className="fas fa-sync-alt"></i></button>
                        <button onClick={respGood} className="btn btn-good"><i className="fas fa-check"></i></button>
                    </div>
                </div>}
                <PopUpBox show={gameEnded}>
                    <GameSum setStats={gameEnded} cardsNum={size} playsNum={playsNum} replayGame={() => replayGame}/>
                </PopUpBox>
            </div>
        </div>
    );
};
export default Game;
