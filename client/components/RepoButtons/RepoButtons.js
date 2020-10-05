import React from 'react';
import Arrow from '../../svg/Arrow';
import Launch from '../../svg/Launch';

const RepoButtons = () => {
  return (
    <div className="repoButtons">
      <h2>3.Generate your boilerplate code.</h2>
      <button className="generateButton">
        <span>Generate Boilerplate Code</span> <Arrow />{' '}
      </button>
      <button className="launchButton">
        <span>Launch Boilerplate Code </span>
        <Launch />{' '}
      </button>
    </div>
  );
};

export default RepoButtons;
