import react, { useEffect, useState, lazy, Suspense } from "react";
import {
  useNavigate,
  useLocation,
  useParams,
  NavLink,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { fetchMovieDetails } from "../AppFetch/AppFetch";

const MovieDetailsPage = () => {
  const Cast = lazy(() => import("../Cast/Cast"));
  const Reviews = lazy(() => import("../Reviews/Reviews"));

  const location = useLocation();
  const navigation = useNavigate();
  const { movieId } = useParams();
  console.log(movieId);

  const [film, setFilm] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchMovieDetails(movieId).then((responce) => {
      console.log(responce);
      setFilm(responce);
      setGenres(responce.genres);
    });
  }, []);

  const onGoBack = () => {
    navigation(location?.state?.from ?? "/");
  };

  return (
    <>
      <section>
        <button type="button" onClick={onGoBack}>
          Go back
        </button>
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
              <NavLink
                to={`cast`}
                state={{ from: location?.state?.from ?? "/" }}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`reviews`}
                state={{ from: location?.state?.from ?? "/" }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
      </section>
      {/* <Suspense fallback={<h2>...loading</h2>}>
        <Routes>
          <Route path="/movies/:movieId/cast" element={<Cast />}></Route>
          <Route path="/movies/:movieId/reviews" element={<Reviews />}></Route>
        </Routes>
      </Suspense> */}
    </>
  );
};

export default MovieDetailsPage;
