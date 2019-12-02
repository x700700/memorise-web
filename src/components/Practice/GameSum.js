import React, { forwardRef } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';

import './GameSum.scss';

const ColorButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);
const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const GameSum = forwardRef(({ cardsNum, playsNum, replayGame }, ref) => {
    const classes = useStyles();

    return (
        <div className="game-sum-container">
            <div className="sum-col">
                <div className="stats">
                    <p>{cardsNum} cards played</p>
                    <p>{playsNum - cardsNum} flips flew</p>
                </div>
                <div className="btns-container">
                    <div className="btns-replay">
                        <ColorButton onClick={replayGame()} variant="contained" color="primary" className={classes.margin}>
                            Replay
                        </ColorButton>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default GameSum;
