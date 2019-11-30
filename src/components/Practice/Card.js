import React, { forwardRef, useImperativeHandle, useState } from 'react';
import './Card.scss';

const sideQ = 0;
const sideA = 1;

const Card = forwardRef((props, ref) => {
    const { q, a } = props;
    const [side, setSide] = useState(sideQ);

    useImperativeHandle(ref, () => ({
        rotate() {
            setSide(side === sideQ ? sideA : sideQ);
        }
    }));


    return (
        <div className="card-container">
            <div className="card">
                {side === sideQ &&
                    <p>{q}</p>
                }
                {side === sideA &&
                    <p>{a}</p>
                }
            </div>
        </div>
    );
});

export default Card;
