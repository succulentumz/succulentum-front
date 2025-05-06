import { type BaseConfigType } from '@true-engineering/true-react-common-api-client';
import type ApiClient from '@true-engineering/true-react-common-api-client';
import { applyAction, delay } from '@true-engineering/true-react-platform-helpers';

import { type IFetchConfig, type IReplaceType, type IMock } from './types';

export const nullToUndefined = <T>(value: T) => {
  let result: unknown;
  if (value === null) {
    result = undefined;
  } else if (typeof value !== 'object') {
    result = value;
  } else if (Array.isArray(value)) {
    result = value.map(nullToUndefined);
  } else {
    result = Object.fromEntries(Object.entries(value).map(([k, v]) => [k, nullToUndefined(v)]));
  }
  return result as IReplaceType<T, null, undefined>;
};

export const mockTemplate =
  <T>(name: string, fixture: T | ((...args: Parameters<IMock<T>>) => T), ms = 300): IMock<T> =>
  async (args) => {
    await delay(ms);
    const actualFixture = applyAction(fixture, args);
    // eslint-disable-next-line no-console
    console.log(name, args, actualFixture);
    return nullToUndefined(actualFixture);
  };

export const createFetchConfig = <N extends string, P, T = void, R = P>(
  name: N,
  { config, getRequestOptions, mock, mockValue, onError }: IFetchConfig<P, T, R>,
) =>
  ({
    [name]: {
      config,
      getRequestOptions,
      mock: mock ?? mockTemplate(name, mockValue),
      onError,
    },
  }) as Record<N, IFetchConfig<P, T, R>>;

export const parseConfig = <C extends Record<string, IFetchConfig>>(configs: C) => {
  const apiConfig = Object.fromEntries(
    Object.entries(configs).map(([name, { config }]) => [name, config]),
  );

  const mocks = Object.fromEntries(Object.entries(configs).map(([name, { mock }]) => [name, mock]));

  const getFetches = (apiClient: ApiClient<BaseConfigType>) =>
    Object.fromEntries(
      Object.entries(configs).map(([name, { getRequestOptions, onError }]) => [
        name,
        (args) =>
          apiClient.createRequest({ ...getRequestOptions(args), name }).catch((e) => {
            onError?.(e, name, args);
            throw e;
          }),
      ]),
    ) as {
      [N in keyof C]: C[N] extends IFetchConfig<infer P, infer T> ? (_: T) => Promise<P> : never;
    };

  return { apiConfig, mocks, getFetches };
};
