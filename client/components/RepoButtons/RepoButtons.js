import React, { useState } from 'react';
import Arrow from '../../svg/Arrow';
import Launch from '../../svg/Launch';

const RepoButtons = ({ isLoggedIn, connectToGitHub, sendBack, isDataBack }) => {
  const handleClick = () => {
    if (!isLoggedIn) {
      connectToGitHub();
    } else {
      sendBack();
    }
  };

  return (
    <div className="repoButtons">
      <h2>3. Generate your boilerplate code</h2>
      <button onClick={handleClick} className="generateButton" disabled={isDataBack}>
        <span>{isLoggedIn ? 'Create new repo' : 'Login to Github'}</span>
      </button>

      {isDataBack && (
        <button className="launchButton">
          <span>View new repo</span>
        </button>
      )}
    </div>
  );
};

/**
 * not login
 * -> show blue button, but in disabled mode / do not show green one
 * login
 * -> show blue button / do not show green one
 *
 * hit blue button
 * -> when we receives stuff from github, show green button and hide blue button
 */

/**
 * not login
 * button text "please login"
 * login
 * button text "generate boilerplate"
 */

export default RepoButtons;
