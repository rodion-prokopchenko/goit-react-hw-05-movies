import react, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { fetchTrending } from "../AppFetch/AppFetch";

const HomeView = () => {
  const location = useLocation();

  const [trendingMovies, setTrendingMovies] = useState("");

  useEffect(() => {
    fetchTrending()
      .then((filmArr) => {
        setTrendingMovies(filmArr);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(location);

  return (
    <>
      <ul>
        {trendingMovies &&
          trendingMovies.map((movie) => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `movies/${movie.id}`,
                  state: {
                    from: location?.state?.from ?? "/",
                  },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
      </ul>
      <h2>Тут будут популярные за неделю</h2>
    </>
  );
};
export default HomeView;

// const titleFilms = fetchTrending();
// console.log(titleFilms);

// useEffect(async () => {
//   if (trendingMovies.length === 0) {
//     setTrendingMovies(fetchTrending());
//     console.log("добавили фетч");
//   }

//   console.log(fetchTrending().then((data) => data.map((data) => data.title)));
//   console.log(trendingMovies);
// }, [trendingMovies]);

// setTimeout(() => console.log(titleFilms), 1000);
