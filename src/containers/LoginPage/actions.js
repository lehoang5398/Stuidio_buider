/* eslint-disable arrow-body-style */
/* eslint-disable import/named */
import {
  REQUEST_PRODUCTS,
  SET_IS_LOADING_PRODUCTS,
  SET_PRODUCTS,
  LOGIN,
  REGISTER,
} from './constants';

export function requestProducts() {
  return {
    type: REQUEST_PRODUCTS,
  };
}

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const setIsLoadingProducts = (isLoadingProducts) => {
  return {
    type: SET_IS_LOADING_PRODUCTS,
    isLoadingProducts,
  };
};

export const login = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};

export const signup = (payload) => {
  return {
    type: REGISTER,
    payload,
  };
};
