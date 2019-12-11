import React, {useRef, useState} from "react";
import './Login.scss';
import {useTranslation} from "react-i18next";
import TextInput from "../_Tools/TextInput";
import Button from "../_Tools/Button";
import {validateName, validatePassword} from "../../common/utils";

const SignIn = (props) => {
    const { t } = useTranslation();
    const [errName, setErrName] = useState(null);
    const [errPass, setErrPass] = useState(null);

    const checkName = (text) => {
        if (!validateName(text)) {
            setErrName(t('err-name-required'));
        } else if (text.includes(' ')) {
            setErrName(t('err-name-valid'));
        } else {
            setErrName(null);
        }
    };
    const checkPassword = (text) => {
        if (!validatePassword(text)) {
            setErrPass(t('err-pass'));
        } else {
            setErrPass(null);
        }
    };
    const nameEnter = () => {
        // refPass.current.focus();
    };
    const passEnter = () => {
        if (valid) login();
    };

    const login = () => {
        const name = refName.current.value();
        const pass = refPass.current.value();
        console.warn('login - ', name, pass);
    };

    const refName = useRef();
    const refPass = useRef();
    const valid = validateName(refName.current && refName.current.value()) && validateName(refPass.current && refPass.current.value());
    return (
        <div className="signin-container">
            <form>
                <div className="signin-col">
                    <div className="signin-title">
                        {t('signin-title')}
                    </div>
                    <div className="field signin-name">
                        <TextInput ref={refName} label={t('nickname')} defaultValue="" autoFocus={true}
                                   onBlur={checkName} onChange={checkName} error={errName} onEnter={nameEnter}
                        />
                    </div>
                    <div className="field signin-pass">
                        <TextInput ref={refPass} label={t('password')} type="password" defaultValue=""
                                   onBlur={checkPassword} onChange={checkPassword} error={errPass} onEnter={passEnter}
                        />
                    </div>
                    <div className="signin-btn-container">
                        <Button type="ok" text={t('signin-btn')} disabled={!valid} onClick={() => login} />
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
