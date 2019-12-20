import React, {useState, useEffect} from "react";
import logger from '../common/logger';
import consts from "../common/consts";
import * as types from "../redux/actionsTypes";
import {useDispatch, useSelector} from "react-redux";
import SignIn from "../components/Login/SignIn";
import SignUp from "../components/Login/SignUp";

const Login = (props) => {
    const dispatch = useDispatch();
    const currPage = useSelector(state => state.app.currentPage);
    const [showSignUp, setShowSignUp] = useState(false);

    useEffect(() => {
        if (currPage !== consts.pageName.login) {
            logger.trace('Login mount');
            dispatch({ type: types.APP_SET_CURRENT_PAGE, currentPage: consts.pageName.login });
            dispatch({ type: types.APP_SHOW_MENU, show: false });
            dispatch({ type: types.APP_SET_ERROR, error: null });
        }
    }, [dispatch, currPage]);

    const flipSign = (side) => {
        setShowSignUp(side);
    };

    return (
        <div className="login-page">
            {!showSignUp ?
                <SignIn flipSign={() => flipSign(true)}/> :
                <SignUp flipSign={() => flipSign(false)}/>
            }
        </div>
    );
};
export default Login;
