import React, { useState } from 'react';
import FaqOpen from '../FaqOpen/FaqOpen'
import './Faqs.scss'

const Faqs = () => {

  // Setting state of accordion
  const [faqs, setFaqs] = useState([
    {
      question: 'How do I use Tesseled?',
      answer: `Simply choose the tech stack that you wish to have for your project, name your repo and click 'Create a Repo. The starter code will be created as a new repository in your Github account.`,
      open: true,
    },
    {
      question: 'What is the tech stack that I can generate with Tesseled?',
      answer: 'Currently, we have React, Express, Node and Jest. There will be more coming soon.' ,
      open: false,
    },
    {
      question: `What happens after I click 'Create a Repo'?`,
      answer: 'The starter code that you based on your selected tech stack will be created as a new repository in your Github account.',
      open: false,
    },
    {
      question: 'Can I use without a Github?',
      answer: 'As we will be creating a new repository in your account, we will need access to your Github account for authentication.',
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
      <h2>FAQs</h2>
      <div className='faqs'>
        {faqs.map((faq, i) => (
          <FaqOpen faq={faq} index={i} toggleFAQ={toggleFAQ} />
        ))}
      </div>
    </div>

  )
}

export default Faqs