import react from "react";

const ApiKey = "api_key=5e8188bd5a93395485b2ded76178b89d";
const HttpsOfSite = "https://api.themoviedb.org/3";

function fetchTrending() {
  return (
    fetch(`${HttpsOfSite}/trending/movie/week?${ApiKey}`)
      .then((res) => res.json())
      .then((data) => data.results)
      // .then((data) => data.map((data) => data.title))
      .catch((err) => console.log("error:", err))
  );
}
// console.log(data.results)
function fetchSearching(searching) {
  return fetch(
    `${HttpsOfSite}/search/movie?${ApiKey}&language=en-US&query=${searching}&page=1&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) =>
      console.log(data).catch((err) => console.log("error:", err))
    );
}

const fetchMovieDetails = (id) => {
  return fetch(`${HttpsOfSite}/movie/${id}?${ApiKey}&language=en-US`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log("error:", err));
};

function fetchMovieCredits(id) {
  return fetch(`${HttpsOfSite}/movie/${id}/credits?${ApiKey}&language=en-US`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log("error:", err));
}

function fetchMovieReviews(id) {
  return fetch(`${HttpsOfSite}/movie/${id}/reviews?${ApiKey}&language=en-US`)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log("error:", err));
}

export {
  fetchSearching,
  fetchTrending,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
};
