import React, { useState } from 'react';

function SearchParams() {
  const [repository, setRepository] = useState('');
  return (
    <div className="search-params">
      <h2>2. Name Your Repo</h2>
      <label htmlFor="repository">
        <input
          type="text"
          id="repository"
          value={repository}
          placeholder="Repository Name"
          onChange={(e) => setRepository(e.target.value)}
        />
      </label>
    </div>
  );
}

export default SearchParams;
