import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TMDB_API_KEY = process.env.VITE_TMDB_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const getTrendingMovies = async () => {
  try {
    const response = await api.get(`/trending/movie/day`, {
      params: {
        language: "en-US",
        api_key: TMDB_API_KEY,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export default api;
export { getTrendingMovies, TMDB_API_KEY };
