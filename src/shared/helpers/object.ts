import { applyAction, isEmpty, isObject } from '@true-engineering/true-react-platform-helpers';

import { type UndefinedToNull, type BaseObject } from '../model';

/** Типизированная версия {@link Object.keys}. */
export const objectKeys = <T extends BaseObject>(value: T) => Object.keys(value) as Array<keyof T>;

/**
 * Типизированная версия {@link Object.entries}.
 *
 * @description **Unsafe**, может что-нибудь сломать при наличии лишних нетипизированных полей.
 */
export const objectEntries = <K extends PropertyKey, V>(value: Record<K, V>) =>
  Object.entries(value) as Array<[K, V]>;

/**
 * Типизированная версия {@link Object.fromEntries}.
 *
 * @description **Unsafe**, может что-нибудь сломать при наличии лишних нетипизированных полей.
 */
export const objectFromEntries = <K extends PropertyKey, V>(entries: Array<[K, V]>) =>
  Object.fromEntries(entries) as Record<K, V>;

export const filterObjectValue = <T extends BaseObject>(
  entry: T | undefined,
  filterFunc: <K extends keyof T>(value: T[K], key: K) => boolean,
) => {
  if (isEmpty(entry)) {
    return undefined;
  }

  return Object.fromEntries(
    (Object.entries(entry) as Array<[keyof T, T[keyof T]]>).reduce<Array<[keyof T, T[keyof T]]>>(
      (entries, [key, value]) => {
        if (filterFunc(value, key)) {
          entries.push([key, value]);
        }

        return entries;
      },
      [],
    ),
  );
};

export const mapObjectValue = <T extends BaseObject, R>(
  entry: T,
  mapFunc: <K extends keyof T>(value: T[K], key: K) => R,
) =>
  Object.fromEntries(objectKeys(entry).map((k) => [k, mapFunc(entry[k], k)])) as {
    [k in keyof T]: R;
  };

export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> =>
  keys.reduce((res, key) => ({ ...res, [key]: obj[key] }), {}) as Pick<T, K>;

export const pickId = <T, K>(elem: T & { id: K }): K => elem.id;

export const findById = <T, K>(
  arr: Array<T & { id: K }> | undefined,
  id: K,
): (T & { id: K }) | undefined => arr?.find((el) => el.id === id);

export const findIndexById = <T, K>(arr: Array<T & { id: K }> | undefined, id: K): number =>
  arr?.findIndex((el) => el.id === id) ?? -1;

export const undefinedToNull = <T>(value: T): UndefinedToNull<T> =>
  (Array.isArray(value)
    ? value.map(undefinedToNull)
    : isObject(value)
      ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k, undefinedToNull(v)]))
      : value ?? null) as UndefinedToNull<T>;

export const replaceById = <T, K, E extends T & { id: K }>(
  arr: E[],
  id: K,
  replaceElem: E | ((prev: E) => E),
): E[] => {
  const index = findIndexById(arr, id);
  if (index === -1) {
    return arr;
  }

  const copy = [...arr];
  copy.splice(index, 1, applyAction(replaceElem, arr[index]));
  return copy;
};
