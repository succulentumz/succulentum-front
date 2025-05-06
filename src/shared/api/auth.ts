import { getAccessToken } from '../global/auth/utils';

const getUrlToken = () => new URLSearchParams(location.search).get('token');

export const getToken = () => getUrlToken() ?? getAccessToken();
