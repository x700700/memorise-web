import * as types from '../actionsTypes';
import consts from "../../common/consts";
import CardsDeck from "../../components/Practice/cardsDeck";
import { loadCardsDeck } from '../../common/playUtils';

const init = (isDeckFlipped = false, isNextDeckFlipped = false) => ({
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
    isNextDeckFlipped: isNextDeckFlipped,
    isDeckFlipped: isDeckFlipped,
    playSize: consts.play.defaultCardsNum,
    playNumber: 1,

    answers: null,
    topQAnswerId: null,
    isExamPageAnswered: false,
    rightsNum: 0,

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
            playSize: cardsDeck.getPlayDeckSize(),
        };
    }
    return {
        ...basic,
        trainingSize: cardsDeck.getTrainingSize(),
        fullDeckSize: cardsDeck.getFullDeckSize(),
        playDeckSize: cardsDeck.getPlayDeckSize(),
        deckCurrentSize: cardsDeck.getDeckCurrentSize(),
        isDeckFlipped: cardsDeck.getIsDeckFlipped(),
        isNextDeckFlipped: cardsDeck.getIsNextDeckFlipped(),
        cardQ: cardsDeck.topQ(),
        cardA: cardsDeck.topA(),

        answers: cardsDeck.getTopQAnswers(),
        topQAnswerId: cardsDeck.getTopQAnswerId(),
        isExamPageAnswered: cardsDeck.getIsExamPageAnswered(),
        rightsNum: cardsDeck.getRightsNum(),

        isEnded: !cardsDeck.top(),
    };
};

const examReducer = (  state = init(),
                      action) => {

    const storageId = consts.localStorage.examId;
    let cardsDeck;

    switch (action.type) {

        case types.EXAM_RESET:
            return {
                ...state,
                ...init(),
            };

        case types.EXAM_SET_ANSWER:
            state.cardsDeck.setTopQAnswer(action.id);
            return {
                ...state,
                isExamPageAnswered: state.cardsDeck.getIsExamPageAnswered(),

            };
        case types.EXAM_NEXT_QUESTION:
            state.cardsDeck.nextQuestion();
            return {
                ...state,
                deckCurrentSize: state.cardsDeck.getDeckCurrentSize(),
                cardQ: state.cardsDeck.topQ(),
                cardA: state.cardsDeck.topA(),
                isEnded: !state.cardsDeck.top(),
                plays: state.cardsDeck.getPlays(),

                answers: state.cardsDeck.getTopQAnswers(),
                isExamPageAnswered: false,
                topQAnswerId: state.cardsDeck.getTopQAnswerId(),
                rightsNum: state.cardsDeck.getRightsNum(),

            };

        case types.EXAM_FLIP:
            state.cardsDeck.setIsNextDeckFlipped(action.flip);
            return {
                ...state,
                isNextDeckFlipped: state.cardsDeck.getIsNextDeckFlipped(),
            };

        case types.EXAM_SET_PLAY_SIZE:
            return {
                ...state,
                playSize: action.size,
            };

        case types.EXAM_LOAD:
            cardsDeck = loadCardsDeck(storageId, state.cardsDeck, action.training, state.isNextDeckFlipped);
            return {
                ...state,
                ...cardsDeckProps(cardsDeck),
                trainingIdToFetch: null,
                friendName: null,
                trainingIsFetching: false,
                trainingIsLoaded: false,
            };

        case types.EXAM_REPLAY:
            state.cardsDeck.reExam(state.playSize);
            return {
                ...state,
                ...cardsDeckProps(state.cardsDeck, true),
                plays: 0,
                playNumber: state.playNumber + 1,
            };



        case types.EXAM_SET_TRAINING_ID:
            return {
                ...state,
                trainingIdToFetch: action.id,
                friendName: action.friendName,
            };
        case types.EXAM_SET_ENDED:
            return {
                ...state,
                isEnded: action.ended,
            };

        case types.EXAM_FETCH_TRAINING_START:
            localStorage.removeItem(storageId);
            return {
                ...state,
                ...init(state.isDeckFlipped, state.isNextDeckFlipped),
                trainingIsFetching: true,
                trainingIsLoaded: false,
                trainingIdToFetch: action.id,
            };
        case types.EXAM_FETCH_TRAINING_SUCCEED:
            cardsDeck = new CardsDeck(storageId, action.training, state.isNextDeckFlipped);
            return {
                ...state,
                trainingIsFetching: false,
                trainingIsLoaded: true,
                trainingIdToFetch: null,
                ...cardsDeckProps(cardsDeck),
            };
        case types.EXAM_FETCH_TRAINING_FAILED:
            return {
                ...state,
                ...init(state.isDeckFlipped, state.isNextDeckFlipped),
                trainingIsFetching: false,
                trainingIsLoaded: false,
            };

        default:
            return state;
    }
};
export default examReducer;
