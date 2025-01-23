import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TMDB_TOKEN = process.env.TMDB_TOKEN;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`, // Токен для доступу
  },
});

export default api;
export { TMDB_API_KEY };
