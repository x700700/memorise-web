import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './Login.scss';
import {useTranslation} from "react-i18next";
import TextInput from "../_Tools/TextInput";
import Button from "../_Tools/Button";
import { validateRequired, validateName, validateEmail, validatePassword } from "../../common/utils";
import { signup } from '../../redux/actions';
import {useHistory} from "react-router";


const SignUp = ({ flipSign }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const isSigningUp = useSelector(state => state.app.isSigningUp);
    const registeredUsername = useSelector(state => state.app.registeredUserName);
    const [valid, setValid] = useState([false, false]);
    const [errName, setErrName] = useState(null);
    const [errEmail, setErrEmail] = useState(null);
    const [errPass, setErrPass] = useState(null);
    const [errPass2, setErrPass2] = useState(null);
    const [onSignup, setOnSignup] = useState(false);

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
    const checkEmail = (text) => {
        if (!validateRequired(text)) {
            setErrEmail(t('err-email-required'));
            updateValid(2, false);
        } else if (!validateEmail(text)) {
            setErrEmail(t('err-email-valid'));
            updateValid(2, false);
        } else {
            setErrEmail(null);
            updateValid(2, true);
        }
    };
    const checkPassword = (text) => {
        if (!validatePassword(text)) {
            setErrPass(t('err-pass-valid'));
            updateValid(3, false);
        } else {
            setErrPass(null);
            updateValid(3, true);
        }
    };
    const checkPassword2 = (text) => {
        if (!validateRequired(text)) {
            setErrPass2(t('err-pass2-required'));
            updateValid(4, false);
        } else if (text !== refPass.current.value()) {
            setErrPass2(t('err-pass2-valid'));
            updateValid(4, false);
        } else {
            setErrPass2(null);
            updateValid(4, true);
        }
    };

    const register = () => {
        if (!isValid) return;
        const email = refEmail.current.value();
        const name = refName.current.value();
        const pass = refPass.current.value();
        console.warn('register - ', email, name, pass);
        refPass.current.setValue('');
        refPass2.current.setValue('');
        setOnSignup(true);
        dispatch(signup({
            email: email,
            nickName: name,
            password: pass,
        }));
    };

    useEffect(() => {
        // console.warn('watch signup = ', isSigningUp, registeredUsername);
        if (!isSigningUp) {
            setOnSignup(false);
            if (registeredUsername) {
                console.warn('registered successfully = ', registeredUsername);
                refEmail.current.setValue('');
                refName.current.setValue('');
                flipSign()
            } else {
                setValid([false, false, false, false]);
                setErrEmail(t('err-signup-short'));
                window.scrollTo(0, 0);
            }
        }
    }, [isSigningUp, registeredUsername, setValid, history, setOnSignup, flipSign, t]);

    const styleBox = {
        opacity: onSignup ? 0 : 1,
    };
    const refName = useRef();
    const refEmail = useRef();
    const refPass = useRef();
    const refPass2 = useRef();
    const name = refName.current && refName.current.value();
    const isValid = !onSignup && valid.reduce((x,a) => a = a && x , true);
    return (
        <div className="sign-container">
            <form style={styleBox}>
                <div className="sign-col sign-up-box">
                    <div className="signup-title">
                        {t('signup-title')}
                    </div>
                    <div className="field sign-email">
                        <TextInput ref={refEmail} label={t('email')} defaultValue="" autoFocus={true}
                                   onBlur={checkEmail} onChange={checkEmail} error={errEmail}
                        />
                    </div>
                    <div className="field sign-name">
                        <TextInput ref={refName} label={t('nickname')} defaultValue=""
                                   onBlur={checkName} onChange={checkName} error={errName}
                        />
                    </div>
                    <div className="field signup-pass">
                        <TextInput ref={refPass} label={t('password')} type="password" defaultValue="" autoFocus={name ? true : false}
                                   onBlur={checkPassword} onChange={checkPassword} error={errPass}
                        />
                    </div>
                    <div className="field signup-pass2">
                        <TextInput ref={refPass2} label={t('password2')} type="password" defaultValue=""
                                   onBlur={checkPassword2} onChange={checkPassword2} error={errPass2}
                        />
                    </div>
                    <div className="sign-btn-container">
                        <Button type="ok" text={t('signup-btn')} disabled={!isValid} onClick={() => register} />
                    </div>
                    <div className="signin-signup">
                        <span>{t('signin?')} </span>
                        <span className="sign-flip-btn" onClick={flipSign}>{t('signin-btn')}</span>
                    </div>
                </div>
            </form>
        </div>);
};
export default SignUp;
