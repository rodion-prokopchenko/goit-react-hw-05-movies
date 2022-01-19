import "./App.css";
import {
  fetchSearching,
  fetchMovieCredits,
  fetchMovieReviews,
} from "./components/AppFetch/AppFetch.jsx";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";

export default function App() {
  const HomePage = lazy(() => import("./components/HomeView/HomeView"));
  const Navigation = lazy(() => import("./components/Navigation/Navigation"));
  const Movies = lazy(() => import("./components/Movies/Movies"));
  const MovieDetails = lazy(() =>
    import("./components/MovieDetailsPage/MovieDetailsPage")
  );
  const Cast = lazy(() => import("./components/Cast/Cast"));
  const Reviews = lazy(() => import("./components/Reviews/Reviews"));

  const location = useLocation();
  const history = useNavigate();

  const { queary, setQueary } = useState("");

  const NotFound = () => {
    return <h2>Not Found</h2>;
  };

  return (
    <>
      <Suspense fallback={<h2>Загружаю...</h2>}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/:movies" element={<Movies />}></Route>
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="/movies/:movieId/cast" element={<Cast />}></Route>
            <Route
              path="/movies/:movieId/reviews"
              element={<Reviews />}
            ></Route>
          </Route>

          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );

  // <Suspense fallback="">
  //   <Switch>
  //     <Route path="/"></Route>
  //   </Switch>
  // </Suspense>;
}

// const trending = fetchTrending();
// const searching = fetchSearching("superman");
// const movie = fetchMovieDetails(12);
// const movieCredits = fetchMovieCredits(12);
// const movieReviews = fetchMovieReviews(12);
