import React from 'react';

import Card from '../Card/Card';

const CardsList = ({ cards, toggleSelect }) => {
  return (
    <div className="CardsList">
      {cards.map((card) => (
        <Card key={Math.random()} {...card} toggleSelect={() => toggleSelect(card.id)} />
      ))}
    </div>
  );
};

export default CardsList;
