import { lazy, useState, useEffect } from "react";
import fetchTrendingMovie from "../../components/fetchTrendingMovie/fetchTrendingMovie";
import Error from "../../components/Error/Error";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

const HomePage = ({ onLoad }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadTrendingMovie = async () => {
      try {
        if (typeof onLoad === "function") {
          onLoad(true); 
        }

        const initMovie = await fetchTrendingMovie();
        setError(false);
        setMovies(initMovie);
      } catch (error) {
        setError(true);
      } finally {
        if (typeof onLoad === "function") {
          onLoad(false);
        }
      }
    };

    loadTrendingMovie();
  }, [onLoad]);

  return (
    <div>
      {error && <Error />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
