import React, {useEffect, useRef, useState} from "react";
import './Login.scss';
import i18n from '../../common/i18n';
import {useDispatch, useSelector} from "react-redux";
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import logger from "../../common/logger";
import * as types from '../../redux/actionsTypes';
import {useTranslation} from "react-i18next";
import TextInput from "../_Tools/TextInput";
import Button from "../_Tools/Button";
import { validateRequired, validateName, validatePassword } from "../../common/utils";
import { signin } from '../../redux/actions';
import {useHistory} from "react-router";
import handleSubmit from "redux-form/lib/handleSubmit";



/*
const asyncValidate = async (values, dispatch, props, fieldString) => {
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


const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField label={label}
               error={touched && error && true}
               helperText={touched && error}
               {...input}
               {...custom}
    />
);


const SignIn = ({ flipSign, pristine, reset, submitting, handleSubmit }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const isSigningIn = useSelector(state => state.app.isSigningIn);
    const authCheckEnded = useSelector(state => state.app.authCheckEnded);
    const loggedInUsername = useSelector(state => state.app.userName);
    // const registeredUsername = useSelector(state => state.app.registeredUserName);
    const [onSignin, setOnSignin] = useState(false);


    // const refPass = useRef();
    // https://redux-form.com/8.2.2/examples/submitvalidation/
    const login = (values) => {
        const name = values.nickname;
        const pass = values.password;
        logger.warn('login - ', name, pass);
        // refPass.current.setValue('');
        setOnSignin(true);
        dispatch({ type: types.TRAININGS_LIST_RESET });
        dispatch({ type: types.TRAINING_RESET });
        dispatch(signin({
            nickName: name,
            password: pass,
        }));
    };

    useEffect(() => {
        logger.trace('logged in with username = ', loggedInUsername);
        setOnSignin(false);
        if (loggedInUsername) {
            history.push('/trainings');
        }
    }, [isSigningIn, loggedInUsername, history, setOnSignin]);

    return (
        <div className="sign-container">
            <div className="sign-col">
                <div className="sign-title">
                    {t('signin-title')}
                </div>

                <form onSubmit={handleSubmit(login)}>
                    <div className="field sign-name">
                        <Field name="nickname" component={renderTextField} label={t('nickname')}
                               variant="outlined"
                        />
                    </div>
                    <div className="field sign-pass">
                        <Field name="password" component={renderTextField} label={t('password')}
                               variant="outlined" type="password"
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
    form: 'SignIn',  // a unique identifier for this form
    validate,
    // asyncValidate,
})(SignIn)
