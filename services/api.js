import axios from 'axios'

export const api = axios.create({
    // baseURL: 'http://localhost:3011/',   
     baseURL: 'https://caixeta.herokuapp.com/',

})

export default api;