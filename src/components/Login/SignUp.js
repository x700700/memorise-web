import React, {useEffect, useRef, useState} from "react";
import './Login.scss';
import {useDispatch, useSelector} from "react-redux";
import { Field, reduxForm } from 'redux-form';
import {useTranslation} from "react-i18next";
import logger from "../../common/logger";
import { renderTextInput } from './form-fields';
import Button from "../_Tools/Button";
import { validateName, validateEmail, validatePassword } from "../../common/utils";
import { signup } from '../../redux/actions';
import {useHistory} from "react-router";
import i18n from "../../common/i18n";


/*
const asyncValidate = async (values, dispatch, props, fieldString) => {
    console.warn('======> asyncValidate - ', fieldString, values);
    if (!fieldString && values.firstName === "abc") {
        const err = { firstName: `Cannot be "abc"` };
        throw err;
    }
};
*/
const validate = values => {
    const errors = {};
    const requiredFields = [ 'email', 'nickname', 'password', 'password2' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = i18n.t('err-name-required');
        }
    });
    if (!validateEmail(values.email)) {
        errors.email = i18n.t('err-email-valid');
    }
    if (!validateName(values.nickname)) {
        errors.nickname = i18n.t('err-name-valid');
    }
    if (!validatePassword(values.password)) {
        errors.password = i18n.t('err-pass-valid');
    }
    if (!validatePassword(values.password2)) {
        errors.password2 = i18n.t('err-pass-valid');
    }
    if (values.password !== values.password2) {
        errors.password2 = i18n.t('err-pass2-valid');
    }
    return errors;
};


const SignUp = ({ flipSign, pristine, reset, submitting, handleSubmit }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const isSigningUp = useSelector(state => state.app.isSigningUp);
    const appError = useSelector(state => state.app.error);
    const registeredUsername = useSelector(state => state.app.registeredUserName);
    const registeringUserName = useSelector(state => state.app.registeringUserName);

    const [showPasswords, setShowPasswords] = useState(false);
    const handleShowPass = (show) => {
        setShowPasswords(show);
    };

    const register = (values) => {
        const email = values.email;
        const name = values.nickname;
        const pass = values.password;
        logger.warn('register - ', email, name, pass);
        dispatch(signup({
            email: email,
            nickName: name,
            password: pass,
        }));
    };

    const fieldChange = () => {
        if (formError) {
            setFormError(null);
        }
    };


    const [formError, setFormError] = useState();
    useEffect(() => {
        if (appError) {
            setFormError(appError);
        }
    }, [appError, setFormError]);

    useEffect(() => {
        logger.warn('Signup update - ', isSigningUp, registeredUsername);
        if (!isSigningUp) {
            if (registeredUsername) {
                // logger.warn('registered successfully = ', registeredUsername);
                // refEmail.current.setValue('');
                // refName.current.setValue('');
                flipSign()
            } else if (registeringUserName) {
                window.scrollTo(0, 0);
            }
        }
    }, [isSigningUp, registeringUserName, registeredUsername, history, flipSign, t]);

    useEffect(() => {
        logger.trace('SignUp mounted');
    }, []);


    const refPass = useRef();
    const refPass2 = useRef();
    return (
        <div className="sign-container">
            <div className="sign-col sign-up-box">
                <div className="signup-title">
                    {t('signup-title')}
                </div>

                <form onSubmit={handleSubmit(register)}>
                    <div className="field sign-email">
                        <Field name="email" component={renderTextInput}
                               label={t('email')} defaultValue="" autoFocus={true}
                               width="13rem"
                               formError={formError} onChange={fieldChange}
                        />
                    </div>
                    <div className="field sign-name">
                        <Field name="nickname" component={renderTextInput}
                               label={t('nickname')} defaultValue=""
                               width="13rem"
                               onChange={fieldChange}
                        />
                    </div>
                    <div className="field signup-pass">
                        <Field name="password" ref={refPass} component={renderTextInput}
                               label={t('password')} type="password" defaultValue=""
                               onShowPassword={handleShowPass} forceShowPassword={showPasswords}
                               width="13rem"
                               onChange={fieldChange}
                        />
                    </div>
                    <div className="field signup-pass2">
                        <Field name="password2" ref={refPass2} component={renderTextInput}
                               label={t('password2')} type="password" defaultValue=""
                               onShowPassword={handleShowPass} forceShowPassword={showPasswords}
                               width="13rem"
                               onChange={fieldChange}
                        />
                    </div>
                    <div className="sign-btn-container">
                        <Button type="submit" text={t('signup-btn')} disabled={pristine || submitting} />
                    </div>
                </form>

                <div className="signin-signup">
                    <span>{t('signin?')} </span>
                    <span className="sign-flip-btn" onClick={flipSign}>{t('signin-btn')}</span>
                </div>
            </div>
        </div>);
};
export default reduxForm({
    form: 'SignUp',
    validate,
    // persistentSubmitErrors: true,
    // asyncValidate,
})(SignUp)
