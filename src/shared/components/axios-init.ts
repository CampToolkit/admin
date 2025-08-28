import axios from "axios";

const URL = "localhost:3000/api";
const axiosConfig = axios.create({
  baseURL: URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosConfig };
