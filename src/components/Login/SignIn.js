import React, {useEffect, useState} from "react";
import './Login.scss';
import i18n from '../../common/i18n';
import {useDispatch, useSelector} from "react-redux";
import { Field, reduxForm } from 'redux-form';
import logger from "../../common/logger";
import * as types from '../../redux/actionsTypes';
import {useTranslation} from "react-i18next";
import { renderTextInput } from './form-fields';
import Button from "../_Tools/Button";
import { validateName, validatePassword } from "../../common/utils";
import { signin } from '../../redux/actions';
import {useHistory} from "react-router";


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
    const requiredFields = [ 'nickname', 'password' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = i18n.t('err-name-required');
        }
    });
    if (!validateName(values.nickname)) {
        errors.nickname = i18n.t('err-name-valid');
    }
    if (!validatePassword(values.password)) {
        errors.password = i18n.t('err-pass-valid');
    }
    return errors;
};


const SignIn = ({ flipSign, pristine, reset, submitting, handleSubmit }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const isSigningIn = useSelector(state => state.app.isSigningIn);
    const appError = useSelector(state => state.app.error);
    const loggedInUsername = useSelector(state => state.app.userName);
    const registeredUsername = useSelector(state => state.app.registeredUserName);


    // https://redux-form.com/8.2.2/examples/submitvalidation/
    const login = (values) => {
        const name = values.nickname;
        const pass = values.password;
        logger.warn('login - ', name, pass);
        dispatch({ type: types.TRAININGS_LIST_RESET });
        dispatch({ type: types.TRAINING_RESET });
        dispatch(signin({
            nickName: name,
            password: pass,
        }));
    };

    const nameChange = () => {
        if (formError) {
            setFormError(null);
        }
    };
    const passChange = () => {
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
        logger.trace('logged in with username = ', loggedInUsername);
        if (loggedInUsername) {
            history.push('/trainings');
        }
    }, [isSigningIn, loggedInUsername, history]);

    return (
        <div className="sign-container">
            <div className="sign-col">
                <div className="sign-title">
                    {t('signin-title')}
                </div>

                <form onSubmit={handleSubmit(login)}>
                    <div className="field sign-name">
                        <Field name="nickname" component={renderTextInput} label={t('nickname')}
                               variant="outlined" width="13rem"
                               defaultValue={registeredUsername || ''} autoFocus={!registeredUsername}
                               formError={formError} onChange={nameChange}
                        />
                    </div>
                    <div className="field sign-pass">
                        <Field name="password" component={renderTextInput} label={t('password')} type="password"
                               variant="outlined" width="13rem"
                               defaultValue="" onChange={passChange}
                        />
                    </div>
                    <div className="sign-btn-container">
                        <Button type="submit" text={t('signin-btn')} disabled={pristine || submitting}/>
                    </div>
                </form>

                <div className="signin-signup">
                    <span>{t('signup?')} </span>
                    <span className="sign-flip-btn" onClick={flipSign}>{t('signup-btn')}</span>
                </div>
            </div>
        </div>);
};
export default reduxForm({
    form: 'SignIn',
    validate,
    // persistentSubmitErrors: true,
    // asyncValidate,
})(SignIn)
