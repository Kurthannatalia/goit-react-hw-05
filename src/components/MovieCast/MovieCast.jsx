import { useEffect, useState } from "react";
import { fetchMovieCast } from "../../api";
import { useParams } from "react-router-dom";

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    useEffect(() => {
        fetchMovieCast(movieId).then(setCast);
    }, [movieId]);

    return (
        <ul>
            {cast.map((actor) => (
                <li key={actor.cast_id}>
                    <img
                        src={`${IMAGE_BASE_URL}/${actor.profile_path}`}
                        alt={actor.name}
                    />
                    <p>
                        {actor.name} as {actor.character}
                    </p>
                </li>
            ))}
        </ul>
    );
};

export default MovieCast;