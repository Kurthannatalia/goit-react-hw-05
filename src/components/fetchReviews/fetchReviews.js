import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TMDB_TOKEN = process.env.TMDB_TOKEN;

if (!TMDB_TOKEN) {
  throw new Error("Missing TMDB_TOKEN in environment variables");
}

export async function fetchReviews(movieId) {
  try {
    const data = await axios.get(`/3/movie/${movieId}/reviews`, {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    throw error;
  }
}
