import axios from "axios";

export const TOKEN_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmI2NDA1N2FlY2Q5MWY4NDdhN2NhNjg1ZDI3N2M2OCIsIm5iZiI6MTczNzY1NDc0OC4xMDMwMDAyLCJzdWIiOiI2NzkyODFkY2QwOGUyZDMyYzIyOTQ3MGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6fOl5Yq1a296IbCRUVio5h83y4y-NSMUOqgZ0zhw1iI";

axios.defaults.baseURL = "https://api.themoviedb.org";

export default async function fetchMovie(searchQuery, page) {
  const data = await axios.get(`/3/search/movie`, {
    params: {
      query: searchQuery,
      page: page,
    },
    headers: {
      Authorization: `Bearer ${TOKEN_KEY}`,
    },
  });
  return data.data;
}