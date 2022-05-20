import AxiosClient from './AxiosClient';

const resource = '/auth';

export default {
  login: ({ email, password }) =>
    AxiosClient.post(`${resource}/login`, {
      email,
      password,
    }),
  register: ({ name, email, password }) =>
    AxiosClient.post(`${resource}/register`, {
      name,
      email,
      password,
    }),
};
