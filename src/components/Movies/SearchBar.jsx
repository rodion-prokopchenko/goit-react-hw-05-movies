import react, { useState } from "react";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  function handleChange(event) {
    setQuery(event.target.value.toLowerCase());
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (query.trim() === "") {
      alert("Write something");
      return;
    }
    onSubmit(query);
    setQuery("");
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название фильма"
          onChange={handleChange}
          value={query}
        />
        <button type="button" onClick={handleSubmit}>
          Поиск
        </button>
      </form>
    </>
  );
};
export default SearchBar;
