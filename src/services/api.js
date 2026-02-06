import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_KEY;

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    apiKey: API_KEY,
    language: 'pt-BR',
  },
});

export default apiClient;