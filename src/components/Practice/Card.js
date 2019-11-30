import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import './Card.scss';

let inRotate = false;

const Card = forwardRef((props, ref) => {
    const { q, a } = props;
    const [front, setFront] = useState(true);
    const [back, setBack] = useState(false);

    useImperativeHandle(ref, () => ({
        rotate() {
            // console.warn(`click ==> front=[${front}] - back=[${back}]`);
            inRotate = true;
            if (front) setFront(false);
            if (back) setBack(false);
        }
    }));

    useEffect(() => {
        document.getElementById("card-front").addEventListener("transitionend", () => {
            if (inRotate) {
                inRotate = false;
                setBack(true);
            }
        });
        document.getElementById("card-back").addEventListener("transitionend", () => {
            if (inRotate) {
                inRotate = false;
                setFront(true);
            }
        });
    });

    return (
        <div className="card-container">
            <div className="card-placeholder"></div>
            <div id="card-front" className={`card ${!front ? 'card-hide' : ''}`}>
                <p>{q}</p>
            </div>
            <div id="card-back" className={`card card-back ${!back ? 'card-hide' : ''}`}>
                <p>{a}</p>
            </div>
        </div>
    );
});

export default Card;
