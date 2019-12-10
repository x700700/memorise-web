import React, {useRef} from "react";
import './SignIn.scss';
import {useTranslation} from "react-i18next";
import TextInput from "../_Tools/TextInput";
import Button from "../_Tools/Button";

const SignIn = (props) => {
    const { t } = useTranslation();

    const login = () => {};

    const refName = useRef();
    const refPass = useRef();
    return (
        <div className="signin-container">
            <form>
                <div className="signin-col">
                    <div className="signin-title">
                        {t('signin-title')}
                    </div>
                    <div className="field signin-name">
                        <TextInput ref={refName} label={t('nickname')} defaultValue="" autoFocus={true} onEnter={() => {}} />
                    </div>
                    <div className="field signin-pass">
                        <TextInput ref={refPass} label={t('password')} defaultValue="" />
                    </div>
                    <div className="signin-btn-container">
                        <Button type="ok" text={t('signin-btn')} onClick={() => login} />
                    </div>
                </div>
            </form>
        </div>);
};
export default SignIn;
