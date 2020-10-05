import React from 'react';

const connectToGitHub = () => {
  const clientId = '9736e547efbf758aa0dc'; // from GH application settings area
  const redirectURI = 'http://localhost:3000/api/oauth/callback/';
  const state = '9323bb9ce6934469b58303863f8c0d54'; // unique string, hard coded for now.
  const scope = 'scope=user%20public_repo';

  const params = `client_id=${clientId}&redirect_uri=${redirectURI}&state=${state}&scope=${scope}&allow_signup=true`;

  window.location.replace(`https://github.com/login/oauth/authorize?${params}`);
};
const createRepos = () => {
  fetch(
    'http://localhost:3000/api/github/repos/create?access_token=ecb0501864a6bb7f8b26a3354ad086d8c7f1c702',
    {
      mode: 'no-cors',
      method: 'POST',
    },
  ).then((res) => console.log(res));
};

const GitHubButton = () => {
  return (
    <>
      <button type="button" onClick={() => connectToGitHub()}>
        Connect to GitHub
      </button>
      <button type="button" onClick={() => createRepos()}>
        Repos
      </button>
    </>
  );
};

export default GitHubButton;
