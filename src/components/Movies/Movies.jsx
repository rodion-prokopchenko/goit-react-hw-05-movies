import react, { useEffect, useState, lazy, useRef } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigatem,
  Link,
  useNavigate,
} from "react-router-dom";
import { fetchSearching } from "../AppFetch/AppFetch";
import SearchBar from "./SearchBar";
import MoviesSearching from "./MoviesSearhing";

export default function Movies() {
  const [films, setFilms] = useState("");
  const [Search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  function onSubmit(e) {
    if (e === "" && location.search === null) {
      return;
    }
    setSearch(e);
    fetchSearching(e)
      .then((data) => {
        console.log(data);
        if (data.length === 0) {
          alert("Пусто");
          return;
        }

        console.log("dobavili");
        setFilms(data.results);

        console.log(films);
      })
      .then(navigate({ ...location, search: `query=${e}` }))
      .catch((error) => {
        alert(error.message);
      });
  }

  useEffect(() => {
    if (!location.search) {
      return;
    }
    fetchSearching(location.search.substr(7))
      .then((data) => setFilms(data.results))
      .catch((error) => {
        alert(error.message);
      });
    console.log(location.search.substr(7));
  }, []);
  return (
    <section>
      <SearchBar onSubmit={onSubmit} />

      <ul>
        {films !== "" &&
          films.map((films) => (
            <li key={films.id}>
              <Link to={`/movies/${films.id}`} state={{ from: location }}>
                {films.title}
              </Link>
            </li>
          ))}
      </ul>
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
