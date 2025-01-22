import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../api";
import { useParams } from "react-router-dom";
import styles from './MovieReviews.module.css'

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchMovieReviews(movieId).then(setReviews);
    }, [movieId]);

    return (
        <ul className={styles.MovieReviews}>
            {reviews.map((review) => (
                <li key={review.id}>
                    <h3>{review.author}</h3>
                    <p>{review.content}</p>
                </li>
            ))}
        </ul>
    );
};

export default MovieReviews;



