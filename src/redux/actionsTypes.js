
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

export const APP_SET_GAME_CARDSDECK = 'app.APP_SET_GAME_CARDSDECK';
export const APP_SET_GAME_ENDED = 'app.APP_SET_GAME_ENDED';
export const APP_SET_GAME_DEFAULT_DECK_SIZE = 'app.APP_SET_GAME_DEFAULT_DECK_SIZE';

export const APP_SET_EXAM_CARDSDECK = 'app.APP_SET_EXAM_CARDSDECK';
export const APP_SET_EXAM_ENDED = 'app.APP_SET_EXAM_ENDED';
export const APP_SET_EXAM_DEFAULT_DECK_SIZE = 'app.APP_SET_EXAM_DEFAULT_DECK_SIZE';


export const TRAININGS_START_FETCH = 'trainings.TRAININGS_START_FETCH';
export const TRAININGS_FETCH_SUCCEED = 'trainings.TRAININGS_FETCH_SUCCEED';
export const TRAININGS_FETCH_FAILED = 'trainings.TRAININGS_FETCH_FAILED';

export const EDIT_TRAINING_START_FETCH = 'trainings.EDIT_TRAINING_START_FETCH';
export const EDIT_TRAINING_FETCH_SUCCEED = 'trainings.EDIT_TRAINING_FETCH_SUCCEED';
export const EDIT_TRAINING_FETCH_FAILED = 'trainings.EDIT_TRAINING_FETCH_FAILED';


export const CREATE_TRAINING_START_FETCH = 'trainings.CREATE_TRAINING_START_FETCH';
export const CREATE_TRAINING_FETCH_SUCCEED = 'trainings.CREATE_TRAINING_FETCH_SUCCEED';
export const CREATE_TRAINING_FETCH_FAILED = 'trainings.CREATE_TRAINING_FETCH_FAILED';

export const RENAME_TRAINING_START_FETCH = 'trainings.RENAME_TRAINING_START_FETCH';
export const RENAME_TRAINING_FETCH_SUCCEED = 'trainings.RENAME_TRAINING_FETCH_SUCCEED';
export const RENAME_TRAINING_FETCH_FAILED = 'trainings.RENAME_TRAINING_FETCH_FAILED';

export const DELETE_TRAINING_START_FETCH = 'trainings.DELETE_TRAINING_START_FETCH';
export const DELETE_TRAINING_FETCH_SUCCEED = 'trainings.DELETE_TRAINING_FETCH_SUCCEED';
export const DELETE_TRAINING_FETCH_FAILED = 'trainings.DELETE_TRAINING_FETCH_FAILED';


export const CREATE_EXERCISE_START_FETCH = 'exercises.CREATE_EXERCISE_START_FETCH';
export const CREATE_EXERCISE_FETCH_SUCCEED = 'exercises.CREATE_EXERCISE_FETCH_SUCCEED';
export const CREATE_EXERCISE_FETCH_FAILED = 'exercises.CREATE_EXERCISE_FETCH_FAILED';

export const SAVE_EXERCISE_START_FETCH = 'exercises.SAVE_EXERCISE_START_FETCH';
export const SAVE_EXERCISE_FETCH_SUCCEED = 'exercises.SAVE_EXERCISE_FETCH_SUCCEED';
export const SAVE_EXERCISE_FETCH_FAILED = 'exercises.SAVE_EXERCISE_FETCH_FAILED';

export const DELETE_EXERCISE_START_FETCH = 'exercises.DELETE_EXERCISE_START_FETCH';
export const DELETE_EXERCISE_FETCH_SUCCEED = 'exercises.DELETE_EXERCISE_FETCH_SUCCEED';
export const DELETE_EXERCISE_FETCH_FAILED = 'exercises.DELETE_EXERCISE_FETCH_FAILED';

export const saga = {
    signin: 'signin',
    signup: 'signup',
    auth: 'auth',

    getTrainingsList: 'getTrainingsList',
    getEditTraining: 'getEditTraining',

    createTraining: 'createTraining',
    renameTraining: 'renameTraining',
    deleteTraining: 'deleteTraining',

    createExercise: 'createExercise',
    saveExercise: 'saveExercise',
    deleteExercise: 'deleteExercise',
};
