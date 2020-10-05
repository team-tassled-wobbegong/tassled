import React from 'react';

const NavBar = ({ connectToGitHub, user }) => (
  <div className="NavBar">
    <div className="left">Tasselled Wobbegong</div>
    <div className="right">
      <span onClick={connectToGitHub}>{user ? user.name : 'Login in with Github'}</span>
      {user ? <img src={user.avatar_url} /> : <i className="fab fa-github"></i>}
    </div>
  </div>
);

export default NavBar;
