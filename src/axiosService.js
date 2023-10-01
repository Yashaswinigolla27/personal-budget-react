import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030',
});

//  functions for HTTP requests
export const axiosGet = (url, params) => {
  return axiosInstance.get(url, { params });
};

