import * as types from '../actionsTypes';
import consts from "../../common/consts";

const appReducer = (  state = {
                          authCheckStarted: false,
                          authCheckEnded: false,
                          userName: null,
                          error: null,
                          currentPage: null,
                          showMenu: false,
                          activeDrawerTrainingId: null,
                          trainingNameIsOnEdit: false,

                          gameTrainingId: null,
                          gameTrainingIsFetching: false,
                          gameTrainingIsLoaded: false,
                          gameTraining: null,
                          gameTrainingIdToFetch: null,
                          gameTrainingFetchedId: null,
                          gameCardsDeck: null,
                          gameDefaultDeckSize: consts.play.defaultCardsNum,
                          isGameEnded: false,

                          examTrainingId: null,
                          examTrainingIsFetching: false,
                          examTrainingIsLoaded: false,
                          examTraining: null,
                          examTrainingIdToFetch: null,
                          examTrainingFetchedId: null,
                          examCardsDeck: null,
                          examDefaultDeckSize: consts.play.defaultCardsNum,
                          isExamEnded: false,
                      },
                      action) => {

    switch (action.type) {

        // ====================================================================================================
        // ====================================================================================================
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
        case types.APP_SET_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case types.APP_SET_ACTIVE_DRAWER_TRAINING:
            return {
                ...state,
                activeDrawerTrainingId: action.id,
            };
        case types.APP_SET_TRAINING_NAME_IS_ON_EDIT:
            return {
                ...state,
                trainingNameIsOnEdit: action.edit,
            };

        // ====================================================================================================
        // ====================================================================================================

        case types.APP_SET_GAME_TRAINING_ID:
            return {
                ...state,
                gameTrainingId: action.id,
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

        case types.APP_SET_EXAM_TRAINING_ID:
            return {
                ...state,
                examTrainingId: action.id,
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

        // ====================================================================================================
        // ====================================================================================================

        case types.FETCH_GAME_TRAINING_START:
            return {
                ...state,
                gameTrainingIsFetching: true,
                gameTrainingIsLoaded: false,
                gameTraining: null,
                gameTrainingIdToFetch: action.id,
            };
        case types.FETCH_GAME_TRAINING_SUCCEED:
            return {
                ...state,
                gameTrainingIsFetching: false,
                gameTrainingIsLoaded: true,
                gameTraining: action.training,
                gameTrainingFetchedId: action.training && action.training.id,
            };
        case types.FETCH_GAME_TRAINING_FAILED:
            return {
                ...state,
                gameTrainingIsFetching: false,
                gameTrainingIsLoaded: false,
                gameTraining: null,
                gameTrainingFetchedId: null,
            };

        // ====================================================================================================
        // ====================================================================================================

        case types.FETCH_EXAM_TRAINING_START:
            return {
                ...state,
                examTrainingIsFetching: true,
                examTrainingIsLoaded: false,
                examTraining: null,
                examTrainingIdToFetch: action.id,
            };
        case types.FETCH_EXAM_TRAINING_SUCCEED:
            return {
                ...state,
                examTrainingIsFetching: false,
                examTrainingIsLoaded: true,
                examTraining: action.training,
                examTrainingFetchedId: action.training && action.training.id,
            };
        case types.FETCH_EXAM_TRAINING_FAILED:
            return {
                ...state,
                examTrainingIsFetching: false,
                examTrainingIsLoaded: false,
                examTraining: null,
                examTrainingFetchedId: null,
            };

        // ====================================================================================================
        // ====================================================================================================

        default:
            return state;
    }
};
export default appReducer;
