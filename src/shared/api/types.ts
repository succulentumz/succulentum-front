import {
  type IRequestConfigItem,
  type IRequestOptions,
  type IRequestParams,
} from '@true-engineering/true-react-common-api-client';

export interface IRawData<T> {
  data: T;
}

export type IReplaceType<Type, From, To> = Type extends From
  ? To
  : Type extends object
    ? { [K in keyof Type]: IReplaceType<Type[K], From, To> }
    : Type;

export type IMock<T> = (args: {
  params?: IRequestParams;
  body?: unknown;
}) => Promise<IReplaceType<T, null, undefined>>;

export interface IFetchConfig<P = unknown, T = unknown, R = unknown> {
  config: IRequestConfigItem;
  mock?: IMock<R>;
  mockValue?: IReplaceType<R, undefined, undefined | null>;
  onError?: <RequestType extends T>(e: unknown, name: string, request: RequestType) => void;
  getRequestOptions(_: T): Omit<IRequestOptions<Record<string, IRequestConfigItem>, R, P>, 'name'>;
}
