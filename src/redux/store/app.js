import logger from "../../common/logger";
import * as types from '../actionsTypes';
import consts from "../../common/consts";

const appReducer = (  state = {
                          authCheckStarted: false,
                          authErrorMessage: 'Press the user icon to sign in',
                          signinErrorMessage: 'Nick name or password are wrong',
                          signupErrorMessage: 'Nick name or password are wrong',
                          friendErrorMessage: 'Friend was not found',
                          authCheckEnded: false,
                          userName: null,
                          isFriendShared: false,
                          friendName: null,
                          isSigningIn: false,
                          isSigningUp: false,
                          registeringUserName: null,
                          registeredUserName: null,
                          jwt: null,
                          error: null,
                          authError: false,
                          currentPage: null,
                          showMenu: false,
                          showBanner: false,
                          isModalOn: false,
                          activeDrawerTrainingId: null,
                          trainingNameIsOnEdit: false,
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
                authErrorMessage: action.authErrorMessage || state.authErrorMessage,
                signinErrorMessage: action.signinErrorMessage || state.signinErrorMessage,
                signupErrorMessage: action.signupErrorMessage || state.signupErrorMessage,
                friendErrorMessage: action.friendErrorMessage || state.friendErrorMessage,
            };
        case types.APP_AUTH_SUCCEED:
            const mem = localStorage.getItem(consts.localStorage.friendId);
            const { isFriendShared, friendName } = (mem && JSON.parse(mem)) || {};
            return {
                ...state,
                authCheckEnded: true,
                userName: action.name,
                friendName: friendName,
                isFriendShared: isFriendShared,
            };
        case types.APP_AUTH_FAILED:
            logger.error('auth failed: ', action.message);
            return {
                ...state,
                authCheckEnded: true,
                // error: state.authErrorMessage,
                userName: null,
            };


        case types.APP_CHECK_AUTH_FAILED:
            const status = (action.e || {}).status;
            const message = ((action.e || {}).data || {}).message || action.e.statusText;
            if (status === 401 || (message || '').toLowerCase().includes('jwt')) {
                logger.error('auth failure: ', message);
                return {
                    ...state,
                    authCheckEnded: true,
                    // error: state.authErrorMessage,
                    authError: true,
                    userName: null,
                    jwt: null,
                };
            } else {
                return {
                    ...state,
                    error: action.message,
                };
            }

        case types.APP_AUTH_RESET:
            return {
                ...state,
                authCheckStarted: false,
                authCheckEnded: false,
                userName: null,
                isSigningIn: false,
                isSigningUp: false,
                registeringUserName: null,
                registeredUserName: null,
                jwt: null,
                error: null,
                authError: false,
                friendName: null,
                isFriendShared: false,
            };

        case types.APP_RESET_AUTH_ERROR:
            return {
                ...state,
                authError: false,
            };

        // ====================================================================================================
        // ====================================================================================================

        case types.APP_SET_PLAY_FRIEND:
            if (action.play) {
                localStorage.setItem(consts.localStorage.friendId, JSON.stringify({ friendName: state.friendName, isFriendShared: action.play }));
            } else {
                localStorage.removeItem(consts.localStorage.friendId);
            }
            return {
                ...state,
                isFriendShared: action.play,
            };

        case types.APP_SET_FRIEND_NAME:
            if (action.friendName) {
                localStorage.setItem(consts.localStorage.friendId, JSON.stringify({ friendName: action.friendName, isFriendShared: state.isFriendShared }));
            } else {
                localStorage.removeItem(consts.localStorage.friendId);
            }
            return {
                ...state,
                friendName: action.friendName,
                error: action.error ? state.friendErrorMessage : null,
            };

        // ====================================================================================================
        // ====================================================================================================

        case types.APP_SIGNIN_STARTED:
            localStorage.removeItem(consts.localStorage.tokenId);
            return {
                ...state,
                isSigningIn: true,
                jwt: null,
            };
        case types.APP_SIGNIN_SUCCEED:
            localStorage.setItem(consts.localStorage.tokenId, action.loginResult.token);
            return {
                ...state,
                isSigningIn: false,
                authCheckEnded: true,
                userName: action.loginResult.user.nickName,
                jwt: action.loginResult.token,
            };
        case types.APP_SIGNIN_FAILED:
            logger.error('signin failed: ', action.message);
            return {
                ...state,
                isSigningIn: false,
                authCheckEnded: true,
                error: state.signinErrorMessage,
                userName: null,
            };


        case types.APP_RESET_REGISTERED_USERNAME:
            return {
                ...state,
                registeredUserName: null,
            };

        case types.APP_SIGNUP_STARTED:
            localStorage.removeItem(consts.localStorage.tokenId);
            return {
                ...state,
                isSigningUp: true,
                registeredUserName: null,
                registeringUserName: action.nickName,
                jwt: null,
            };
        case types.APP_SIGNUP_SUCCEED:
            return {
                ...state,
                isSigningUp: false,
                registeredUserName: action.registerResult.nickName,
            };
        case types.APP_SIGNUP_FAILED:
            logger.error('signup failed: ', action.message);
            return {
                ...state,
                isSigningUp: false,
                error: state.signupErrorMessage,
                registeredUserName: null,
            };

        // ====================================================================================================
        // ====================================================================================================

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
        case types.APP_SHOW_BANNER:
            return {
                ...state,
                showBanner: action.show,
                showMenu: false,
            };
        case types.APP_SHOW_MODAL:
            return {
                ...state,
                isModalOn: action.on,
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

        default:
            return state;
    }
};
export default appReducer;
