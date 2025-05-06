import {
  useMutation,
  useQuery,
  type DefaultError,
  type MutationFunction,
  type MutationOptions,
  type QueryFunction,
  type UseQueryOptions,
  type Mutation,
} from '@tanstack/react-query';
import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';

import { api } from './api-client';
import type config from './config';
import { useIsUpdating } from '../hooks';

export type IApiQueryKey = keyof typeof api & keyof typeof config;

export type IApiRequest<K extends IApiQueryKey> = Parameters<(typeof api)[K]>[0];

export type IApiResponse<K extends IApiQueryKey> = Awaited<ReturnType<(typeof api)[K]>>;

export const useApiQuery = <
  K extends IApiQueryKey,
  Result = IApiResponse<K>,
  Error = DefaultError,
  Data = Result,
>(
  k?: K,
  query?: IApiRequest<K>,
  options?: Omit<UseQueryOptions<Result, Error, Data>, 'queryKey' | 'queryFn'>,
) =>
  useQuery({
    queryKey: [k, query].filter(isNotEmpty),
    queryFn:
      k !== undefined
        ? () => (api[k] as unknown as QueryFunction<Result>)(query as never)
        : undefined,
    enabled: k !== undefined,
    ...options,
  });

export const useApiMutation = <
  K extends IApiQueryKey,
  Request = IApiRequest<K>,
  Result = IApiResponse<K>,
  Error = DefaultError,
  Context = unknown,
>(
  k?: K,
  options?: Omit<MutationOptions<Result, Error, Request, Context>, 'mutationKey' | 'mutationFn'>,
) =>
  useMutation({
    mutationKey: [k],
    mutationFn:
      k !== undefined
        ? (api[k] as unknown as MutationFunction<Result, Request>)
        : () => Promise.reject(),
    ...options,
  });

export const useIsApiMutating = <
  K extends IApiQueryKey,
  Request = IApiRequest<K>,
  Result = IApiResponse<K>,
  Error = DefaultError,
>(
  k?: K,
  options?: Omit<Parameters<typeof useIsUpdating>[0], 'mutationKey'> & {
    predicate: (mutation: Mutation<Result, Error, Request>) => boolean;
  },
) =>
  useIsUpdating({
    mutationKey: [k],
    ...options,
  });

export interface IUseApiMutationParams<K extends IApiQueryKey> {
  onSuccess?: (response: IApiResponse<K>, request: IApiRequest<K>) => void | Promise<void>;
  onError?: (error: DefaultError) => void | Promise<void>;
}

declare module '@tanstack/react-query' {
  interface QueryClient {
    setQueryData<K extends keyof typeof config>(
      queryKey: [K, Partial<IApiRequest<K>>],
      newResponse:
        | IApiResponse<K>
        | ((prev: IApiResponse<K> | undefined) => IApiResponse<K> | undefined),
    ): void;

    setQueriesData<K extends keyof typeof config>(
      filters: { queryKey: [K, Partial<IApiRequest<K>>] },
      newResponse:
        | IApiResponse<K>
        | ((prev: IApiResponse<K> | undefined) => IApiResponse<K> | undefined),
    ): void;
  }
}
