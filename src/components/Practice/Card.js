import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import './Card.scss';

let gameCardInRotate = false;
let gameCardInSwitch = false;
let gameCardInFade = false;

const Card = forwardRef(({ q, a }, ref) => {
    const [currQ, setCurrQ] = useState(q);
    const [currA, setCurrA] = useState(a);
    const [nextQ, setNextQ] = useState(q);
    const [nextA, setNextA] = useState(a);
    const [showFront, setShowFront] = useState(true);
    const [showBack, setShowBack] = useState(false);
    const [inFade, setInFade] = useState(false);

    useImperativeHandle(ref, () => ({
        rotate() {
            console.warn(`click ==> showFront=[${showFront}] - showBack=[${showBack}]`);
            gameCardInRotate = true;
            if (showFront) setShowFront(false);
            if (showBack) setShowBack(false);
        },
    }));

    const setNextCard = () => {
        console.warn('anime ended ', gameCardInSwitch, gameCardInFade);
        if (gameCardInSwitch && !gameCardInFade) {
            console.warn('set in fade')
            gameCardInFade = true;
            setInFade(true);
            setShowFront(true);
            setShowBack(false);
            console.warn('nextQQQQQ = ', nextQ);
            setCurrQ(nextQ);
            setCurrA(nextA);

        } else if (gameCardInFade) {
            console.warn('set out fade')
            gameCardInSwitch = false;
            gameCardInFade = false;
            setInFade(false);
        } else {
            gameCardInSwitch = false;
        }
    };

    useEffect(() => {
        if (true) {
            console.warn('card replaced - ', q, a);
            setNextQ(q);
            setNextA(a);
            gameCardInSwitch = true;
        }
    }, [q, a]);

    useEffect(() => {
        document.getElementById("game-card-in").addEventListener("transitionend", setNextCard);
        return () => {
            document.getElementById("game-card-in").removeEventListener("transitionend", setNextCard);
        }
    }, [gameCardInSwitch, gameCardInFade, nextQ, nextA]);

    useEffect(() => {
        console.warn('******* loading')
        document.getElementById("game-card-front").addEventListener("transitionend", () => {
            if (gameCardInRotate) {
                gameCardInRotate = false;
                setShowBack(true);
            }
        });
        document.getElementById("game-card-back").addEventListener("transitionend", () => {
            if (gameCardInRotate) {
                gameCardInRotate = false;
                setShowFront(true);
            }
        });
    }, []);

    return (
        <div className="card-container">
            <div className="card-placeholder">
                <div id="game-card-front" className={`card ${!showFront ? 'card-hide' : ''} ${gameCardInSwitch ? 'no-rotate-anim' : ''}`}>
                    <p>{currQ}</p>
                </div>
                <div id="game-card-back" className={`card card-back ${!showBack ? 'card-hide' : ''} ${gameCardInSwitch ? 'no-rotate-anim' : ''}`}>
                    <p>{currA}</p>
                </div>
            </div>
            <div id="game-card-in" className={`next-card-placeholder ${gameCardInSwitch ? 'next-card-in' : ''} ${inFade ? 'next-card-fade' : ''}`}>
                <div id="game-card-front" className="card">
                    <p>{q}</p>
                </div>
            </div>
        </div>
    );
});

export default Card;
