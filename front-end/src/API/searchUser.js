import axios from 'axios';
import API_URL from './API_URL';

const searchUser = async (authorization, user) => {
  const config = {
    method: 'get',
    url: `${API_URL}user${user ? `?r=${user}` : ''}`,
    headers: {
      authorization,
    },
  };

  const response = await axios(config)
    .then((Response) => Response.data)
    .catch((error) => error);

  return response;
};

export default searchUser;
