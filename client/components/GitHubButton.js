import React from 'react';

const connectToGitHub = () => {
  // INSECURE, hard coded for now
  window.location.replace(
    `https://github.com/login/oauth/authorize?client_id=c50696694ea26b1a4aa8&redirect_uri=http://localhost:3000/api/callback/auth_code&state=9323bb9ce6934469b58303863f8c0d54&allow_signup=true`,
  );
};

const GitHubButton = () => {
  return (
    <button type="button" onClick={() => connectToGitHub()}>
      Connect to GitHub
    </button>
  );
};

export default GitHubButton;
