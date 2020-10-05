import React, { useState, useEffect } from 'react';
import './app.scss';

import NavBar from '../NavBar/NavBar';
import Hero from '../Hero/Hero';
import ChooseStack from '../ChooseStack/ChooseStack';
import CardsList from '../CardsList/CardsList';
import Faqs from '../Faqs/Faqs';
import SearchParams from '../SearchParams/SearchParams';
import RepoButtons from '../RepoButtons/RepoButtons';

const mockedUser = {
  login: 'jamesscaggs',
  id: 15598224,
  node_id: 'MDQ6VXNlcjE1NTk4MjI0',
  avatar_url: 'https://avatars1.githubusercontent.com/u/15598224?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/jamesscaggs',
  html_url: 'https://github.com/jamesscaggs',
  followers_url: 'https://api.github.com/users/jamesscaggs/followers',
  following_url: 'https://api.github.com/users/jamesscaggs/following{/other_user}',
  gists_url: 'https://api.github.com/users/jamesscaggs/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/jamesscaggs/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/jamesscaggs/subscriptions',
  organizations_url: 'https://api.github.com/users/jamesscaggs/orgs',
  repos_url: 'https://api.github.com/users/jamesscaggs/repos',
  events_url: 'https://api.github.com/users/jamesscaggs/events{/privacy}',
  received_events_url: 'https://api.github.com/users/jamesscaggs/received_events',
  type: 'User',
  site_admin: false,
  name: 'James Scaggs',
  company: null,
  blog: '',
  location: 'Dallas, Texas',
  email: 'james.scaggs@gmail.com',
  hireable: null,
  bio: null,
  twitter_username: null,
  public_repos: 33,
  public_gists: 28,
  followers: 9,
  following: 9,
  created_at: '2015-11-01T23:46:39Z',
  updated_at: '2020-10-05T16:56:23Z',
  full_object: {
    login: 'jamesscaggs',
    id: 15598224,
    node_id: 'MDQ6VXNlcjE1NTk4MjI0',
    avatar_url: 'https://avatars1.githubusercontent.com/u/15598224?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/jamesscaggs',
    html_url: 'https://github.com/jamesscaggs',
    followers_url: 'https://api.github.com/users/jamesscaggs/followers',
    following_url: 'https://api.github.com/users/jamesscaggs/following{/other_user}',
    gists_url: 'https://api.github.com/users/jamesscaggs/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/jamesscaggs/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/jamesscaggs/subscriptions',
    organizations_url: 'https://api.github.com/users/jamesscaggs/orgs',
    repos_url: 'https://api.github.com/users/jamesscaggs/repos',
    events_url: 'https://api.github.com/users/jamesscaggs/events{/privacy}',
    received_events_url: 'https://api.github.com/users/jamesscaggs/received_events',
    type: 'User',
    site_admin: false,
    name: 'James Scaggs',
    company: null,
    blog: '',
    location: 'Dallas, Texas',
    email: 'james.scaggs@gmail.com',
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 33,
    public_gists: 28,
    followers: 9,
    following: 9,
    created_at: '2015-11-01T23:46:39Z',
    updated_at: '2020-10-05T16:56:23Z',
  },
  access_token: '4c553972cd4fbe5830d9bd2cdc26efd2f43496b6',
};

const cardsState = [
  {
    id: Math.random(),
    tech: 'React',
    description:
      'React is the most popular front-end JavaScript library in the field of web development. Get the webpack and starter scripts to run your application.',
    isSelected: false,
  },
  {
    id: Math.random(),
    tech: 'Node',
    description:
      'Node.js is a JavaScript runtime built on Chrome’s V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient',
    isSelected: false,
  },
  {
    id: Math.random(),
    tech: 'Express',
    description:
      'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. APIs.',
    isSelected: false,
  },
  {
    id: Math.random(),
    tech: 'Jest',
    description:
      'Jest is a delightful JavaScript Testing Framework with a focus on simplicity. Jest manages metadata about your source code to run only the relevant test files when a source code file is changed.',
    isSelected: false,
  },
];

const App = () => {
  const [cards, setCards] = useState(cardsState);
  const [value, setValue] = useState('');
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDataBack, setIsDataBack] = useState(false);

  useEffect(() => {
    const accessToken = window.location.href.split('=')[1];

    if (accessToken) {
      setAccessToken(accessToken);
      setUser(mockedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const sendBack = () => {
    const selectedTechs = cards.filter((card) => card.isSelected).map((card) => card.tech);

    fetch(`/api/github/repos/create?access_token=${accessToken}`, {
      method: 'post',
      body: JSON.stringify({
        selectedTechs,
        accessToken,
        repoName: value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setIsDataBack(true);
      });
  };

  const toggleSelect = (id) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, isSelected: !card.isSelected } : card)),
    );
  };

  const handleChange = ({ target: { value } }) => setValue(value);

  const connectToGitHub = () => {
    const client_id = '9736e547efbf758aa0dc'; //from GH application settings area
    const redirect_uri = 'http://localhost:3000/api/oauth/callback/';
    const state = '9323bb9ce6934469b58303863f8c0d54'; //unique string, hard coded for now.
    const scope = 'scope=user%20public_repo';

    const params = `client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}&allow_signup=true`;

    window.location.replace(`https://github.com/login/oauth/authorize?${params}`);
  };

  return (
    <div className="App">
      <NavBar connectToGitHub={connectToGitHub} user={user} />
      <main>
        <Hero />
        <ChooseStack>
          <CardsList cards={cards} toggleSelect={toggleSelect} />
        </ChooseStack>

        <SearchParams value={value} onChange={handleChange} user={user} />
        <RepoButtons
          isLoggedIn={isLoggedIn}
          connectToGitHub={connectToGitHub}
          sendBack={sendBack}
          isDataBack={isDataBack}
        />

        <Faqs />
      </main>
    </div>
  );
};

export default App;
