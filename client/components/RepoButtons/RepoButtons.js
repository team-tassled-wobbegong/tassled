import React, { useState } from 'react';

const RepoButtons = ({ isLoggedIn, connectToGitHub, sendBack, isDataBack, repoLink }) => {
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
          <span>
            <a style={{ textDecoration: 'none' }} href={repoLink} target="_">
              View new repo
            </a>
          </span>
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
