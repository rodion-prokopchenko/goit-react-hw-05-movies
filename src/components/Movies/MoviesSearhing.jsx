import react, { useEffect } from "react";
import { Link } from "react-router-dom";

const MoviesSearching = ({ films }) => {
  useEffect(() => {
    console.log(films.map((film) => film));
  }, [films]);

  return (
    <ul>
      {films.map((films) => {
        <li key={films.id}>
          <Link to={`/movies${films.id}`}>{films.title}</Link>
        </li>;
      })}
    </ul>
  );
};
export default MoviesSearching;
