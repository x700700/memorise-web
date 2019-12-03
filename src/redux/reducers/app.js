import * as types from '../actionsTypes';
import consts from "../../common/consts";

const appReducer = (  state = {
                          authCheckStarted: false,
                          authCheckEnded: false,
                          userName: null,
                          error: null,
                          currentPage: null,
                          showMenu: false,

                          gameCardsDeck: null,
                          gameDefaultDeckSize: consts.play.defaultCardsNum,
                          isGameEnded: false,

                          examCardsDeck: null,
                          examDefaultDeckSize: consts.play.defaultCardsNum,
                          isExamEnded: false,
                      },
                      action) => {

    switch (action.type) {

        case types.APP_AUTH_STARTED:
            return {
                ...state,
                authCheckStarted: true,
                authCheckEnded: false,
            };
        case types.APP_AUTH_SUCCEED:
            return {
                ...state,
                authCheckEnded: true,
                userName: action.name,
            };
        case types.APP_AUTH_FAILED:
            console.warn('auth failed: ', action.message);
            return {
                ...state,
                authCheckEnded: true,
                error: action.message,
                userName: null,
            };

        case types.APP_SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            };
        case types.APP_SHOW_MENU:
            return {
                ...state,
                showMenu: action.show,
            };

        case types.APP_SET_GAME_CARDSDECK:
            return {
                ...state,
                gameCardsDeck: action.cardsDeck,
            };
        case types.APP_SET_GAME_ENDED:
            return {
                ...state,
                isGameEnded: action.ended,
            };
        case types.APP_SET_GAME_DEFAULT_DECK_SIZE:
            return {
                ...state,
                gameDefaultDeckSize: action.size,
            };

        case types.APP_SET_EXAM_CARDSDECK:
            return {
                ...state,
                examCardsDeck: action.cardsDeck,
            };
        case types.APP_SET_EXAM_ENDED:
            return {
                ...state,
                isExamEnded: action.ended,
            };
        case types.APP_SET_EXAM_DEFAULT_DECK_SIZE:
            return {
                ...state,
                examDefaultDeckSize: action.size,
            };

        default:
            return state;
    }
};
export default appReducer;
