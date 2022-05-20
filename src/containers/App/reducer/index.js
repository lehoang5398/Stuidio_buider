/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  SET_ACCESS_TOKEN,
  SET_IS_DARK_MODE,
  SET_REFRESH_TOKEN,
  SET_USER,
} from '../constants';

const isDarkMode = localStorage.getItem('isDark');

const initialData = {
  accessToken: localStorage.getItem('ACCESS_TOKEN'),
  refreshToken: localStorage.getItem('REFRESH_TOKEN'),
  user: localStorage.getItem('USER'),
};

export const initialState = {
  user: initialData.user ? JSON.parse(initialData.user) : {},
  accessToken: initialData.accessToken
    ? JSON.parse(initialData.accessToken)
    : {},
  refreshToken: initialData.refreshToken
    ? JSON.parse(initialData.refreshToken)
    : {},
  language: 'en-US',
  darkMode: isDarkMode === 'true',
};

export default (state = initialState, action) =>
  produce(state, (draft) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case SET_IS_DARK_MODE:
        localStorage.setItem('isDark', action.isDark);
        draft.darkMode = action.isDark;
        break;
      case SET_USER:
        draft.user = action.user;
        localStorage.setItem('USER', JSON.stringify(action.user));
        break;
      case SET_ACCESS_TOKEN:
        draft.accessToken = action.accessToken;
        localStorage.setItem(
          'ACCESS_TOKEN',
          JSON.stringify(action.accessToken),
        );
        break;
      case SET_REFRESH_TOKEN:
        draft.refreshToken = action.refreshToken;
        localStorage.setItem(
          'REFRESH_TOKEN',
          JSON.stringify(action.refreshToken),
        );
        break;
    }
  });
