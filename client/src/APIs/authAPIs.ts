import axios from 'axios';
import { API } from '../config';

export const signupFormSubmit = (user: object) => (
  axios.post(`${API}/signup`, user)
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error.response.data;
    })
);

export const signinFormSubmit = (user: object) => (
  axios.post(`${API}/signin`, user)
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error.response.data;
    })
);

export const setUserDataIntoLocalStorage = (data: object, next: Function) => {
  if (typeof window !== undefined) {
    localStorage.setItem('jwt', JSON.stringify(data));
  }
  next();
};

export const signout = (next: Function) => {
  if (typeof window !== undefined) {
    localStorage.removeItem('jwt');
  }
  next();
  axios.get(`${API}/signout`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
}

export const isAuthenticate = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt')!);
  } else {
    return false;
  }
}