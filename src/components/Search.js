import React from "react";

const Search = ({ searchCapital, searchTerm, searchJSON, jsonSearchTerm }) => {
  String.prototype.turkishToLower = function () {
    let string = this;
    const letters = {
      İ: "i",
      I: "ı",
      Ş: "ş",
      Ğ: "ğ",
      Ü: "ü",
      Ö: "ö",
      Ç: "ç",
    };
    string = string.replace(/(([İIŞĞÜÇÖ]))/g, function (letter) {
      return letters[letter];
    });
    return string.toLowerCase();
  };

  return (
    <>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search for capital"
        value={searchTerm}
        className="mx-auto mt-5 w-50 text-center"
        onChange={(e) => {
          let value = e.target.value;
          searchCapital(value.turkishToLower());
        }}
      />
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search for JSON data"
        value={jsonSearchTerm}
        className="mx-auto w-50 mt-2 text-center"
        onChange={(e) => {
          let value = e.target.value;
          searchJSON(value.turkishToLower());
        }}
      />
    </>
  );
};

export default Search;
