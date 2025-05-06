import { isEmpty, isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type AxiosInstance, type AxiosResponse } from 'axios';

import { REFRESH_URL } from './constants';
import {
  type ILifecycleCallbacks,
  type IRefreshTokenPayload,
  type IRefreshTokenResponse,
} from './types';
import {
  clearAccessToken,
  clearRefreshToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from './utils';
import { hosts } from '../../config';
import { isAxiosError } from '../../helpers';

export const applyRefreshTokenInterceptor = (
  axiosInstance: AxiosInstance,
  callbacks?: ILifecycleCallbacks,
) =>
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        !isAxiosError(error) ||
        error.config?.url === REFRESH_URL ||
        error.response?.status !== 401
      ) {
        return Promise.reject(error);
      }

      const refreshToken = getRefreshToken();
      if (isEmpty(refreshToken)) {
        return Promise.reject(error);
      }

      return axiosInstance
        .post<
          IRefreshTokenResponse,
          AxiosResponse<IRefreshTokenResponse, IRefreshTokenPayload>,
          IRefreshTokenPayload
        >(REFRESH_URL, { refresh: refreshToken }, { baseURL: hosts.python })
        .then((response) => {
          setAccessToken(response.data.access);
          callbacks?.onUpdate?.(response.data.access);

          if (isNotEmpty(error.response)) {
            error.response.config.headers.Authorization = `Bearer ${getAccessToken()}`;

            return axiosInstance(error.response.config);
          }

          return Promise.reject(error);
        })
        .catch((nestedError) => {
          clearAccessToken();
          clearRefreshToken();
          callbacks?.onError?.(nestedError);

          return Promise.reject(nestedError);
        });
    },
  );
