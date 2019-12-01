import * as types from '../actionsTypes';
import consts from '../../common/consts';


const appReducer = (  state = {
                          userId: null,
                          error: null,
                          currentPage: consts.tabName.practice,
                          editedTrainingId: null,
                          playedTrainingId: null,
                      },
                      action) => {

    switch (action.type) {

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
