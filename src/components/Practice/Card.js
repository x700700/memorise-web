import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import './Card.scss';

const Card = forwardRef(({ q, a }, ref) => {
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
            setInRotate(true);
            if (showFront) setShowFront(false);
            if (showBack) setShowBack(false);
        },
    }));

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
        }
    };

    useEffect(() => {
        setNextQ(q);
        setNextA(a);
        if (currQ !== q) { // If it's not the 1st mount then it's a card switch
            setInSwitch(true);
        }
    }, [q, a]);

    useEffect(() => {
        document.getElementById("game-card-in").addEventListener("transitionend", setNextCard);
        return () => {
            document.getElementById("game-card-in").removeEventListener("transitionend", setNextCard);
        }
    }, [inSwitch, inFade, nextQ, nextA]);

    const rotateFront = () => {
        if (inRotate) {
            setInRotate(false);
            setShowBack(true);
        }
    };
    const rotateBack = () => {
        if (inRotate) {
            setInRotate(false);
            setShowFront(true);
        }
    };
    useEffect(() => {
        document.getElementById("game-card-front").addEventListener("transitionend", rotateFront);
        document.getElementById("game-card-back").addEventListener("transitionend", rotateBack);
        return () => {
            document.getElementById("game-card-front").removeEventListener("transitionend", rotateFront);
            document.getElementById("game-card-back").removeEventListener("transitionend", rotateBack);
        }
    }, [inRotate]);

    return (
        <div className="card-container">
            <div className="card-placeholder">
                <div id="game-card-front" className={`card ${!showFront ? 'card-hide' : ''} ${inSwitch ? 'no-rotate-anim' : ''}`}>
                    <p>{currQ}</p>
                </div>
                <div id="game-card-back" className={`card card-back ${!showBack ? 'card-hide' : ''} ${inSwitch ? 'no-rotate-anim' : ''}`}>
                    <p>{currA}</p>
                </div>
            </div>
            <div id="game-card-in" className={`next-card-placeholder ${inSwitch ? 'next-card-in' : ''} ${inFade ? 'next-card-fade' : ''}`}>
                <div id="game-card-front" className="card">
                    <p>{q}</p>
                </div>
            </div>
        </div>
    );
});

export default Card;
