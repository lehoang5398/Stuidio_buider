import AuthRepository from './AuthRepository';
import ProductRepository from './ProductRepository';

const repositories = {
  product: ProductRepository,
  auth: AuthRepository,
};

export default {
  get: (name) => repositories[name],
};
