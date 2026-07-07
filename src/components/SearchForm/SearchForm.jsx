import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({ onSearchSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <form className="search-field" onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        className="search-field__input"
        placeholder="Enter topic"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        required
      />
      <button type="submit" className="search-field__button">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
