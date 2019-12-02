import React, {forwardRef, useEffect, useState} from 'react';
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

const GameSum = forwardRef(({ setStats, cardsNum, playsNum, replayGame }, ref) => {
    const classes = useStyles();
    const [cards, setCards] = useState(0);
    const [plays, setPlays] = useState(0);

    useEffect(() => {
        if (setStats) {
            setCards(cardsNum);
            setPlays(playsNum);
        }
    }, [setStats, cardsNum, playsNum]);

    return (
        <div className="game-sum-container">
            <div className="sum-col">
                <div className="stats">
                    <p>{cards} cards played</p>
                    <p>{plays - cards} misses done</p>
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
