import axios from "axios";

export const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

axios.defaults.baseURL = "https://api.themoviedb.org";

export async function fetchMovie(searchQuery, page) {
  try {
    
    console.log("TMDB_TOKEN:", TMDB_TOKEN);  
    console.log("TMDB_API_KEY:", TMDB_API_KEY);  

    
    const requestParams = {
      query: searchQuery,
      page: page,
      api_key: TMDB_API_KEY,
    };
    console.log("Request params:", requestParams);

    
    const data = await axios.get(`/3/search/movie`, {
      params: requestParams,
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    });

  
    console.log("Fetched movie data:", data);

    return data.data;

  } catch (error) {
   
    console.error("Error fetching movie data:", error.response || error);
    throw error;
  }
}
