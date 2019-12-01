import * as types from '../actionsTypes';

export const appAuth = () => ({
    type: types.saga.auth,
});

export const setCurrentPage = currentPage => {
    return {
        type: types.APP_SET_CURRENT_PAGE,
        currentPage: currentPage
    }
};
