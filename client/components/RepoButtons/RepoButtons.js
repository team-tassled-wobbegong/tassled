import React from 'react';

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
      <button type="button" onClick={handleClick} className="generateButton" disabled={isDataBack}>
        <span>{isLoggedIn ? 'Create new repo' : 'Login to Github'}</span>
      </button>

      {isDataBack && (
        <button type="button" className="launchButton" style={{ marginTop: '1rem' }}>
          <span>
            <a style={{ textDecoration: 'none', color: 'white' }} href={repoLink} target="_">
              View new repo
            </a>
          </span>
        </button>
      )}
    </div>
  );
};

export default RepoButtons;
