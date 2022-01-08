import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://caixeta.herokuapp.com/',
})

export default api;