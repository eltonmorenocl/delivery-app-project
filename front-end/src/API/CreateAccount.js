import axios from 'axios';
import API_URL from './API_URL';

const CreateAccount = async (
  name,
  email,
  password,
) => {
  const response = await axios
    .post(`${API_URL}user/register`, {
      name,
      email,
      password,
    })
    .then((Response) => Response.data)
    .catch((error) => error);

  return response;
};

export default CreateAccount;
