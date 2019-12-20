import React from 'react';
import './MenuEdit.scss';
import { useDispatch, useSelector } from "react-redux";
import TopMenu from "../_Tools/TopMenu";
import {useTranslation} from "react-i18next";
import * as types from "../../redux/actionsTypes";
import Button from "../_Tools/Button";


const MenuEdit = ({ hide }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const training = useSelector(state => state.editTraining.training);
    const trainingName = useSelector(state => state.editTraining.name);

    const delPressed = () => {
        if (training) {
            dispatch({ type: types.APP_SHOW_MENU, show: false });
            dispatch({ type: types.TRAINING_SET_DELETE_ID, id: training.id });
        }
    };

    return (
        <TopMenu hide={hide}>
            {training &&
            <div className="menu-edit-col">
                <div className="title">{trainingName}</div>
                <div className="delete-btn-row">
                    <div className="msg">{t("delete this training")}</div>
                    <div className="delete-btn-container">
                        <Button type="cancel" text={t('delete')} onClick={() => delPressed}/>
                    </div>
                </div>
            </div>
            }
        </TopMenu>
    );
};
export default MenuEdit;
