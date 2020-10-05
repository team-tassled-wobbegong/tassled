import React from 'react';

function SearchParams({ value, onChange }) {
  return (
    <div className="search-params">
      <h2>2. Name Your Repo</h2>
      <label htmlFor="repository">
        <input
          type="text"
          id="repository"
          value={value}
          placeholder="Repository Name"
          onChange={onChange}
        />
      </label>
    </div>
  );
}

export default SearchParams;
