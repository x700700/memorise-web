import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router";
import './MenuEdit.scss';
// import consts from '../../common/consts';
import TopMenu from "../_Tools/TopMenu";
import {useTranslation} from "react-i18next";
import * as types from "../../redux/actionsTypes";
import {deleteTraining} from '../../redux/actions';
import Button from "../_Tools/Button";


const MenuEdit = ({ hide }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const training = useSelector(state => state.editTraining.training);

    const delPressed = () => {
        if (training) {
            dispatch({type: types.APP_SHOW_MENU, show: false});
            dispatch(deleteTraining(training.id));
            history.push('/trainings');
        }
    };

    return (
        <TopMenu hide={hide}>
            {training &&
            <div className="menu-edit-col">
                <div className="title">{t("delete training")}</div>
                <div className="are-u-sure">{t("are u sure")}</div>
                <div className="delete-btn-container">
                    <Button type="cancel" text={t('delete')} onClick={() => delPressed}/>
                </div>
            </div>
            }
        </TopMenu>
    );
};
export default MenuEdit;
