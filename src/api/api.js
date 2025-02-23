import axios from "axios";

const API_BASE_URL = "https://sahil-server.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
