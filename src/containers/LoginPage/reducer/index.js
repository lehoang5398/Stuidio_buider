/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
import produce from 'immer';
import { SET_IS_LOADING_PRODUCTS, SET_PRODUCTS } from '../constants';

export const initialState = {
  products: [],
  isLoadingProducts: false,
};

const productPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_PRODUCTS:
        draft.products = action.products;
        break;

      case SET_IS_LOADING_PRODUCTS:
        draft.isLoadingProducts = action.isLoadingProducts;
        break;
    }
  });

export default productPageReducer;
