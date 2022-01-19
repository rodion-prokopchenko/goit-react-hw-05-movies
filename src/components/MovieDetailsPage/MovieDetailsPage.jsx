import react, { useEffect, useState } from "react";
import { useLocation, useParams, Outlet, NavLink } from "react-router-dom";
import { fetchMovieDetails } from "../AppFetch/AppFetch";

const MovieDetailsPage = () => {
  const params = useParams();

  const [film, setFilm] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchMovieDetails(params.movieId).then((responce) => {
      console.log(responce);
      setFilm(responce);
      setGenres(responce.genres);
    });
  }, []);

  return (
    <>
      <h2>
        Тут будет фильм {params.movieId} {film.title} по которому ты клацнул
      </h2>
      <section>
        <button type="button">Go back</button>
        <h2>{film.original_title}</h2>
        <div>
          <div>
            {film.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt="film poster"
                width="250px"
              />
            )}
          </div>
          <div>
            <p>Average score {film.vote_average}</p>
            <h3>Overview</h3>
            <p>{film.overview}</p>
            <p>release date {film.release_date}</p>
            <h4>Genres</h4>
            <ul>
              {genres.length > 0 &&
                genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
            </ul>
          </div>
        </div>
        <div>
          <h3>Additional information</h3>
          <ul>
            <li>
              <NavLink to={`cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`reviews`}>Reviews </NavLink>
            </li>
          </ul>
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default MovieDetailsPage;

// async () => {
//   fetchMovieDetails(params.movieId)
//     .then((data) => {
//       setDetails(data);
//     })
//     .catch((error) => console.log(error));
// };
