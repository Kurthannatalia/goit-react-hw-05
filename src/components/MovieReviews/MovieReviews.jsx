import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../fetchReviews/fetchReviews"; // Використовуємо іменований експорт
import css from "./MovieReviews.module.css";
import Error from "../Error/Error";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviewsData = await fetchReviews(movieId);
        setReviews(reviewsData.results);
      } catch (err) {
        setError("Sorry, we couldn't fetch the reviews.");
      }
    };
    getReviews();
  }, [movieId]);

  return (
    <div className={css.container}>
      {error ? (
        <Error message={error} />
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;

