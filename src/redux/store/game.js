import * as types from '../actionsTypes';
import logger from "../../common/logger";
import consts from "../../common/consts";
import CardsDeck from "../../components/Practice/cardsDeck";
import mock from '../../mock/training-multiply';

const init = () => ({
    name: null,
    cardsDeck: null,
    isDeckLoaded: false,
    trainingSize: 0,
    fullDeckSize: 0,
    playDeckSize: 0,
    deckCurrentSize: 0,
    cardQ: null,
    cardA: null,
    isEnded: false,
    plays: 0,
    isDeckFlipped: false,
    playSize: consts.play.defaultCardsNum,
    playNumber: 1,

    trainingIdToFetch: null,
    friendName: null,
    trainingIsFetching: false,
    trainingIsLoaded: false,
});
const cardsDeckProps = (cardsDeck, replay = false) => {
    let basic = {};
    if (!replay) {
        basic = {
            cardsDeck: cardsDeck,
            isDeckLoaded: true,
            name: cardsDeck.getName(),
            plays: cardsDeck.getPlays(),
            playSize: cardsDeck.getGameDeckSize(),
        };
    }
    return {
        ...basic,
        trainingSize: cardsDeck.getTrainingSize(),
        fullDeckSize: cardsDeck.getFullDeckSize(),
        playDeckSize: cardsDeck.getGameDeckSize(),
        deckCurrentSize: cardsDeck.getDeckCurrentSize(),
        cardQ: cardsDeck.topQ(),
        cardA: cardsDeck.topA(),
        isEnded: !cardsDeck.top(),
    };
};

const gameReducer = (  state = init(),
                      action) => {

    const storageId = consts.localStorage.gameId;
    let cardsDeck;

    switch (action.type) {

        case types.GAME_RESET:
            return {
                ...state,
                ...init(),
            };

        case types.GAME_NEXT_CARD:
            state.cardsDeck.nextCard(action.right);
            return {
                ...state,
                deckCurrentSize: state.cardsDeck.getDeckCurrentSize(),
                cardQ: state.cardsDeck.topQ(),
                cardA: state.cardsDeck.topA(),
                isEnded: !state.cardsDeck.top(),
                plays: state.cardsDeck.getPlays(),
            };

        case types.GAME_FLIP:
            state.cardsDeck.setIsDeckFlipped(action.flip);
            state.cardsDeck.setIsNextDeckFlipped(action.flip);
            return {
                ...state,
                isDeckFlipped: action.flip,
                cardQ: state.cardsDeck.topQ(),
                cardA: state.cardsDeck.topA(),
            };

        case types.GAME_SET_PLAY_SIZE:
            return {
                ...state,
                playSize: action.size,
            };

        case types.GAME_LOAD:
            cardsDeck = state.cardsDeck;
            try {
                if (action.training) {
                    logger.trace('load game - from action');
                    cardsDeck = new CardsDeck(storageId, action.training, state.isDeckFlipped);
                }
                else if (!cardsDeck) {
                    logger.trace('load game - no store, loading from storage');
                    const savedCardsDeck = localStorage.getItem(storageId);
                    cardsDeck = new CardsDeck(storageId, null, state.isDeckFlipped);
                    cardsDeck.setStorage(savedCardsDeck);
                }
            } catch (e) {
                logger.trace('game load - localStorage was bitter');
                localStorage.removeItem(storageId);
                cardsDeck = new CardsDeck(storageId, Object.values(mock)[0], state.isDeckFlipped);
            }
            if (cardsDeck.getFullDeckSize() === 0) {
                logger.trace('game load - new deck is empty, loading mock');
                localStorage.removeItem(storageId);
                cardsDeck = new CardsDeck(storageId, Object.values(mock)[0], state.isDeckFlipped);
            }
            // if (cardsDeck) localStorage.setItem(storageId, cardsDeck.getStorage());
            return {
                ...state,
                ...cardsDeckProps(cardsDeck),
                trainingIdToFetch: null,
                friendName: null,
                trainingIsFetching: false,
                trainingIsLoaded: false,
            };

        case types.GAME_REPLAY:
            state.cardsDeck.replay(state.playSize);
            return {
                ...state,
                ...cardsDeckProps(state.cardsDeck, true),
                plays: 0,
                playNumber: state.playNumber + 1,
            };



        case types.APP_SET_GAME_TRAINING_ID:
            return {
                ...state,
                trainingIdToFetch: action.id,
                friendName: action.friendName,
            };
        case types.APP_SET_GAME_ENDED:
            return {
                ...state,
                isEnded: action.ended,
            };

        case types.FETCH_GAME_TRAINING_START:
            localStorage.removeItem(storageId);
            return {
                ...state,
                ...init(),
                trainingIsFetching: true,
                trainingIsLoaded: false,
                trainingIdToFetch: action.id,
            };
        case types.FETCH_GAME_TRAINING_SUCCEED:
            cardsDeck = new CardsDeck(storageId, action.training, state.isDeckFlipped);
            return {
                ...state,
                trainingIsFetching: false,
                trainingIsLoaded: true,
                trainingIdToFetch: null,
                ...cardsDeckProps(cardsDeck),
            };
        case types.FETCH_GAME_TRAINING_FAILED:
            return {
                ...state,
                ...init(),
                trainingIsFetching: false,
                trainingIsLoaded: false,
            };

        default:
            return state;
    }
};
export default gameReducer;
