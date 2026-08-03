import axios from "axios";
const client = axios.create({
  baseURL: "/api/v1",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});
client.interceptors.response.use((response) => response.data, (error) => {
  console.error("[API Error]", error.response?.data || error.message);
  return Promise.reject(error);
});
export default client;
