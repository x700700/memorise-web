import React, {useEffect} from "react";
import './TrainingsList.scss';
import {useDispatch, useSelector} from "react-redux";
import logger from '../common/logger';
import * as types from "../redux/actionsTypes";
import {useHistory} from "react-router-dom";
import consts from "../common/consts";
import {getFriendTrainingsList, getTrainingsList} from '../redux/actions';
import Training from "../components/TrainingsList/Training";
import {ThemeProvider} from "@material-ui/core/styles";
import TextInput from "../components/_Tools/TextInput";
import {Search} from "@material-ui/icons";

const themeSearch = {
    fontSize: '1.2rem',
    fontWeight: 600,
};

const TrainingsList = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const showMenu = useSelector(state => state.app.showMenu);
    const isSearchOn = useSelector(state => state.app.isSearchOn);
    const friendName = useSelector(state => state.app.friendName);
    const isPlayFriend = !!friendName;
    const isFetching = useSelector(state => state.trainings.isFetching);
    const isLoaded = useSelector(state => state.trainings.isLoaded);
    const lastNewTrainingId = useSelector(state => state.trainings.lastNewTrainingId);
    const search = useSelector(state => state.trainings.search);

    const myTrainingsMap = useSelector(state => state.trainings.trainingsMap);
    const friendTrainingsMap = useSelector(state => state.trainings.friendTrainingsMap);
    let trainingsMap = myTrainingsMap;
    if (isPlayFriend && friendName && friendTrainingsMap) {
        trainingsMap = myTrainingsMap && { ...friendTrainingsMap, ...myTrainingsMap };
    }
    const trainingsList = isLoaded ? trainingsMap && Object.values(trainingsMap) : null;
    // logger.warn('====> ', trainingsList);

    let lastSearch = search;
    const doSearch = (text) => {
        if (text !== lastSearch) {
            lastSearch = text;
            dispatch({type: types.TRAININGS_LIST_SET_SEARCH, search: text});
            window.scrollTo(0, 0);
        }
    };
    const setSearchMode = (on) => {
        dispatch({ type: types.APP_SET_ON_SEARCH, on: on });
    };


    useEffect(() => {
        logger.trace('TrainingsList update - new training added');
        if (lastNewTrainingId) {
            // logger.warn('new training created - redirecting to it');
            dispatch({ type: types.TRAINING_RESET });
            dispatch({ type: types.TRAININGS_UPDATE_LAST_NEW_TRAINING_ID, id: null });
            history.push(`/trainings/${lastNewTrainingId}/edit`);
        }
    }, [lastNewTrainingId, dispatch, history]);

    useEffect(() => {
        logger.trace('TrainingsList loading data - friendName = ', friendName);
        if (!isFetching && !myTrainingsMap) {
            dispatch(getTrainingsList());
            window.scrollTo(0,0);
        }
        if (isPlayFriend && friendName && !friendTrainingsMap){
            dispatch(getFriendTrainingsList(friendName));
        }
    }, [dispatch, myTrainingsMap, isPlayFriend, friendName, friendTrainingsMap, isFetching]);

    useEffect(() => {
        logger.trace('TrainingsList mounted');
        dispatch({type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.trainings});
        dispatch({type: types.APP_SHOW_MENU, show: false});
    }, [dispatch]);

    return (
        <div className="trainings-list-page">
            <div className="trainings-list-container">
                <div className="trainings-list-header">
                    <div className="search-row">
                        <ThemeProvider theme={themeSearch}>
                            <TextInput variant="standard" width="13.7rem"
                                       clearTextIcon={true} focusWhenClear={false} startInputAdornment={<Search/>}
                                       onDelayedChange={doSearch} defaultValue={search}
                                       onFocus={() => setSearchMode(true)} onBlur={() => setSearchMode(false)}
                            />
                        </ThemeProvider>
                    </div>
                </div>
                <div className="search-row-placeholder"/>
                <div className="trainings-list-col" style={{ pointerEvents: (showMenu || isSearchOn) && 'none' }}>
                    {trainingsList && trainingsList.map((x, i) => {
                        return (
                            !x.filtered &&
                            <div key={`training-${i}`}>
                                <Training training={x}/>
                            </div>);
                    })}
                </div>
            </div>
        </div>
    );
};
export default TrainingsList;
