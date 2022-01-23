import "./App.css";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import AppBar from "./components/AppBar/AppBar";
const HomePage = lazy(() => import("./components/HomeView/HomeView"));
const Movies = lazy(() => import("./components/Movies/Movies"));
const MovieDetails = lazy(() =>
  import("./components/MovieDetailsPage/MovieDetailsPage")
);
const Cast = lazy(() => import("./components/Cast/Cast"));
const Reviews = lazy(() => import("./components/Reviews/Reviews"));

export default function App() {
  const NotFound = () => {
    return <h2>Not Found</h2>;
  };

  return (
    <>
      <AppBar />
      <Suspense fallback={<h2>Загружаю...</h2>}>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/:movies" element={<Movies />}></Route>
          <Route
            path="/movies/:movieId"
            element={
              <>
                <MovieDetails />
                <Outlet />
              </>
            }
          >
            <Route path="/movies/:movieId/cast" element={<Cast />}></Route>
            <Route
              path="/movies/:movieId/reviews"
              element={<Reviews />}
            ></Route>
          </Route>
          <Route path="*" exact element={<NotFound />} />{" "}
        </Routes>
      </Suspense>
    </>
  );
}
