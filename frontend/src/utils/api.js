const localHostnameRegex = /^(localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[0-1])\.\d+\.\d+)$/;
const API_BASE_URL = process.env.REACT_APP_API_URL || (typeof window !== "undefined" && localHostnameRegex.test(window.location.hostname)
  ? "http://localhost:5000"
  : "https://online-shoping-website.onrender.com");

export default API_BASE_URL;
