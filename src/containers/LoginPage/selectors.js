import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectState = (state) => state.buildStudioPage || initialState;

export const makeSelectProducts = () =>
  createSelector(selectState, (state) => state.products);

export const makeSelectIsLoadingProducts = () =>
  createSelector(selectState, (state) => state.isLoadingProducts);
