import * as types from '../actionsTypes';

export const setcurrentPage = currentPage => {
    return {
        type: types.APP_SET_CURRENT_PAGE,
        currentPage: currentPage
    }
};
