import * as types from '../actionsTypes';
import consts from "../../common/consts";
import CardsDeck from "../../components/Practice/cardsDeck";
import { loadCardsDeck } from '../../common/playUtils';

const init = (isDeckFlipped = false) => ({
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
    isDeckFlipped: isDeckFlipped,
    playSize: consts.play.defaultCardsNum,
    playNumber: 1,

    trainingIdToFetch: null,
    friendName: null,
    trainingIsFetching: false,
    trainingIsLoaded: false,
    trainingId: null,
    fullName: null,
});
const cardsDeckProps = (cardsDeck, replay = false) => {
    let basic = {};
    if (!replay) {
        basic = {
            cardsDeck: cardsDeck,
            isDeckLoaded: true,
            name: cardsDeck.getName(),
            fullName: cardsDeck.getFullname(),
            plays: cardsDeck.getPlays(),
            playSize: cardsDeck.getPlayDeckSize(),
        };
    }
    return {
        ...basic,
        trainingSize: cardsDeck.getTrainingSize(),
        fullDeckSize: cardsDeck.getFullDeckSize(),
        playDeckSize: cardsDeck.getPlayDeckSize(),
        deckCurrentSize: cardsDeck.getDeckCurrentSize(),
        isDeckFlipped: cardsDeck.getIsDeckFlipped() || false,
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
            cardsDeck = loadCardsDeck(storageId, state.cardsDeck, null, action.training, state.isDeckFlipped);
            return {
                ...state,
                ...cardsDeckProps(cardsDeck),
                trainingIdToFetch: null,
                friendName: null,
                trainingIsFetching: false,
                trainingIsLoaded: false,
            };

        case types.GAME_REPLAY:
            state.cardsDeck.reGame(state.playSize);
            return {
                ...state,
                ...cardsDeckProps(state.cardsDeck, true),
                plays: 0,
                playNumber: state.playNumber + 1,
            };



        case types.GAME_SET_TRAINING_ID:
            return {
                ...state,
                trainingIdToFetch: action.id,
                friendName: action.friendName,
                trainingIsLoaded: false,
            };
        case types.GAME_SET_ENDED:
            return {
                ...state,
                isEnded: action.ended,
            };

        case types.GAME_FETCH_TRAINING_START:
            localStorage.removeItem(storageId);
            return {
                ...state,
                ...init(state.isDeckFlipped),
                name: state.name,
                friendName: state.friendName,
                trainingIsFetching: true,
                trainingIsLoaded: false,
                trainingIdToFetch: action.id,
            };
        case types.GAME_FETCH_TRAINING_SUCCEED:
            cardsDeck = new CardsDeck(storageId, state.friendName, action.training, state.isDeckFlipped);
            return {
                ...state,
                trainingIsFetching: false,
                trainingIsLoaded: true,
                trainingId: state.trainingIdToFetch,
                trainingIdToFetch: null,
                ...cardsDeckProps(cardsDeck),
            };
        case types.GAME_FETCH_TRAINING_FAILED:
            return {
                ...state,
                ...init(state.isDeckFlipped),
                trainingIsFetching: false,
                trainingIsLoaded: false,
            };

        default:
            return state;
    }
};
export default gameReducer;
