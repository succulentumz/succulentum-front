import ApiClient, {
  type IHeaders,
  type BaseConfigType,
  type IApiClientOptions,
} from '@true-engineering/true-react-common-api-client';
import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';

import { getToken } from './auth';
import config from './config';
import { parseConfig } from './helpers';
import { type IFetchConfig } from './types';
import { environments } from '../config';
import { showErrorToaster, showSuccessToaster } from '../global';

function createApiClient<U extends Record<string, IFetchConfig>>(
  options: Omit<IApiClientOptions<BaseConfigType>, 'apiConfig' | 'mocks'>,
  configs: U,
) {
  const { apiConfig, mocks, getFetches } = parseConfig(configs);
  const apiClient = new ApiClient({ ...options, apiConfig, mocks });

  return Object.assign(apiClient, getFetches(apiClient));
}

const getHeaders = (): IHeaders => {
  const token = getToken();

  return {
    Authorization: isNotEmpty(token) ? `Bearer ${token}` : undefined,
  };
};

export const api = createApiClient(
  {
    environments,
    getNodeEnv: () => process.env.NODE_ENV ?? environments.PROD,
    mockedEnvironments: isNotEmpty(localStorage.getItem('mocks')) ? [environments.DEV] : [],
    headers: getHeaders(),
    shouldShowToasterOnError: true,
    canceledRequestHandler: (options, response) => {
      console.warn(`Canceled Request handled: ${options.name}`, {
        params: options.params,
        body: options.body,
        response,
      });

      throw response;
    },
    showErrorToaster,
    showSuccessToaster,
  },
  config,
);

// applyRefreshTokenInterceptor(api.axiosInstance, {
//   onUpdate: () => api.setHeaders(getHeaders()),
// });
