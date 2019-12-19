import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import {useTranslation} from "react-i18next";
import * as types from '../redux/actionsTypes';
import './Game.scss';
import consts from "../common/consts";
import Card from "../components/Practice/Card";
import CardsDeck from '../components/Practice/cardsDeck';
import { loadPlay } from "../common/playUtils";
import mock from '../mock/training-multiply';
import GameSum from "../components/Practice/GameSum";
import PopUpBox from "../components/_Tools/PopUpBox";
import { getGameTraining } from "../redux/actions";


const Game = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [, setTopCard] = useState(null); // !! This is necessary for making the dom render on next card !!
    const [cardInMove, setCardInMove] = useState(false);
    const showMenu = useSelector(state => state.app.showMenu);
    const cardsDeck = useSelector(state => state.app.gameCardsDeck);
    const gameEnded = useSelector(state => state.app.isGameEnded);
    const defaultDeckSize = useSelector(state => state.app.gameDefaultDeckSize);

    const gameTrainingId = useSelector(state => state.app.gameTrainingId);
    const friendName = useSelector(state => state.app.friendName);
    const gameTrainingIsFetching = useSelector(state => state.app.gameTrainingIsFetching);
    const gameTrainingIsLoaded = useSelector(state => state.app.gameTrainingIsLoaded);
    const gameTraining = useSelector(state => state.app.gameTraining);

    const [isFlipped, setIsFlipped] = useState(false);

    const refCard = useRef();

    const rotateCard = () => {
        setIsFlipped(true);
        refCard.current.rotate();
    };

    const replaceCard = (good) => {
        setIsFlipped(false);
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


    const loadGame = ( training ) => {
        const createNewDeck = (shouldFlipped) => {
            return new CardsDeck(consts.localStorage.gameId, training, shouldFlipped);
        };
        const shouldDeckFlipped = (cardsDeck && cardsDeck.getIsDeckFlipped()) || false;
        return loadPlay(consts.localStorage.gameId, createNewDeck,
            () => dispatch({type: types.APP_SET_GAME_ENDED, ended: true}),
            (newDeck) => dispatch({type: types.APP_SET_GAME_CARDSDECK, cardsDeck: newDeck}),
            shouldDeckFlipped);
    };
    useEffect(() => {
        if (gameTraining) {
            const newDeck = loadGame(gameTraining);
            if (newDeck.getSize() < 3) {
                localStorage.removeItem(consts.localStorage.gameId);
                dispatch({ type: types.APP_RESET_GAME_TRAINING });
                dispatch({ type: types.APP_SET_ERROR, error: t('err-game-too-small') });
                history.push(`/trainings/${gameTrainingId || '-'}/edit`);
            }
        }
    }, [gameTraining]);

    useEffect(() => {
        // console.warn('Game mount');
        dispatch({ type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.practice });
        dispatch({type: types.APP_SHOW_MENU, show: false});

        if (gameTrainingId) {
            localStorage.removeItem(consts.localStorage.gameId);
            dispatch({ type: types.APP_SET_GAME_CARDSDECK, cardsDeck: null });
            dispatch({ type: types.APP_SET_GAME_ENDED, ended: false });
            dispatch(getGameTraining(gameTrainingId, friendName));
        } else if (!cardsDeck) {
            loadGame(Object.values(mock)[0]);
        }

    }, [dispatch, history]);

    const size = cardsDeck && cardsDeck.getSizeDeck();
    const playsNum = cardsDeck && cardsDeck.playsNum();
    const curr = cardsDeck && cardsDeck.sizeCurr();
    const currQ = cardsDeck && cardsDeck.topQ();
    const currA = cardsDeck && cardsDeck.topA();
    return (
        <div className="game-desktop-container">
            <div className="game-container">
                {!gameTrainingIsFetching && (currQ || gameEnded) ?
                    <div className="game">
                        {currQ &&
                        <div className="cards-left">
                            <span><i className="fas fa-arrow-down"/></span>
                            <span>{curr} / {size}</span>
                        </div>
                        }
                        <Card ref={refCard} q={currQ} a={currA} setCardInMove={setCardInMove} rotateCb={rotateCard}/>
                        <div className={`game-buttons ${cardInMove || gameEnded || showMenu ? 'buttons-disable' : ''}`}>
                            <button onClick={respBad} className={`btn btn-bad ${!isFlipped ? 'disable-result-button' : ''}`}>
                                <i className="fas fa-times"></i>
                            </button>
                            <button onClick={rotateCard} className="btn"><i className="fas fa-sync-alt"></i></button>
                            <button onClick={respGood} className={`btn btn-good ${!isFlipped ? 'disable-result-button' : ''}`}>
                                <i className="fas fa-check"></i>
                            </button>
                        </div>
                    </div> : gameTrainingId && !gameTrainingIsFetching && !gameTrainingIsLoaded &&
                    <div>
                        Network Error -
                        Either refresh for Default Game, or go back to Training tab.
                    </div>
                }
                <PopUpBox show={gameEnded}>
                    <GameSum setStats={gameEnded} cardsNum={size} playsNum={playsNum} replayGame={() => replayGame}/>
                </PopUpBox>
            </div>
        </div>
    );
};
export default Game;
