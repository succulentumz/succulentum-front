import { isEmpty } from '@true-engineering/true-react-platform-helpers';

export const parseIntSafety = (value: number | string | null | undefined) => {
  if (isEmpty(value) || Number.isNaN(value)) {
    return undefined;
  }

  if (typeof value === 'number') {
    return value;
  }

  const parsedValue = parseInt(value, 10);
  if (Number.isNaN(parsedValue)) {
    return undefined;
  }

  return parsedValue;
};
