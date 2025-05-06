import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';

export const exhaustiveCheck = (_value: never): never => {
  throw new Error('Exhaustive Check: Недостижимый код');
};

export function assertNotEmpty<T>(value?: T | null | undefined): asserts value is T {
  if (isNotEmpty(value)) {
    return;
  }

  throw Error('Assert Check: Недостижимый код');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEqual = (a: any, b: any): boolean => {
  if (a === b) {
    return true;
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) {
    return a === b;
  }

  if (a.prototype !== b.prototype) {
    return false;
  }

  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) {
    return false;
  }

  return keys.every((k) => isEqual(a[k], b[k]));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNotEqual = (a: any, b: any): boolean => !isEqual(a, b);
