import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as types from "../redux/actionsTypes";
import './NotFound.scss'

const NotFound = (props) => {
    const dispatch = useDispatch();
    const showMenu = useSelector(state => state.app.showMenu);

    useEffect(() => {
        dispatch({ type: types.APP_SET_CURRENT_PAGE, currentPage: null });
        if (showMenu) {
            dispatch({type: types.APP_SHOW_MENU, show: false});
        }
    }, [dispatch]);

    return (
        <div>
            <h1>Page Not Found</h1>
        </div>
    );
};
export default NotFound;
