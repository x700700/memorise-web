import React, {useRef} from "react";
import './MainBanner.scss';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router";
import consts from "../../common/consts";
import * as types from "../../redux/actionsTypes";
import logo from "../../logo.svg";
import Modal from "../_Tools/Modal";
import ChooseFriend from "../TrainingsList/ChooseFriend";
import SwitchGreen from "../_Tools/SwitchGreen";


const MainBanner = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();

    const showBanner = useSelector(state => state.app.showBanner);
    const userName = useSelector(state => state.app.userName);
    const isPlayFriend = useSelector(state => state.app.isFriendShared);

    const close = () => {
        dispatch({ type: types.APP_SHOW_BANNER, show: false });
    };
    const logout = () => {
        localStorage.removeItem(consts.localStorage.tokenId);
        localStorage.removeItem(consts.localStorage.friendId);
        dispatch({ type: types.APP_AUTH_RESET });
        dispatch({ type: types.TRAININGS_LIST_RESET });
        dispatch({ type: types.FRIEND_TRAININGS_LIST_RESET });
        dispatch({ type: types.TRAINING_RESET });
        dispatch({ type: types.APP_SHOW_MENU, show: false });
        close();
    };

    const closeModal = () => {
        refModal.current.close();
        dispatch({ type: types.APP_SET_PLAY_FRIEND, play: false });
        dispatch({ type: types.APP_SHOW_BANNER, show: false });
    };
    const resetSwitch = () => {
        dispatch({ type: types.APP_SET_PLAY_FRIEND, play: false });
        dispatch({ type: types.APP_SHOW_BANNER, show: false });
    };

    const refModal = useRef();
    const refSwitch = useRef();
    const searchFriend = () => {
        if (!refSwitch.current.check()) {
            dispatch({type: types.APP_SHOW_MENU, show: false});
            dispatch({type: types.APP_SET_PLAY_FRIEND, play: true});
            refModal.current.open();
        } else {
            dispatch({type: types.APP_SET_PLAY_FRIEND, play: false});
            dispatch({type: types.APP_SHOW_BANNER, show: false});
            history.push('/trainings');
        }
    };


    const styleBanner = {
        transform: showBanner ? 'translateX(0)' : 'translateX(100%)',
    };

    return (
        <div className="main-banner" style={styleBanner}>
            <div className="main-banner-header-space-holder" style={{ minHeight: `${consts.ui.headerHeight}px` }}></div>
            <div className="main-banner-header" style={{ minHeight: `${consts.ui.headerHeight + 2}px` }}>
                <div className="banner-header-row">
                    <div className="header-buttons" onClick={close}>
                        <img className="logo" src={logo} alt="logo" width="32" height="32" />
                        <i className='fas fa-chevron-right icon-close'/>
                    </div>
                </div>
            </div>
            <div className="banner-body-container">
                <div className="banner-body" style={{ height: `calc(100% - ${consts.ui.headerHeight + 10}px)` }}>
                    {userName &&
                    <div className="welcome">
                        <span>{t('hello')} </span>
                        <span className="username">{userName}.</span>
                        <button onClick={logout}><span className="signout">{t('signout')}</span></button>
                    </div>
                    }
                    <div className="search-friend">
                        <div className="flip-container">
                            <SwitchGreen ref={refSwitch} label={t('play friend btn title')} value={isPlayFriend} onChange={searchFriend}/>
                        </div>
                    </div>
                    <div className="about"></div>
                    <div className="footer"></div>
                </div>
            </div>
            <Modal ref={refModal} title={t('play friend btn title')} disableBackdropClick={false} onClose={resetSwitch}>
                <ChooseFriend closeModal={closeModal}/>
            </Modal>
        </div>);
};
export default MainBanner;
