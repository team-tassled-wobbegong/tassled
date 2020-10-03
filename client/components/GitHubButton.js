import React from 'react';

const connectToGitHub = () => {
  const client_id = '9736e547efbf758aa0dc'; //from GH application settings area
  const redirect_uri = 'http://localhost:3000/api/oauth/callback/';
  const state = '9323bb9ce6934469b58303863f8c0d54'; //unique string, hard coded for now.

  const params = `client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&allow_signup=true`;

  window.location.replace(`https://github.com/login/oauth/authorize?${params}`);
};

const GitHubButton = () => {
  return (
    <button type="button" onClick={() => connectToGitHub()}>
      Connect to GitHub
    </button>
  );
};

export default GitHubButton;
