
export const APP_SIGNUP_STARTED = 'app.APP_SIGNUP_STARTED';
export const APP_SIGNUP_SUCCEED = 'app.APP_SIGNUP_SUCCEED';
export const APP_SIGNUP_FAILED = 'app.APP_SIGNUP_FAILED';

export const APP_SIGNIN_STARTED = 'app.APP_SIGNIN_STARTED';
export const APP_SIGNIN_SUCCEED = 'app.APP_SIGNIN_SUCCEED';
export const APP_SIGNIN_FAILED = 'app.APP_SIGNIN_FAILED';

export const APP_AUTH_STARTED = 'app.APP_AUTH_STARTED';
export const APP_AUTH_SUCCEED = 'app.APP_AUTH_SUCCEED';
export const APP_AUTH_FAILED = 'app.APP_AUTH_FAILED';

export const APP_SET_CURRENT_PAGE = 'app.APP_SET_CURRENT_PAGE';
export const APP_SHOW_MENU = 'app.APP_SHOW_MENU';
export const APP_SET_ERROR = 'app.APP_SET_ERROR';
export const APP_SET_ACTIVE_DRAWER_TRAINING = 'app.APP_SET_ACTIVE_DRAWER_TRAINING';

export const APP_SET_GAME_TRAINING_ID = 'app.APP_SET_GAME_TRAINING_ID';
export const APP_SET_GAME_CARDSDECK = 'app.APP_SET_GAME_CARDSDECK';
export const APP_SET_GAME_ENDED = 'app.APP_SET_GAME_ENDED';
export const APP_SET_GAME_DEFAULT_DECK_SIZE = 'app.APP_SET_GAME_DEFAULT_DECK_SIZE';

export const APP_SET_EXAM_TRAINING_ID = 'app.APP_SET_EXAM_TRAINING_ID';
export const APP_SET_EXAM_CARDSDECK = 'app.APP_SET_EXAM_CARDSDECK';
export const APP_SET_EXAM_ENDED = 'app.APP_SET_EXAM_ENDED';
export const APP_SET_EXAM_DEFAULT_DECK_SIZE = 'app.APP_SET_EXAM_DEFAULT_DECK_SIZE';

// ============================================================================================================
// ============================================================================================================

export const FETCH_TRAININGS_START = 'trainings.FETCH_TRAININGS_START';
export const FETCH_TRAININGS_SUCCEED = 'trainings.FETCH_TRAININGS_SUCCEED';
export const FETCH_TRAININGS_FAILED = 'trainings.FETCH_TRAININGS_FAILED';

export const FETCH_EDIT_TRAINING_START = 'trainings.FETCH_EDIT_TRAINING_START';
export const FETCH_EDIT_TRAINING_SUCCEED = 'trainings.FETCH_EDIT_TRAINING_SUCCEED';
export const FETCH_EDIT_TRAINING_FAILED = 'trainings.FETCH_EDIT_TRAINING_FAILED';

export const FETCH_GAME_TRAINING_START = 'trainings.FETCH_GAME_TRAINING_START';
export const FETCH_GAME_TRAINING_SUCCEED = 'trainings.FETCH_GAME_TRAINING_SUCCEED';
export const FETCH_GAME_TRAINING_FAILED = 'trainings.FETCH_GAME_TRAINING_FAILED';

export const FETCH_EXAM_TRAINING_START = 'trainings.FETCH_EXAM_TRAINING_START';
export const FETCH_EXAM_TRAINING_SUCCEED = 'trainings.FETCH_EXAM_TRAINING_SUCCEED';
export const FETCH_EXAM_TRAINING_FAILED = 'trainings.FETCH_EXAM_TRAINING_FAILED';


export const FETCH_CREATE_TRAINING_START = 'trainings.FETCH_CREATE_TRAINING_START';
export const FETCH_CREATE_TRAINING_SUCCEED = 'trainings.FETCH_CREATE_TRAINING_SUCCEED';
export const FETCH_CREATE_TRAINING_FAILED = 'trainings.FETCH_CREATE_TRAINING_FAILED';

export const FETCH_RENAME_TRAINING_START = 'trainings.FETCH_RENAME_TRAINING_START';
export const FETCH_RENAME_TRAINING_SUCCEED = 'trainings.FETCH_RENAME_TRAINING_SUCCEED';
export const FETCH_RENAME_TRAINING_FAILED = 'trainings.FETCH_RENAME_TRAINING_FAILED';

export const FETCH_DELETE_TRAINING_START = 'trainings.FETCH_DELETE_TRAINING_START';
export const FETCH_DELETE_TRAINING_SUCCEED = 'trainings.FETCH_DELETE_TRAINING_SUCCEED';
export const FETCH_DELETE_TRAINING_FAILED = 'trainings.FETCH_DELETE_TRAINING_FAILED';


export const FETCH_CREATE_EXERCISE_START = 'exercises.FETCH_CREATE_EXERCISE_START';
export const FETCH_CREATE_EXERCISE_SUCCEED = 'exercises.FETCH_CREATE_EXERCISE_SUCCEED';
export const FETCH_CREATE_EXERCISE_FAILED = 'exercises.FETCH_CREATE_EXERCISE_FAILED';

export const FETCH_SAVE_EXERCISE_START = 'exercises.FETCH_SAVE_EXERCISE_START';
export const FETCH_SAVE_EXERCISE_SUCCEED = 'exercises.FETCH_SAVE_EXERCISE_SUCCEED';
export const FETCH_SAVE_EXERCISE_FAILED = 'exercises.FETCH_SAVE_EXERCISE_FAILED';

export const FETCH_DELETE_EXERCISE_START = 'exercises.FETCH_DELETE_EXERCISE_START';
export const FETCH_DELETE_EXERCISE_SUCCEED = 'exercises.FETCH_DELETE_EXERCISE_SUCCEED';
export const FETCH_DELETE_EXERCISE_FAILED = 'exercises.FETCH_DELETE_EXERCISE_FAILED';



export const saga = {
    signin: 'signin',
    signup: 'signup',
    auth: 'auth',

    getTrainingsList: 'getTrainingsList',
    getEditTraining: 'getEditTraining',
    getGameTraining: 'getGameTraining',
    getExamTraining: 'getExamTraining',

    createTraining: 'createTraining',
    renameTraining: 'renameTraining',
    deleteTraining: 'deleteTraining',

    createExercise: 'createExercise',
    saveExercise: 'saveExercise',
    deleteExercise: 'deleteExercise',
};
