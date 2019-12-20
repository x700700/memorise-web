import React, {useEffect, useRef} from 'react';
import './SubMenuReplay.scss';
import logger from "../../common/logger";
import Slider from "../_Tools/Slider";
import consts from "../../common/consts";
import Button from "../_Tools/Button";

const SubMenuReplay = ({ sliderTitle, replayCb, size, replayMsg, playSize }) => {

    const refSlider = useRef();

    const replay = () => {
        const val = refSlider.current.value();
        replayCb(val);
    };

    useEffect(() => {
        logger.trace('Play SubMenu - size changed - ', playSize);
        refSlider.current.set(playSize);
    }, [playSize]);

    return (
        <div className="sub-menu-replay">
            <div className="size-slider-container">
                <Slider ref={refSlider} min={consts.play.minCards} max={size} />
            </div>
            <div className="footline size-slider-foot">{sliderTitle}</div>
            <div className="replay-btn">
                <Button text={replayMsg} onClick={() => replay} />
            </div>
        </div>
    );
};
export default SubMenuReplay;
