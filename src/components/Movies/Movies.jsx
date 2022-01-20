import react, { useEffect, useState, lazy, useRef } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { fetchSearching } from "../AppFetch/AppFetch";
import SearchBar from "./SearchBar";
import MoviesSearching from "./MoviesSearhing";

export default function Movies() {
  const [films, setFilms] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  function onSubmit(e) {
    if (e === "") {
      return;
    }

    fetchSearching(e)
      .then(navigate({ ...location, search: `query=${e}` }))
      .then((data) => {
        console.log(data);
        if (data.length === 0) {
          alert("Пусто");
          return;
        }

        console.log("dobavili");
        setFilms(data);

        console.log(films);
      })

      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <section>
      <SearchBar onSubmit={onSubmit} />
      <MoviesSearching films={films} />
    </section>
  );
}

// const onButton = (e) => {
//   e.preventDefault();
//   if (query.trim() === "") {
//     alert("Write something");
//     return;
//   }

//   fetchSearching(query)
//     // .then((data) => console.log(data.results))
//     .then((data) => {
//       console.log(data.results);
//       if (data.results.length === 0) {
//         alert("Пусто");
//         return;
//       }
//       if (data.results.length > 0) {
//         setFilms(data.results);
//       }
//     })
//     // .then((data) => setFilms(data.results))
//     .then(navigation({ ...location, search: `query=${query}` }))
//     .catch((error) => {
//       alert(error.message);
//     });
// };
