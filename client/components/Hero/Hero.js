import React from 'react';

import Logo from '../../svg/Logo';

const Hero = () => (
  <div className="Intro">
    <div className="left">
      <h1>Package your starter code in clicks, not hours</h1>
      <p className='hero-sub'>
        Create your customizable boilerplate code for your next full-stack project. Delivered to you
        in a Github repo.
      </p>
    </div>
    <div className="right">
      <Logo />
    </div>
  </div>
);

export default Hero;
