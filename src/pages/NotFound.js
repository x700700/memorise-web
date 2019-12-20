import React, { useEffect } from 'react';
import './NotFound.scss'
import { useDispatch } from "react-redux";
import * as types from "../redux/actionsTypes";
import logger from "../common/logger";


const NotFound = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        logger.trace('NotFound mount');
        dispatch({ type: types.APP_SET_CURRENT_PAGE, currentPage: null });
        dispatch({type: types.APP_SHOW_MENU, show: false})
    }, [dispatch]);

    return (
        <div>
            <h1>Page Not Found</h1>
        </div>
    );
};
export default NotFound;
