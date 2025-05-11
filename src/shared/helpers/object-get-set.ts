import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type PickDeep, type Paths as PathTypeFest } from 'type-fest';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseIntSafety } from './number';
import { type BaseObject } from '../model';

type FieldValues = BaseObject;

export type Primitive = null | undefined | string | number | boolean | symbol | bigint;

// Исключает классы из построения пути к полю
export type IgnoredType =
  | Date
  | Map<unknown, unknown>
  | Set<unknown>
  | WeakMap<never, unknown>
  | WeakSet<never>;

type IsTuple<T extends readonly any[]> = number extends T['length'] ? false : true;
type TupleKey<T extends readonly any[]> = Exclude<keyof T, keyof any[]>;
type ArrayKey = number;

type PathImpl<K extends string | number, V> = V extends Primitive
  ? `${K}`
  : `${K}` | `${K}.${Path<V>}`;

type Path<T> =
  T extends ReadonlyArray<infer V>
    ? IsTuple<T> extends true
      ? {
          [K in TupleKey<T>]-?: PathImpl<K & string, T[K]>;
        }[TupleKey<T>]
      : PathImpl<ArrayKey, V>
    : T extends IgnoredType
      ? never
      : {
          [K in keyof T]-?: PathImpl<K & string, T[K]>;
        }[keyof T];

export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>;

type ArrayPathImpl<K extends string | number, V> = V extends Primitive
  ? never
  : V extends ReadonlyArray<infer U>
    ? U extends Primitive
      ? never
      : `${K}` | `${K}.${ArrayPath<V>}`
    : `${K}.${ArrayPath<V>}`;

type ArrayPath<T> =
  T extends ReadonlyArray<infer V>
    ? IsTuple<T> extends true
      ? {
          [K in TupleKey<T>]-?: ArrayPathImpl<K & string, T[K]>;
        }[TupleKey<T>]
      : ArrayPathImpl<ArrayKey, V>
    : T extends IgnoredType
      ? never
      : {
          [K in keyof T]-?: ArrayPathImpl<K & string, T[K]>;
        }[keyof T];

type PathValue<T, P extends Path<T> | ArrayPath<T>> = T extends any
  ? P extends `${infer K}.${infer R}`
    ? K extends keyof T
      ? R extends Path<T[K]>
        ? PathValue<T[K], R>
        : never
      : K extends `${ArrayKey}`
        ? T extends ReadonlyArray<infer V>
          ? PathValue<V, R & Path<V>>
          : never
        : never
    : P extends keyof T
      ? T[P]
      : P extends `${ArrayKey}`
        ? T extends ReadonlyArray<infer V>
          ? V
          : never
        : never
  : never;

export type FieldPathValue<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
> = PathValue<TFieldValues, TFieldPath>;

export const getProperty = <T extends object, N extends FieldPath<T>>(
  object: T,
  path: N,
): FieldPathValue<T, N> => path.split('.').reduce((result: any, key) => result?.[key], object);

export const setProperty = <T extends object, N extends FieldPath<T>>(
  object: T,
  path: N,
  value: FieldPathValue<T, N>,
  shouldTryingSetArray = false,
) => {
  path.split('.').reduce((result: any, key, i, parts) => {
    if (result[key] === undefined) {
      const isArray = shouldTryingSetArray && isNotEmpty(parseIntSafety(parts.at(i + 1)));
      result[key] = isArray ? [] : {};
    }

    if (i === parts.length - 1) {
      result[key] = value;
    }
    return result[key];
  }, object);
};

export const pickProperties = <T extends BaseObject, P extends PathTypeFest<T>>(
  object: T,
  paths: P[],
  shouldTryingSetArray = false,
) =>
  paths.reduce((res, path) => {
    setProperty(
      res,
      path as never,
      getProperty(object, path as never) as never,
      shouldTryingSetArray,
    );
    return res;
  }, {}) as PickDeep<T, P>;
