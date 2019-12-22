import React from "react";
import './MainBanner.scss';
import {useDispatch, useSelector} from "react-redux";
import consts from "../../common/consts";
import * as types from "../../redux/actionsTypes";
import logo from "../../logo.svg";


const MainBanner = (props) => {
    const dispatch = useDispatch();

    const showBanner = useSelector(state => state.app.showBanner);

    const close = () => {
        dispatch({ type: types.APP_SHOW_BANNER, show: false });
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
                    Main Banner....
                </div>
            </div>
        </div>);
};
export default MainBanner;
