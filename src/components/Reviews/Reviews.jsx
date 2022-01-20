import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../AppFetch/AppFetch";

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    console.log(
      fetchMovieReviews(movieId).then((responce) => setReviews(responce))
    );
    fetchMovieReviews(movieId)
      .then((responce) => setReviews(responce))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((item) => (
          <li key={item.id}>
            <b>Author: {item.author}</b>
            <p>{item.content} </p>
          </li>
        ))
      ) : (
        <p>Nothing was founded</p>
      )}
    </section>
  );
};
export default ReviewsList;

// reviews.map((item) => (
//   <li key={item.id}>
//     <p>{item.author}</p>
//     <a href={item.url}>{item.url}</a>
//   </li>
// ));
