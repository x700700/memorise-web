import React, { forwardRef, useImperativeHandle, useState, useEffect, useCallback } from 'react';
import './Card.scss';
import {useSelector} from "react-redux";
import {isRtl} from "../../common/utils";

const Card = forwardRef(({ q, a, setCardInMove }, ref) => {
    useImperativeHandle(ref, () => ({
        rotate() {
            _rotate();
        },
    }));

    const [currQ, setCurrQ] = useState(q);
    const [currA, setCurrA] = useState(a);
    const [nextQ, setNextQ] = useState(q);
    const [nextA, setNextA] = useState(a);
    const [showFront, setShowFront] = useState(true);
    const [showBack, setShowBack] = useState(false);
    const [isRotateStarted, setIsRotateStarted] = useState(false);
    const [isRotate, setIsRotate] = useState(false);
    const [inSwitch, setInSwitch] = useState(false);
    const [inFade, setInFade] = useState(false);
    const showMenu = useSelector(state => state.app.showMenu);

    const _rotate = () => {
        // console.warn(`click ==> showFront=[${showFront}] - showBack=[${showBack}]`);
        if (!isRotate && !showMenu) {
            setCardInMove(true);
            setIsRotateStarted(true);
            setIsRotate(true);
            if (showFront) setShowFront(false);
            if (showBack) setShowBack(false);
        }
    };

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
            if (isRotateStarted) {
                setIsRotateStarted(false);
                side === 'front' && setShowBack(true);
                side === 'back' && setShowFront(true);
            } else {
                // rotate animation totally ended
                setIsRotate(false);
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
    }, [isRotateStarted, setCardMoveEnded]);

    const styleTextQ = {
        direction: isRtl(currQ) ? 'rtl' : 'ltr',
    };
    const styleTextA = {
        direction: isRtl(currA) ? 'rtl' : 'ltr',
    };
    const styleTextNextQ = {
        direction: isRtl(q) ? 'rtl' : 'ltr',
    };

    return (
        <div className="card-desktop-container">
            <div className="card-container">
                <div className={`card-placeholder ${isRotate ? 'disable-pointer' : ''}`} onClick={() => _rotate()}>
                    <div id="game-card-front" className={`card ${!showFront ? 'card-hide' : ''} ${inSwitch ? 'no-rotate-anim' : ''} ${!currQ ? 'end-card' : ''}`}>
                        <p style={styleTextQ}>{currQ}</p>
                    </div>
                    <div id="game-card-back" className={`card card-back ${!showBack ? 'card-hide' : ''} ${inSwitch ? 'no-rotate-anim' : ''}`}>
                        <p style={styleTextA}>{currA}</p>
                    </div>
                </div>
                <div id="game-card-in" className={`next-card-placeholder ${inSwitch ? 'next-card-in' : ''} ${inFade ? 'next-card-fade' : ''}`}>
                    <div id="game-card-front" className={`card next-card-shadow ${!q ? 'end-card' : ''}`}>
                        <p style={styleTextNextQ}>{q}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Card;
