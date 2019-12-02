import React, {forwardRef, useImperativeHandle, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialSlider from '@material-ui/core/Slider';
import consts from "../../common/consts";


const MySlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(MaterialSlider);


const Slider = forwardRef(({ min, max }, ref) => {
    const defaultVal = max > 0 && max < consts.play.defaultCardsNum ? max : consts.play.defaultCardsNum;
    const [val, setVal] = useState(defaultVal);
    const minVal = min >= max ? 1 : min;

    useImperativeHandle(ref, () => ({
        value() {
            return val;
        },
    }));

    const valueChanged = (props) => {
        const val = Number(props.target.innerText);
        setVal(val);
    };

    return (
        <div>
            <MySlider onChangeCommitted={valueChanged} valueLabelDisplay="auto" aria-label="pretto slider"
                      min={minVal} max={max} defaultValue={defaultVal}/>
        </div>
    );

});
export default Slider;
