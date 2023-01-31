import axios from 'axios';
import API_URL from './API_URL';

const RegisterSale = async (token, data) => {
  const response = await axios
    .post(`${API_URL}sales`, data, {
      headers: {
        Authorization: token,
      } })
    .then((Response) => Response.data)
    .catch((error) => error);

  return response;
};

export default RegisterSale;
