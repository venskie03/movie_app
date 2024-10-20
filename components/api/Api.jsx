import axios from "axios";
import {MovieApi } from '../../constant/endpoints'

const apiToken = process.env.EXPO_PUBLIC_API_TOKEN;

const apiHelper = async (endpoint, method, body = {}, params = {}) => {


  const url = endpoint.replace(/:\w+/g, (match) => {
    const key = match.slice(1);
    return params[key] || match;
  });

  // Set headers; multipart/form-data only if needed
  const headers = {
    'Content-Type': body instanceof FormData ? 'multipart/form-data' : 'application/json',
    ...(apiToken? {'Authorization': `Bearer ${apiToken}`} : {}),
  };

  try {
    const response = await axios({
      method: method,
      url: `${url}`,
      headers: headers,
      data: body,   // Send data if there's a request body (POST, PUT)
      params: method === 'GET' ? params : {}, // Attach params only for GET requests
    });
    return response;
  } catch (error) {
    throw error?.response?.data || error;  // Return more detailed error
  }
};

// Example API call
export const API = {
    nowPlayingMovies: ()=> apiHelper(MovieApi.nowPlayingMovies, "GET"),
    getGenresID: ()=> apiHelper(MovieApi.getGenresID, "GET"),
    popularMovies: ()=> apiHelper(MovieApi.popularMovies, "GET"),
    getMovieDetails: (id) => apiHelper(MovieApi.getMoviedetails(id), "GET"),
    getMovieByGenre: (id) => apiHelper(MovieApi.getMoviesByGenre(id), "GET"),
    searchMovies: (params) => apiHelper(MovieApi.searchMoviesByName(params), "GET"),
};
