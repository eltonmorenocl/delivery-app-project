import axios from 'axios';
import API_URL from './API_URL';

export const getOrder = (
  id,
  token,
) => {
  const response = axios
    .get(`${API_URL}sales/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((Response) => Response.data)
    .catch((error) => error);

  return response;
};

export const updateOrderStatus = (
  id,
  token,
) => {
  const response = axios
    .patch(`${API_URL}sales/delivered/${id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      })
    .then((Response) => Response)
    .catch((error) => error);

  return response;
};

export const updatePreparingStatus = (
  id,
  token,
) => {
  const response = axios
    .patch(`${API_URL}sales/preparing/${id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      })
    .then((Response) => Response)
    .catch((error) => error);

  return response;
};

export const updateDeliveringStatus = (
  id,
  token,
) => {
  const response = axios
    .patch(`${API_URL}sales/delivering/${id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      })
    .then((Response) => Response)
    .catch((error) => error);

  return response;
};
