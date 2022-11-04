import axios from 'axios';
const BASE_URL  = 'https://cotacaojs.herokuapp.com/';
// const BASE_URL  = 'http://localhost:3002';
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