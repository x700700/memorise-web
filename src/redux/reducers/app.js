import * as types from '../actionsTypes';
import consts from '../../common/consts';


const appReducer = (  state = {
                          authCheckStarted: false,
                          authCheckEnded: false,
                          userName: null,
                          error: null,
                          currentPage: consts.pageName.practice,
                          editedTrainingId: null,
                          playedTrainingId: null,
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
                currentPage: action.currentPage
            };

        default:
            return state;
    }
};
export default appReducer;
