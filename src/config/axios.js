import axios from "axios";
import api_URI from "./uri_api";
const instance = axios.create({
  baseURL: `${api_URI()}`,
});
export default instance;
