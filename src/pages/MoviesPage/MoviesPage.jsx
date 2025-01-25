import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import NextPage from "../../components/NextPage/NextPage";
import { useEffect, useState } from "react";
import fetchMovie from "../../components/fetchMovie/fetchMovie";
import { useSearchParams } from "react-router-dom";
import Error from "../../components/Error/Error";

const MoviesPage = ({ onLoad }) => {
  const [filmSearch, setFilmSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchTerm = searchParams.get("query");
    const pageParam = parseInt(searchParams.get("page")) || 1;

    if (searchTerm) {
      setSearchTerm(searchTerm);
      setPage(pageParam);
      const fetchInitialMovies = async () => {
        try {
          setError(false);
          onLoad(true);
          const data = await fetchMovie(searchTerm, pageParam);
          setFilmSearch(data.results);
        } catch (error) {
          setError(true);
        } finally {
          onLoad(false);
        }
      };
      fetchInitialMovies();
    }
  }, [searchParams, onLoad]);

  const handleMovie = (searchTerm) => {
    setPage(1);
    setSearchTerm(searchTerm);
    setSearchParams({ query: searchTerm, page: 1 });
  };

  const handleNextPage = async () => {
    const nextPage = page + 1;
    try {
      setError(false);
      onLoad(true);
      const nextPageData = await fetchMovie(searchTerm, nextPage);
      setPage(nextPage);
      setFilmSearch((prevPage) => [...prevPage, ...nextPageData.results]);
      setSearchParams({ query: searchTerm, page: nextPage });
    } catch (error) {
      setError(true);
    } finally {
      onLoad(false);
    }
  };

  return (
    <div>
      {error && <Error />}
      <SearchForm onSearch={handleMovie} />
      {filmSearch.length > 0 && <MovieList movies={filmSearch} />}
      {filmSearch.length > 0 && <NextPage onChange={handleNextPage} />}
    </div>
  );
};

export default MoviesPage;
