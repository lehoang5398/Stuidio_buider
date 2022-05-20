import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = (state) => state.global || initialState;

export const makeSelectGlobal = () =>
  createSelector(selectGlobal, (state) => state);

export const makeSelectIsDarkMode = () =>
  createSelector(selectGlobal, (state) => state.darkMode);

export const makeSelectUser = () =>
  createSelector(selectGlobal, (state) => state.user);

export const makeSelectRefreshToken = () =>
  createSelector(selectGlobal, (state) => state.refreshToken);

export const makeSelectAccessToken = () =>
  createSelector(selectGlobal, (state) => state.accessToken);
