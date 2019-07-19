import axios from 'axios';
import { API } from '../config';

export const categoryFormSubmit = (userId: string, token: string, category: Object) => {

  const config = {
    headers: { 'Authorization': `Bearer ${token}` }
  };

  return (axios.post(`${API}/category/create/${userId}`, category, config)
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