import React from 'react';

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="legendary-search-box">
      <input
        type="text"
        className="legendary-search-input"
        placeholder="جستجوی نام کتاب (مثلاً: کد تمیز، معماری، الگوریتم)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;