import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MaterialSlider from '@material-ui/core/Slider';
import consts from "../../common/consts";
import {purple} from "@material-ui/core/colors";


const Slider = forwardRef(({ color, min, max }, ref) => {
    useImperativeHandle(ref, () => ({
        value() {
            return val;
        },
        set(value) {
            setVal(value);
        }
    }));

    const useStyles = makeStyles({
        root: {
            color: color ? color[200] : purple[200],
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
        active: {
        },
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
    });

    const defaultVal = max > 0 && max < consts.play.defaultCardsNum ? max : consts.play.defaultCardsNum;
    const [val, setVal] = useState(defaultVal);
    const minVal = min >= max ? 1 : min;

    const valueChanged = (event, value) => {
        setVal(value);
    };

    const classes = useStyles();
    return (
        <div>
            <MaterialSlider valueLabelDisplay="auto" min={minVal} max={max}
                            value={val} onChange={valueChanged}
                            classes={{
                                root: classes.root,
                                thumb: classes.thumb,
                                active: classes.active,
                                valueLabel: classes.valueLabel,
                                track: classes.track,
                                rail: classes.rail,
                            }}
            />
        </div>
    );
});
export default Slider;
