import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constants';

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const setAccessToken = (value: string) => localStorage.setItem(ACCESS_TOKEN_KEY, value);

export const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const setRefreshToken = (value: string) => localStorage.setItem(REFRESH_TOKEN_KEY, value);

export const clearRefreshToken = () => localStorage.removeItem(REFRESH_TOKEN_KEY);
