import { withStyles } from '@material-ui/core/styles';
import MaterialSwitch from '@material-ui/core/Switch';
import { green } from '@material-ui/core/colors';
import { yellow } from '@material-ui/core/colors';

export const ColorSwitchYellow = withStyles(theme => ({
    switchBase: {
        color: yellow[300],
        '&$checked': {
            color: yellow[500],
            transform: 'translate(24px, .7px)',
        },
        '&$checked + $track': {
            backgroundColor: yellow[500],
        },
        thumb: {
            width: 26,
            height: 26,
        },
        padding: 2,
        transform: 'translateY(.7px)',
    },
    root: {
        width: 50,
        height: 26,
        padding: 0,
        margin: theme.spacing(1.5),
    },
    checked: {},
    track: {
        borderRadius: 26 / 2,
        // border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: '#dddddd',
    },
}))(MaterialSwitch);

export const ColorSwitchGreen = withStyles(theme => ({
    switchBase: {
        color: green[300],
        '&$checked': {
            color: green[500],
            transform: 'translate(24px, .7px)',
        },
        '&$checked + $track': {
            backgroundColor: green[500],
        },
        thumb: {
            width: 26,
            height: 26,
        },
        padding: 2,
        transform: 'translateY(.7px)',
    },
    root: {
        width: 50,
        height: 26,
        padding: 0,
        margin: theme.spacing(1.5),
    },
    checked: {},
    track: {
        borderRadius: 26 / 2,
        // border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: '#dddddd',
    },
}))(MaterialSwitch);

