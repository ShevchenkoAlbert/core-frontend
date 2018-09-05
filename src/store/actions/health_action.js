import axios from 'axios';
import { config } from '../../env';

const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

export const healthCall = () => {
  axios.get(`${config.HEALTH_URL}health/`, headers)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
