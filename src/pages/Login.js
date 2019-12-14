import React, {useEffect} from "react";
import consts from "../common/consts";
import * as types from "../redux/actionsTypes";
import {useDispatch, useSelector} from "react-redux";
import SignIn from "../components/Login/SignIn";
import SignUp from "../components/Login/SignUp";

const Login = (props) => {
    const dispatch = useDispatch();
    const currPage = useSelector(state => state.app.currentPage);

    useEffect(() => {
        if (currPage !== consts.pageName.login) {
            // console.warn('Login mount');
            dispatch({type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.login});
            dispatch({type: types.APP_SHOW_MENU, show: false});
        }
    }, [dispatch, currPage]);

    return (
        <div className="login-page">
            <SignIn />
        </div>
    );
};
export default Login;
