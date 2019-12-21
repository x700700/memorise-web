import React, { useEffect, useRef, useState } from 'react';
import './Game.scss';
import { useHistory } from "react-router-dom";
import {useTranslation} from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import logger from '../common/logger';
import * as types from '../redux/actionsTypes';
import consts from "../common/consts";
import Card from "../components/Practice/Card";
import GameSum from "../components/Practice/GameSum";
import PopUpBox from "../components/_Tools/PopUpBox";
import { getGameTraining } from "../redux/actions";


const Game = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    const [cardInMove, setCardInMove] = useState(false);
    const showMenu = useSelector(state => state.app.showMenu);

    const trainingIdToFetch = useSelector(state => state.game.trainingIdToFetch);
    const trainingId = useSelector(state => state.game.trainingId);
    const trainingFriendName = useSelector(state => state.game.friendName);
    const gameTrainingIsFetching = useSelector(state => state.game.trainingIsFetching);
    const gameTrainingIsLoaded = useSelector(state => state.game.trainingIsLoaded);
    const isDeckLoaded = useSelector(state => state.game.isDeckLoaded);

    const playDeckSize = useSelector(state => state.game.playDeckSize);
    const deckCurrentSize = useSelector(state => state.game.deckCurrentSize);
    const currQ = useSelector(state => state.game.cardQ);
    const currA = useSelector(state => state.game.cardA);
    const playsNum = useSelector(state => state.game.plays);
    const playNumber = useSelector(state => state.game.playNumber);
    const gameEnded = useSelector(state => state.game.isEnded);

    const [isFlipped, setIsFlipped] = useState(false);

    const refCard = useRef();

    const rotateCard = () => {
        setIsFlipped(true);
        refCard.current.rotate();
    };
    const replaceCard = (good) => {
        setIsFlipped(false);
        dispatch({ type: types.GAME_NEXT_CARD, right: good });
    };
    const respGood = () => {
        replaceCard(true);
    };
    const respBad = () => {
        replaceCard(false);
    };
    const replayGame = () => {
        dispatch({ type: types.GAME_SET_ENDED, ended: false });
        dispatch({ type: types.GAME_REPLAY });
    };


    useEffect(() => {
        logger.trace('Game loaded - validaing it -  ', gameTrainingIsLoaded, trainingId, playDeckSize);
        if (gameTrainingIsLoaded && trainingId && playDeckSize < 3) {
            localStorage.removeItem(consts.localStorage.gameId);
            dispatch({ type: types.GAME_SET_TRAINING_ID, id: null, friendName: null });
            dispatch({ type: types.APP_SET_ERROR, error: t('err-game-too-small') });
            dispatch({ type: types.GAME_LOAD });
            history.push(`/trainings/${trainingId || '-'}/edit`);
        }
    }, [gameTrainingIsLoaded, trainingId, playDeckSize, t, dispatch, history]);

    useEffect(() => {
        logger.trace('Game update - replayed #', playNumber);
        setIsFlipped(false);
    }, [playNumber]);

    useEffect(() => {
        logger.trace('Game mounted');
        dispatch({ type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.practice });
        dispatch({type: types.APP_SHOW_MENU, show: false});

        if (!gameTrainingIsFetching && trainingIdToFetch) {
            dispatch(getGameTraining(trainingIdToFetch, trainingFriendName));
        } else if (!gameTrainingIsFetching && !isDeckLoaded) {
            dispatch({ type: types.GAME_LOAD });
        }
    }, [trainingIdToFetch, gameTrainingIsFetching, trainingFriendName, isDeckLoaded, dispatch, history]);

    return (
        <div className="game-desktop-container">
            <div className={`game-container ${showMenu && 'disable-pointer'}`}>
                {!gameTrainingIsFetching && (currQ || gameEnded) ?
                    <div className="game">
                        {currQ &&
                        <div className="cards-left">
                            <span><i className="fas fa-arrow-down"/></span>
                            <span>{deckCurrentSize} / {playDeckSize}</span>
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
                    </div> : trainingIdToFetch && !gameTrainingIsFetching && !gameTrainingIsLoaded &&
                    <div>
                    </div>
                }
                <PopUpBox show={gameEnded}>
                    <GameSum setStats={gameEnded} cardsNum={playDeckSize} playsNum={playsNum} replayGame={() => replayGame}/>
                </PopUpBox>
            </div>
        </div>
    );
};
export default Game;
