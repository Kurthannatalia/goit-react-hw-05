import axios from "axios";

export const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

axios.defaults.baseURL = "https://api.themoviedb.org";

export async function fetchMovie(searchQuery, page) {
  const data = await axios.get(`/3/search/movie`, {
    params: {
      query: searchQuery,
      page: page,
      api_key: TMDB_API_KEY,
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  });
  return data.data;
}
