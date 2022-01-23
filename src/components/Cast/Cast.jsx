import react, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../AppFetch/AppFetch";

const Cast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  console.log(cast);
  useEffect(() => {
    fetchMovieCredits(movieId)
      .then((responce) => {
        setCast(responce.cast);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section>
      <h2>Cast</h2>
      <ul>
        {cast.map((cast) => (
          <li key={cast.cast_id}>
            <div>
              {cast.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path} `}
                  width="100px"
                />
              )}
            </div>
            <h3>{cast.name}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Cast;
