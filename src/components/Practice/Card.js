import React, { forwardRef, useImperativeHandle, useState, useEffect, useCallback } from 'react';
import './Card.scss';

const Card = forwardRef(({ q, a, setCardInMove }, ref) => {
    const [currQ, setCurrQ] = useState(q);
    const [currA, setCurrA] = useState(a);
    const [nextQ, setNextQ] = useState(q);
    const [nextA, setNextA] = useState(a);
    const [showFront, setShowFront] = useState(true);
    const [showBack, setShowBack] = useState(false);
    const [inRotate, setInRotate] = useState(false);
    const [inSwitch, setInSwitch] = useState(false);
    const [inFade, setInFade] = useState(false);

    useImperativeHandle(ref, () => ({
        rotate() {
            // console.warn(`click ==> showFront=[${showFront}] - showBack=[${showBack}]`);
            setCardInMove(true);
            setInRotate(true);
            if (showFront) setShowFront(false);
            if (showBack) setShowBack(false);
        },
    }));

    useEffect(() => {
        setNextQ(q);
        setNextA(a);
        if (currQ !== q) { // Card switch (Only on 1st mount currQ and q are euqal)
            setCardInMove(true);
            setInSwitch(true);
        }
    }, [q, a, currQ, setCardInMove]);


    const setCardMoveEnded = useCallback(() => setCardInMove(false), [setCardInMove]);
    useEffect(() => {
        const setNextCard = () => {
            if (inSwitch && !inFade) {
                setInFade(true);
                setShowFront(true);
                setShowBack(false);
                setCurrQ(nextQ);
                setCurrA(nextA);
            } else if (inFade) {
                setInSwitch(false);
                setInFade(false);
                setCardMoveEnded();
            }
        };
        document.getElementById("game-card-in").addEventListener("transitionend", setNextCard);
        return () => {
            document.getElementById("game-card-in").removeEventListener("transitionend", setNextCard);
        }
    }, [inSwitch, inFade, nextA, nextQ, setCardMoveEnded]);

    useEffect(() => {
        const rotateCard = (side) => {
            if (inRotate) {
                setInRotate(false);
                side === 'front' && setShowBack(true);
                side === 'back' && setShowFront(true);
            } else {
                // rotate animation totally ended
                setCardMoveEnded();
            }
        };
        const rotateFront = () => rotateCard('front');
        const rotateBack = () => rotateCard('back');

        document.getElementById("game-card-front").addEventListener("transitionend", rotateFront);
        document.getElementById("game-card-back").addEventListener("transitionend", rotateBack);
        return () => {
            document.getElementById("game-card-front").removeEventListener("transitionend", rotateFront);
            document.getElementById("game-card-back").removeEventListener("transitionend", rotateBack);
        }
    }, [inRotate, setCardMoveEnded]);

    return (
        <div className="card-container">
            <div className="card-placeholder">
                <div id="game-card-front" className={`card ${!showFront ? 'card-hide' : ''} ${inSwitch ? 'no-rotate-anim' : ''} ${!currQ ? 'end-card' : ''}`}>
                    <p>{currQ}</p>
                </div>
                <div id="game-card-back" className={`card card-back ${!showBack ? 'card-hide' : ''} ${inSwitch ? 'no-rotate-anim' : ''}`}>
                    <p>{currA}</p>
                </div>
            </div>
            <div id="game-card-in" className={`next-card-placeholder ${inSwitch ? 'next-card-in' : ''} ${inFade ? 'next-card-fade' : ''}`}>
                <div id="game-card-front" className={`card next-card-shadow ${!q ? 'end-card' : ''}`}>
                    <p>{q}</p>
                </div>
            </div>
        </div>
    );
});

export default Card;
