import * as types from '../actionsTypes';
import consts from "../../common/consts";
import cardsDeck from "../../components/Practice/cardsDeck";

const examReducer = (  state = {
                                isLoaded: false,
                                cardsDeck: null,
                                isDeckFlipped: false,
                            },
                      action) => {

    switch (action.type) {

        case types.EXAM_RESET:
            return {
                ...state,
                isLoaded: false,
                cardsDeck: null,
                isDeckFlipped: false,
            };

        case types.EXAM_LOAD:
            return {
                ...state,
                isLoaded: false,
                cardsDeck: new cardsDeck(consts.localStorage.examId, action.training, state.isDeckFlipped),
            };

        default:
            return state;
    }
};
export default examReducer;
