import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import MaterialButton from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';

const ColorButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(MaterialButton);
const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const Button = ({ text, onClick }) => {
    const classes = useStyles();

    return (
        <div>
            <ColorButton onClick={onClick()} variant="contained" color="primary" size="medium" fullWidth={true} className={classes.margin}>
                {text}
            </ColorButton>
        </div>
    );

};
export default Button;
