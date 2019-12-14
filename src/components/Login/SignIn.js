import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './Login.scss';
import * as types from '../../redux/actionsTypes';
import {useTranslation} from "react-i18next";
import TextInput from "../_Tools/TextInput";
import Button from "../_Tools/Button";
import { validateRequired, validateName, validatePassword } from "../../common/utils";
import { signin } from '../../redux/actions';
import {useHistory} from "react-router";


const SignIn = ({ flipSign }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const isSigningIn = useSelector(state => state.app.isSigningIn);
    const authCheckEnded = useSelector(state => state.app.authCheckEnded);
    const loggedInUsername = useSelector(state => state.app.userName);
    const [valid, setValid] = useState([false, false]);
    const [errName, setErrName] = useState(null);
    const [errPass, setErrPass] = useState(null);
    const [onSignin, setOnSignin] = useState(false);

    const updateValid = (fieldCount, val) => {
        const updated = valid.map((x,i) => i === fieldCount-1 ? val : x);
        setValid(updated);
    };

    const checkName = (text) => {
        if (!validateRequired(text)) {
            setErrName(t('err-name-required'));
            updateValid(1, false);
        } else if (!validateName(text)) {
            setErrName(t('err-name-valid'));
            updateValid(1, false);
        } else {
            setErrName(null);
            updateValid(1, true);
        }
    };
    const checkPassword = (text) => {
        if (!validatePassword(text)) {
            setErrPass(t('err-pass-valid'));
            updateValid(2, false);
        } else {
            setErrPass(null);
            updateValid(2, true);
        }
    };
    const passEnter = () => {
        if (isValid) login();
    };

    const login = () => {
        if (!isValid) return;
        const name = refName.current.value();
        const pass = refPass.current.value();
        // console.warn('login - ', name, pass);
        refPass.current.setValue('');
        setOnSignin(true);
        dispatch({ type: types.TRAININGS_LIST_RESET });
        dispatch({ type: types.TRAINING_RESET });
        dispatch(signin({
            nickName: name,
            password: pass,
        }));
    };

    useEffect(() => {
        // console.warn('logged in with username = ', loggedInUsername);
        setOnSignin(false);
        setValid([true, false]);
        if (loggedInUsername) {
            history.push('/trainings');
        }
    }, [isSigningIn, loggedInUsername, setValid, history, setOnSignin]);

    const styleBox = {
        opacity: !authCheckEnded || loggedInUsername || onSignin ? 0 : 1,
    };
    const refName = useRef();
    const refPass = useRef();
    const name = refName.current && refName.current.value();
    const isValid = !onSignin && valid.reduce((x,a) => a = a && x , true);
    return (
        <div className="sign-container">
            <form style={styleBox}>
                <div className="sign-col">
                    <div className="sign-title">
                        {t('signin-title')}
                    </div>
                    <div className="field sign-name">
                        <TextInput ref={refName} label={t('nickname')} defaultValue="" autoFocus={true}
                                   onBlur={checkName} onChange={checkName} error={errName}
                        />
                    </div>
                    <div className="field sign-pass">
                        <TextInput ref={refPass} label={t('password')} type="password" defaultValue="" autoFocus={name ? true : false}
                                   onBlur={checkPassword} onChange={checkPassword} error={errPass} onEnter={passEnter}
                        />
                    </div>
                    <div className="sign-btn-container">
                        <Button type="ok" text={t('signin-btn')} disabled={!isValid} onClick={() => login} />
                    </div>
                    <div className="signin-signup">
                        <span>{t('signup?')} </span>
                        <span className="sign-flip-btn" onClick={flipSign}>{t('signup-btn')}</span>
                    </div>
                </div>
            </form>
        </div>);
};
export default SignIn;
