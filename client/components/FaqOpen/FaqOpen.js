import React from 'react';

import Arrow from '../../svg/Arrow';

function FaqOpen({ faq, index, toggleFAQ }) {
  return (
    <div
      className={'faq ' + (faq.open ? 'open' : '')}
      key={index}
      onClick={() => toggleFAQ(index)}
      style={{ display: 'flex',  justifyContent: 'space-between', alignItems:'center'}}
    >
      <div className="left">
        <div className="faq-question">{faq.question}</div>
        <div className="faq-answer">{faq.answer}</div>
      </div>

      <div style={{ 
        transition: 'all 0.2s ease-out',
        transform: faq.open ? 'translateY(-50%) rotate(90deg)':''}}>
        <Arrow />
      </div>
    </div>
  );
}

export default FaqOpen;
