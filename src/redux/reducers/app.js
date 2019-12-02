import * as types from '../actionsTypes';

const appReducer = (  state = {
                          authCheckStarted: false,
                          authCheckEnded: false,
                          userName: null,
                          error: null,
                          currentPage: null,
                          gameCardsDeck: null,
                          showMenu: false,
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

        default:
            return state;
    }
};
export default appReducer;
