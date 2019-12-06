import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import MaterialButton from '@material-ui/core/Button';
// import { green } from '@material-ui/core/colors';

const ColorButton = withStyles(theme => ({
    /*
    root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
     */
}))(MaterialButton);

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const Button = ({ type, text, onClick }) => {
    const classes = useStyles();
    const color = type === 'cancel' ? 'secondary' : 'primary';
    const style = {
        // backgroundColor: type === 'cancel' ? 'red' : 'green',
    };

    return (
        <div>
            <ColorButton onClick={onClick()} variant="contained" style={style} color={color} size="medium" fullWidth={true} className={classes.margin}>
                {text}
            </ColorButton>
        </div>
    );

};
export default Button;
