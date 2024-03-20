import axios from "axios";

// Set up axios instance for making axios requests

// const BASE_URL = "http://localhost:5000/api/v1";
const BASE_URL = "https://alcoblog.alcodemy.in/api/v1";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL; // set the default base URL to be used by this instance of axios
axiosInstance.defaults.withCredentials = true; // allows credentials such as cookies, authorization headers etc

export default axiosInstance;