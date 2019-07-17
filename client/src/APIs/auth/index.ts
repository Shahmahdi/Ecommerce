import axios from 'axios';
import { API } from '../../config';

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