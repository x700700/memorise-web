import React, { useRef } from 'react';
import './SubMenuReplay.scss';
import Slider from "../common/Slider";
import consts from "../../common/consts";
import Button from "../common/Button";
import { useTranslation } from "react-i18next";

const SubMenuReplay = ({ playType, replayCb, size }) => {
    const { t } = useTranslation();
    const refSlider = useRef();

    const replay = () => {
        const val = refSlider.current.value();
        replayCb(val);
    };

    return (
        <div className="sub-menu-replay">
            <div className="size-slider-container">
                <Slider ref={refSlider} min={consts.play.minCards} max={size} />
            </div>
            <div className="footline size-slider-foot">Number Of Cards to {playType}</div>
            <div className="replay-btn">
                <Button text={t('replay')} onClick={() => replay} />
            </div>
        </div>
    );
};
export default SubMenuReplay;
