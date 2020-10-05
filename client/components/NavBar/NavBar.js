import React from 'react';

const NavBar = ({ connectToGitHub }) => (
  <div className="NavBar">
    <div className="left">[Tesseled]</div>
    <div className="right">
      <span onClick={connectToGitHub}>Login in with Github</span>
      <i className="fab fa-github"></i>
    </div>
  </div>
);

export default NavBar;
