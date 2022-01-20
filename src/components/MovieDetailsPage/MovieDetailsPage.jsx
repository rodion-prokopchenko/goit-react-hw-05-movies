import react, { useEffect, useState, lazy, Suspense } from "react";
import {
  useNavigate,
  useLocation,
  useParams,
  Outlet,
  Link,
  NavLink,
  Route,
  useMatch,
  Routes,
} from "react-router-dom";
import { fetchMovieDetails } from "../AppFetch/AppFetch";
// import Cast from "../Cast/Cast";
// import ReviewsList from "../Reviews/Reviews";

const MovieDetailsPage = () => {
  const Cast = lazy(() => import("../Cast/Cast"));
  const Reviews = lazy(() => import("../Reviews/Reviews"));

  const location = useLocation();
  const navigation = useNavigate();
  const { movieId } = useParams();

  // const { path } = useMatch();
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

  // useEffect(() => {
  //   if (location.pathname.includes("cast")) {
  //     setNavNumber((prevState) => navNumber - 1);
  //     return;
  //   }
  //   if (location.pathname.includes("reviews")) {
  //     setNavNumber((prevState) => navNumber - 1);
  //     return;
  //   }
  // }, [location.pathname]);

  setTimeout(() => {
    console.log(location);
  }, 1000);

  const onGoBack = () => {
    navigation(location.state.from);
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
                to={{
                  pathname: `${location.pathname}/cast`,
                  state: {
                    from: location?.state?.from ?? "/",
                  },
                }}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${location.pathname}/reviews`,
                  state: {
                    from: location?.state?.from ?? "/",
                  },
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
      </section>
      <Suspense fallback={<h2>Загружаю...</h2>}>
        <Routes>
          <Route path={`${location.pathname}/cast`} element={<Cast />}></Route>
          <Route
            path={"/movies/:movieId/reviews"}
            element={<Reviews />}
          ></Route>
        </Routes>
      </Suspense>
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
