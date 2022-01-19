const ReviewsList = ({ reviewsArr }) => {
  return reviewsArr.map((item) => (
    <li key={item.id}>
      <p>{item.author}</p>
      <a href={item.url}>{item.url}</a>
    </li>
  ));
};
export { ReviewsList };
