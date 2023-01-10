import axios from "axios";


const apiInit = () => {
  axios.defaults.baseURL = 'https://api.odoc-api.com';
  axios.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem("access_token");
}

export default apiInit;