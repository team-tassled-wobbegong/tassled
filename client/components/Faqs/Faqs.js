import React, { useState } from 'react';
import FaqOpen from '../FaqOpen/FaqOpen'
import './Faqs.scss'

const Faqs = () => {

  // Setting state of accordion
  const [faqs, setFaqs] = useState([
    {
      question: 'How do I use Tesseled?',
      answer: 'in 3 steps',
      open: true,
    },
    {
      question: 'What is the tech stack that I can generate with Tesseled?',
      answer: 'list steps',
      open: false,
    },
    {
      question: 'What happens after I click generate?',
      answer: 'check your github',
      open: false,
    },
    {
      question: 'Can I use without a github?',
      answer: 'No',
      open: false,
    },

  ]);

  const toggleFAQ = (index) => {
    setFaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open;
      } else {
        faq.open = false;
      }
      return faq;
    }))
  }

  return (
    <div className='faqs-wrapper'>
      <h1>FAQs</h1>
      <div className='faqs'>
        {faqs.map((faq, i) => (
          <FaqOpen faq={faq} index={i} toggleFAQ={toggleFAQ} />
        ))}
      </div>
    </div>

  )
}

export default Faqs