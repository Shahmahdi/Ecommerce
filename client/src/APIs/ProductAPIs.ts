import axios from 'axios';
import { API } from '../config';
import queryString from 'query-string';
import { Category } from './CategoryAPIs';

export interface Product {
  _id: string | null;
  name: string;
  description: string;
  price: number;
  category: Category;
  quantity: number;
  sold: number;
  photo: any;
  shipping: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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

export const getFilteredProducts = (skip: number, limit: number, filters: Object = {}) => {

  const data = {
    skip,
    limit,
    filters
  }

  return (axios.post(`${API}/products/by/search`, data)
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error.response.data;
    })
  );
};

export const getProductsBySearch = (params: object) => {

  const query = queryString.stringify(params);

  return (
    axios.get(`${API}/products/search?${query}`)
      .then(function (response) {
        // console.log(response);
        return response;
      })
      .catch(function (error) {
        // console.log(error);
        return error.response.data;
      })
  );
};

export const getSingleProduct = (productId: string) => (
  axios.get(`${API}/product/${productId}`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response.data;
    })
);

export const getRelatedProducts = (productId: string) => (
  axios.get(`${API}/products/related/${productId}`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response.data;
    })
);