import React, {useEffect, useRef, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import * as types from '../redux/actionsTypes';
import './Game.scss';
import consts from "../common/consts";
import Card from "../components/Practice/Card";
import CardsDeck from '../components/Practice/cardsDeck';
import mockTraining from '../mock/training-multiply';
import GameSum from "../components/Practice/GameSum";
import PopUpBox from "../components/common/PopUpBox";
// import Rotate90DegreesCcwTwoToneIcon from '@material-ui/icons/Rotate90DegreesCcwTwoTone';

const Game = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [, setTopCard] = useState(null);
    const [cardInMove, setCardInMove] = useState(false);
    const showMenu = useSelector(state => state.app.showMenu);
    const cardsDeck = useSelector(state => state.app.gameCardsDeck);
    const gameEnded = useSelector(state => state.app.isGameEnded);

    const refGame = useRef();

    const rotateCard = () => {
        refGame.current.rotate();
    };

    const replaceCard = (good) => {
        const ended = cardsDeck.nextCard(good);
        ended && dispatch({ type: types.APP_SET_GAME_ENDED, ended: true });
        const top = cardsDeck.top();
        setTopCard(top);
    };
    const respGood = () => {
        replaceCard(true);
    };
    const respBad = () => {
        replaceCard(false);
    };
    const replayGame = () => {
        dispatch({ type: types.APP_SET_GAME_ENDED, ended: false });
        cardsDeck.replay(consts.play.defaultCardsNum);
        dispatch({ type: types.APP_SET_GAME_CARDSDECK, cardsDeck: cardsDeck });
    };

    useEffect(() => {
        // console.warn('Game mount');
        dispatch({ type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.practice });
        dispatch({ type: types.APP_SHOW_MENU, show: false });

        const createNewDeck = () => {
            return new CardsDeck(mockTraining);
        };

        let lastCardsDeck = localStorage.getItem(consts.localStorage.gameId);
        let newDeck;
        if (!lastCardsDeck) {
            // no storage
            newDeck = createNewDeck();
        } else {
            // storage is loaded
            newDeck = new CardsDeck();
            try {
                newDeck.setStorage(lastCardsDeck);
                if (!newDeck.top()) {
                    dispatch({ type: types.APP_SET_GAME_ENDED, ended: true });
                }
            } catch (e) {
                // storage were bad
                localStorage.removeItem(consts.localStorage.gameId);
                newDeck = createNewDeck();
            }
        }
        dispatch({ type: types.APP_SET_GAME_CARDSDECK, cardsDeck: newDeck });
    }, [dispatch, history]);

    // const id = props.match.params.id;

    const top = cardsDeck && cardsDeck.top();
    const size = cardsDeck && cardsDeck.getSizeDeck();
    const playsNum = cardsDeck && cardsDeck.playsNum();
    const curr = cardsDeck && cardsDeck.sizeCurr();
    const currQ = (top || {}).q || '';
    const currA = (top || {}).a || '';
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
