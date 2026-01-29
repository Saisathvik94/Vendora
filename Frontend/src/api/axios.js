import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // gets all credentials from response
})

export default api