import axios from 'axios';
import { API } from '../config';

export const getProducts = (sortBy: string) => (
  axios.get(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`)
    .then(function (response) {
      // console.log(response);
      return response;
    })
    .catch(function (error) {
      // console.log(error);
      return error.response.data;
    })
);