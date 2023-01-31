import axios from 'axios';
import API_URL from './API_URL';

const FetchOrders = async (token) => {
  const response = await axios
    .get(`${API_URL}sales`, {
      headers: {
        Authorization: token,
      },
    })
    .then((Response) => Response.data)
    .catch((error) => error);

  return response;
};

export default FetchOrders;
