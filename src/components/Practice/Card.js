import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import './Card.scss';

let inRotate = false;
let inSwitch = false;
let switchQ, switchA;

const Card = forwardRef(({ q, a }, ref) => {
    const [currQ, setCurrQ] = useState(q);
    const [currA, setCurrA] = useState(a);
    const [showFront, setShowFront] = useState(true);
    const [showBack, setShowBack] = useState(false);
    const [inFade, setInFade] = useState(false);

    useImperativeHandle(ref, () => ({
        rotate() {
            // console.warn(`click ==> showFront=[${showFront}] - showBack=[${showBack}]`);
            inRotate = true;
            if (showFront) setShowFront(false);
            if (showBack) setShowBack(false);
        },
        switch(q, a) {
            console.warn('card replaced');
            inSwitch = true;
            switchQ = q;
            switchA = a;
        }
    }));
    /*
    useEffect(() => {
            console.warn('card replaced');
            inSwitch = true;
    }, [q, a]);
     */

    useEffect(() => {
        document.getElementById("game-card-front").addEventListener("transitionend", () => {
            if (inRotate) {
                inRotate = false;
                setShowBack(true);
            }
        });
        document.getElementById("game-card-back").addEventListener("transitionend", () => {
            if (inRotate) {
                inRotate = false;
                setShowFront(true);
            }
        });
        document.getElementById("game-card-in").addEventListener("transitionend", () => {
            if (inSwitch && !inFade) {
                console.warn('set in fade')
                setInFade(true);
                setShowFront(true);
                setShowBack(false);
                setCurrQ(switchQ);
                setCurrA(switchA);
            } else if (inFade) {
                console.warn('set out fade')
                inSwitch = false;
                setInFade(false);
            }
        });
    }, [inFade]);

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
