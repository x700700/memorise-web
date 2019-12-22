import React, {useEffect, useRef, useState} from "react";
import './Login.scss';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {useTranslation} from "react-i18next";
import { useForm } from "react-hook-form";
import logger from "../../common/logger";
import * as types from '../../redux/actionsTypes';
import TextInput from "../_Tools/TextInput";
import Button from "../_Tools/Button";
import { validateName, validatePassword } from "../../common/utils";
import { signin } from '../../redux/actions';


const SignIn = ({ flipSign }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const isSigningIn = useSelector(state => state.app.isSigningIn);
    const appError = useSelector(state => state.app.error);
    const loggedInUsername = useSelector(state => state.app.userName);
    const justRegisteredUsername = useSelector(state => state.app.registeredUserName);

    const refPass = useRef();

    const login = (values) => {
        const name = values.nickname;
        const pass = values.password;
        logger.warn('login - ', name, pass);
        refPass.current.setValue('');
        /*
        dispatch({ type: types.TRAININGS_LIST_RESET });
        dispatch({ type: types.TRAINING_RESET });
        dispatch(signin({
            nickName: name,
            password: pass,
        }));
         */
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
        logger.trace('logged in with username = ', loggedInUsername);
        if (loggedInUsername) {
            history.push('/trainings');
        }
    }, [isSigningIn, loggedInUsername, history]);

    const [registeredUsername, setRegisteredUsername] = useState();
    useEffect(() => {
        if (justRegisteredUsername) {
            setRegisteredUsername(justRegisteredUsername);
            dispatch({ type: types.APP_RESET_REGISTERED_USERNAME });
        }
    }, [justRegisteredUsername]);

    const nameError = errors.nickname && (errors.nickname.type === 'required' ? t('err-name-required') : t('err-name-valid'));
    const passError = errors.password && (errors.password.type === 'required' ? t('err-name-required') : t('err-pass-valid'));
    return (
        <div className="sign-container">
            <div className="sign-col">
                <div className="sign-title">
                    {t('signin-title')}
                </div>

                <form onSubmit={handleSubmit(login)}>
                    <div className="field sign-name">
                        <TextInput label={t('nickname')} width="13rem" defaultValue={registeredUsername || ''} autoFocus={!registeredUsername}
                                   error={formError || nameError} onChange={fieldChange}
                                   name="nickname" inputRef={register({ required: true, minLength: 5 })}
                        />
                    </div>
                    <div className="field sign-pass">
                        <TextInput label={t('password')} type="password" width="13rem" defaultValue=""
                                   error={formError || passError} onChange={fieldChange}
                                   name="password" inputRef={register({ required: true, minLength: 6 })}
                                   ref={refPass}
                        />
                    </div>
                    <div className="sign-btn-container">
                        <Button type="submit" text={t('signin-btn')} disabled={!!(errors.nickname || errors.password)}/>
                    </div>
                </form>

                <div className="signin-signup">
                    <span>{t('signup?')} </span>
                    <span className="sign-flip-btn" onClick={flipSign}>{t('signup-btn')}</span>
                </div>
            </div>
        </div>);
};
export default SignIn;
