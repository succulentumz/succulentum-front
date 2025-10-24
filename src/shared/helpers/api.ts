/**
 * Проверяет, является ли ошибка из Axios'а
 * @see https://github.com/axios/axios/blob/v1.x/lib/helpers/isAxiosError.js
 */

import { isObject } from '@true-engineering/true-react-platform-helpers';
import { type AxiosError } from 'axios';

import { getProperty } from './object-get-set';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAxiosError = <T = unknown, D = any>(entry: unknown): entry is AxiosError<T, D> =>
  isObject(entry) && getProperty(entry, 'isAxiosError' as never) === true;
