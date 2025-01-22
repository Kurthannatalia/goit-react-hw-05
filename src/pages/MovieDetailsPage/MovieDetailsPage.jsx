import { useEffect, useRef, useState } from "react";
import { useParams, Outlet, Link, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../api";

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();
    const prevLocationRef = useRef(location.state?.from);

    useEffect(() => {
        fetchMovieDetails(movieId).then(setMovie);
    }, [movieId]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div>
            <Link to={prevLocationRef.current || "/"}>Go Back</Link>
            <h1>{movie.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
            />
            <p>{movie.overview}</p>
            <ul>
                <li>
                    <Link to="cast">Cast</Link>
                </li>
                <li>
                    <Link to="reviews">Reviews</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;

