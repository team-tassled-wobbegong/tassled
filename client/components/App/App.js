import React, { useState } from 'react';
import './app.scss';

import NavBar from '../NavBar/NavBar';
import Hero from '../Hero/Hero';
import ChooseStack from '../ChooseStack/ChooseStack';
import CardsList from '../CardsList/CardsList';
import GitHubButton from '../GitHubButton';
import Faqs from '../Faqs/Faqs';

const cardsState = [
  {
    id: Math.random(),
    tech: 'React',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quos ducimus perferendis doloremque sed quia aperiam suscipit saepe dicta sit pariatur reprehenderit dolorum quod eum eligendi, quam recusandae id libero?',
    isSelected: false,
  },
  {
    id: Math.random(),
    tech: 'Redux',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quos ducimus perferendis doloremque sed quia aperiam suscipit saepe dicta sit pariatur reprehenderit dolorum quod eum eligendi, quam recusandae id libero?',
    isSelected: false,
  },
  {
    id: Math.random(),
    tech: 'Express',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quos ducimus perferendis doloremque sed quia aperiam suscipit saepe dicta sit pariatur reprehenderit dolorum quod eum eligendi, quam recusandae id libero?',
    isSelected: false,
  },
];

const App = () => {
  const [cards, setCards] = useState(cardsState);

  const toggleSelect = (id) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, isSelected: !card.isSelected } : card)),
    );
  };

  return (
    <div className="App">
      <NavBar />
      <main>
        <Hero />
        <ChooseStack>
          <CardsList cards={cards} toggleSelect={toggleSelect} />
        </ChooseStack>
      <Faqs />
      </main>
      <GitHubButton />
    </div>
  );
};

export default App;
