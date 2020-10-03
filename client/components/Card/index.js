import React from 'react';

const Card = ({ tech, description, isSelected, toggleSelect }) => (
  <div
    className="Card"
    style={{ border: `1px solid ${isSelected ? '#e5e5e5' : 'transparent'}` }}
    onClick={toggleSelect}
  >
    <div className="title">{tech}</div>
    <p>{description}</p>
  </div>
);

export default Card;
