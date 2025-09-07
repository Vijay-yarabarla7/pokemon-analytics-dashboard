// Centralized Axios client for PokéAPI with base URL, timeout, and error logging
import axios from "axios";

// Create a preconfigured Axios instance for PokéAPI requests
const http = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
});

// Global response interceptor
http.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err?.message || err);
    return Promise.reject(err);
  }
);

export default http;
