// In production, the base URL is mapped to the root ("").
// In development, the API points to port 5173 on localhost.

const API_BASE =
  process.env.NODE_ENV === "production" ? "" : "http://172.18.16.21:8002";

export default API_BASE;
// http://localhost:8000
