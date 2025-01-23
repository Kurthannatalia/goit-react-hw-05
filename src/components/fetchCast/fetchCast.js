import { TMDB_TOKEN } from "../fetchMovie/fetchMovie";

export default async function fetchCast(movie_id) {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    }
  );
  return data;
}
