import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './Login.scss';
import {useTranslation} from "react-i18next";
import TextInput from "../_Tools/TextInput";
import Button from "../_Tools/Button";
import {validateName, validatePassword} from "../../common/utils";
import { signin } from '../../redux/actions';
import {useHistory} from "react-router";


const SignIn = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const isSigningIn = useSelector(state => state.app.isSigningIn);
    const loggedInUsername = useSelector(state => state.app.userName);
    const [valid, setValid] = useState([false, false]);
    const [errName, setErrName] = useState(null);
    const [errPass, setErrPass] = useState(null);
    const [onSignin, setOnSignin] = useState(false);

    const checkName = (text) => {
        if (!validateName(text)) {
            setErrName(t('err-name-required'));
            setValid([false, valid[1]]);
        } else if (text.includes(' ')) {
            setErrName(t('err-name-valid'));
            setValid([false, valid[1]]);
        } else {
            setErrName(null);
            setValid([true, valid[1]]);
        }
    };
    const checkPassword = (text) => {
        if (!validatePassword(text)) {
            setErrPass(t('err-pass'));
            setValid([valid[0], false]);
        } else {
            setErrPass(null);
            setValid([valid[0], true]);
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
        dispatch(signin({
            nickName: name,
            password: pass,
        }));
    };

    useEffect(() => {
        console.warn('logged in with username = ', loggedInUsername);
        setOnSignin(false);
        setValid([true, false]);
        if (loggedInUsername) {
            history.push('/trainings');
        }
    }, [isSigningIn, loggedInUsername, setValid, history, setOnSignin]);

    const refName = useRef();
    const refPass = useRef();
    const isValid = !onSignin && valid.reduce((x,a) => a = a && x , true);
    return (
        <div className="signin-container">
            <form>
                <div className="signin-col">
                    <div className="signin-title">
                        {t('signin-title')}
                    </div>
                    <div className="field signin-name">
                        <TextInput ref={refName} label={t('nickname')} defaultValue="" autoFocus={true}
                                   onBlur={checkName} onChange={checkName} error={errName}
                        />
                    </div>
                    <div className="field signin-pass">
                        <TextInput ref={refPass} label={t('password')} type="password" defaultValue=""
                                   onBlur={checkPassword} onChange={checkPassword} error={errPass} onEnter={passEnter}
                        />
                    </div>
                    <div className="signin-btn-container">
                        <Button type="ok" text={t('signin-btn')} disabled={!isValid} onClick={() => login} />
                    </div>
                    <div className="signin-signup">
                        <span>{t('signup?')} </span>
                        <span>{t('signup-btn')}</span>
                    </div>
                </div>
            </form>
        </div>);
};
export default SignIn;
