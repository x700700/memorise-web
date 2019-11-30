import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import './Card.scss';

let inRotate = false;
let inSwitch = false;
let switchQ, switchA;

const Card = forwardRef(({ q, a }, ref) => {
    const [front, setFront] = useState(true);
    const [back, setBack] = useState(false);
    const [currQ, setCurrQ] = useState(q);
    const [currA, setCurrA] = useState(a);
    const [inFade, setInFade] = useState(false);

    useImperativeHandle(ref, () => ({
        rotate() {
            // console.warn(`click ==> front=[${front}] - back=[${back}]`);
            inRotate = true;
            if (front) setFront(false);
            if (back) setBack(false);
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
                setBack(true);
            }
        });
        document.getElementById("game-card-back").addEventListener("transitionend", () => {
            if (inRotate) {
                inRotate = false;
                setFront(true);
            }
        });
        document.getElementById("game-card-in").addEventListener("transitionend", () => {
            if (inSwitch && !inFade) {
                console.warn('=====> replacing values - ', q);
                setInFade(true);
                setFront(true);
                setBack(false);
                setCurrQ(switchQ);
                setCurrA(switchA);
            } else if (inFade) {
                inSwitch = false;
                setInFade(false);
            }
        });
    });

    return (
        <div className="card-container">
            <div className="card-placeholder">
                <div id="game-card-front" className={`card ${!front ? 'card-hide' : ''}`}>
                    <p>{currQ}</p>
                </div>
                <div id="game-card-back" className={`card card-back ${!back ? 'card-hide' : ''}`}>
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
