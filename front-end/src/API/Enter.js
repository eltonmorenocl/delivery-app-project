import axios from 'axios';
import API_URL from './API_URL';

const Enter = async (email, password) => {
  const response = await axios
    .post(`${API_URL}user/login`, {
      email,
      password,
    })
    .then((Response) => Response.data)
    .catch((error) => error);

  return response;
};

export default Enter;
