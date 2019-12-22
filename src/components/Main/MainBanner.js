import React from "react";
import './MainBanner.scss';
import {useDispatch, useSelector} from "react-redux";
import consts from "../../common/consts";
import * as types from "../../redux/actionsTypes";


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
                <div className="banner-header-row" onClick={close}>
                    Main banner Header..!
                </div>
            </div>
            Main Banner....
        </div>);
};
export default MainBanner;
