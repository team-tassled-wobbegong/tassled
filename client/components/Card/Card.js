import React from 'react';

const Card = ({ tech, description, isSelected, toggleSelect }) => (
  <div
    className="Card"
    style={{ border: `1px solid ${isSelected ? '#e5e5e5' : 'transparent'}` }}
    onClick={toggleSelect}
  >
    <div className="title">
      <span>{tech}</span>
      {isSelected && <i className="fas fa-check-circle"></i>}
    </div>
    <p className="description">{description}</p>
  </div>
);

export default Card;
