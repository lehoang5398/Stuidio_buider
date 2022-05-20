import AxiosClient from './AxiosClient';

const resource = '/studio-product';

export default {
  get: ({ page, limit }) =>
    AxiosClient.get(`${resource}`, {
      params: {
        page,
        limit,
      },
    }),
};
