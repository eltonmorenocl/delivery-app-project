import axios from 'axios';
import API_URL from './API_URL';

const getProducts = async () => {
  const response = await axios
    .get(`${API_URL}products`)
    .then((Response) => Response.data)
    .catch((error) => error);

  return response;
};

export default getProducts;
