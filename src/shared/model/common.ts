import { type DeepReplaceType } from '@true-engineering/true-react-platform-helpers';

export type Nullable<T> = T | null;

export type DtoNullable<T> = {
  [K in keyof T]?: Nullable<T[K]>;
};

export type Extends<T, U extends T> = U;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseObject = Record<string, any>;

export type ArrayElement<A> = A extends ArrayLike<infer T> ? T : never;

export type Flat<A> = A extends ArrayLike<infer Item> ? Item : A;

export type FlatArrayInObjectValues<T extends BaseObject> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: Required<T>[K] extends ArrayLike<any>
    ? Flat<T[K]>
    : FlatArrayInObjectValues<T[K]>;
};

export type PickMatching<T, V> = { [K in keyof T as T[K] extends V ? K : never]: T[K] };

export type RequiredKeys<T, K extends keyof T> = Partial<Omit<T, K>> & Required<Pick<T, K>>;

export type RequiredKeysStrict<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type UndefinedToNull<T> = DeepReplaceType<T, undefined, null>;
