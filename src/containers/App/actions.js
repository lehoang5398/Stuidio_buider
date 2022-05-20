import {
  SET_ACCESS_TOKEN,
  SET_IS_DARK_MODE,
  SET_REFRESH_TOKEN,
  SET_USER,
} from './constants';

export const setDarkMode = (isDark) => ({
  type: SET_IS_DARK_MODE,
  isDark,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const setAccessToken = (accessToken) => ({
  type: SET_ACCESS_TOKEN,
  accessToken,
});

export const setRefreshToken = (refreshToken) => ({
  type: SET_REFRESH_TOKEN,
  refreshToken,
});
