import React, {useRef} from "react";
import './MainBanner.scss';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router";
import {ThemeProvider} from "@material-ui/core/styles";
import consts from "../../common/consts";
import * as types from "../../redux/actionsTypes";
import Modal from "../_Tools/Modal";
import ChooseFriend from "../TrainingsList/ChooseFriend";
import IconButton from "../_Tools/IconButton";
import {deepOrange, purple} from "@material-ui/core/colors";


const themeModal = {
    width: '80%',
    height: 235,
};

const MainBanner = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();

    const showBanner = useSelector(state => state.app.showBanner);
    const userName = useSelector(state => state.app.userName);
    const friendName = useSelector(state => state.app.friendName);
    const isPlayFriend = friendName && true;

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
        dispatch({ type: types.APP_SHOW_BANNER, show: false });
    };
    const resetSwitch = () => {
        dispatch({ type: types.APP_SHOW_BANNER, show: false });
        history.push('/trainings');
    };

    const refModal = useRef();
    const searchFriend = () => {
        dispatch({ type: types.APP_SHOW_BANNER, show: false });
        dispatch({ type: types.APP_SHOW_MENU, show: false });
        refModal.current.open();
        history.push('/trainings');
    };
    const stopFriend = () => {
        dispatch({ type: types.APP_SHOW_BANNER, show: false });
        dispatch({ type: types.APP_SET_FRIEND_NAME, friendName: null });
        history.push('/trainings');
    };


    const styleBanner = {
        top: `${consts.ui.headerHeight}px`,
        transform: showBanner ? 'translateX(0)' : 'translateX(100%)',
    };

    return (
        <div className="main-banner" style={styleBanner}>
            <div className="banner-body-container">
                <div className="banner-close-btn-absolute">
                    <button onClick={close} className="btn"><i className="fas fa-times"></i></button>
                </div>
                <div className="banner-body" style={{ height: `calc(100% - ${consts.ui.headerHeight + 10}px)` }}>
                    {userName &&
                    <div className="welcome">
                        <span>{t('hello')} </span>
                        <span className="username">{userName}.</span>
                        <button onClick={logout}><span className="signout">{t('signout')}</span></button>
                    </div>
                    }
                    <div className="search-friend">
                        <div className="friend-setup-container">
                            {!isPlayFriend ?
                                <span className="title">{t('play friend btn title off')}</span> :

                                <span className="title">
                                    <span>{t('play friend btn title on')} </span>
                                    <span className="friend-name">{friendName && friendName.slice(0,15)}</span>
                                </span>
                            }
                            <div className="buttons">
                                {isPlayFriend &&
                                <div className="btn">
                                    <IconButton size={2} faName="times-circle" backgroundColor={deepOrange[400]}
                                                color={deepOrange[50]} onClick={stopFriend}/>
                                </div>
                                }
                                <div className="btn">
                                    <IconButton size={2} faName="search" backgroundColor={purple[400]} color={purple[50]} onClick={searchFriend}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="about"></div>
                    <div className="footer"></div>
                </div>
            </div>
            <ThemeProvider theme={themeModal}>
                <Modal ref={refModal} title={t('play friend btn title')} disableBackdropClick={false} onClose={resetSwitch}>
                    <ChooseFriend closeModal={closeModal}/>
                </Modal>
            </ThemeProvider>
        </div>);
};
export default MainBanner;
