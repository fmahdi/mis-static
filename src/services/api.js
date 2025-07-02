import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

export const fetchData = (endpoint) =>
  API.get(`/${endpoint}`).then(res => res.data);
