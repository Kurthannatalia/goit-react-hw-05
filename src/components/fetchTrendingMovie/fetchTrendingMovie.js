import axios from "axios";
import { TMDB_TOKEN } from "../fetchMovie/fetchMovie";
const fetchTrendingMovie = async () => {
  const data = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    }
  );
  return data.data.results;
};

export default fetchTrendingMovie;
