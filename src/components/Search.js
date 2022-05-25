import React from "react";

const Search = ({ searchCapital, searchTerm, searchJSON, jsonSearchTerm }) => {
  return (
    <>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search for capital"
        value={searchTerm}
        className="mx-auto mt-5 w-50 text-center"
        onChange={(e) => searchCapital(e.target.value)}
      />
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search for JSON data"
        value={jsonSearchTerm}
        className="mx-auto w-50 mt-2 text-center"
        onChange={(e) => searchJSON(e.target.value)}
      />
    </>
  );
};

export default Search;