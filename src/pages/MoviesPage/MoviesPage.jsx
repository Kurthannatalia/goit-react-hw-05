import { useEffect, useState } from "react";
import { searchMovies } from "../../api";
import MovieList from "../..//components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query") || "");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            if (query) {
                const results = await searchMovies(query);
                setMovies(results);
            }
        };
        fetchMovies();
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        const newQuery = e.target.search.value;
        setQuery(newQuery);
        setSearchParams({ query: newQuery });
    };

    return (
        <div>
            <h1>Search Movies</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    name="search"
                    placeholder="Search for a movie"
                    defaultValue={query}
                />
                <button type="submit">Search</button>
            </form>
            {query && <MovieList movies={movies} />}
        </div>
    );
};

export default MoviesPage;