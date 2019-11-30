import React from 'react';
import './Card.scss';

function Card(props) {
    const { q } = props;
    return (
        <div className="card-container">
            <div className="card">
                <p>{q}</p>
            </div>
        </div>
    );
}

export default Card;
