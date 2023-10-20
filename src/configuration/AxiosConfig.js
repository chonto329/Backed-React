import axios from "axios";

export const configuration = axios.create({
    baseURL : process.env.REACT_APP_BASE_URL || 'https://peliculasbacked.onrender.com/api/v1/'
})


