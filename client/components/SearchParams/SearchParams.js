import React from 'react';

function SearchParams({ value, handleChange }) {
  return (
    <div className="search-params">
      <h2>2. Name your repo..</h2>
      <label htmlFor="repository">
        <input
          type="text"
          id="repository"
          value={value}
          placeholder="Repository Name"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default SearchParams;
