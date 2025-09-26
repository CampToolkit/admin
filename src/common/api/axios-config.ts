import axios from "axios";

const URL = "/api";
const axiosConfig = axios.create({
  baseURL: URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosConfig };
