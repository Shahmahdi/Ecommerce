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