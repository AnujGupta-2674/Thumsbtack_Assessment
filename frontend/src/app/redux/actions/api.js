import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_BASE_URL || "https://thumsbtack-assessment.onrender.com/api/v1",
  withCredentials: true
});

export default API;