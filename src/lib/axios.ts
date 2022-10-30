import axios from 'axios';
const BASE_URL  = 'https://cotacaojs.herokuapp.com/';
export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': "application/json" },
    withCredentials: true
});

export const axiosFree = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': "application/json" },
});