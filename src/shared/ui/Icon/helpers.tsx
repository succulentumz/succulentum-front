import { complexIcons } from './complexIcons';
import type { IComplexIcon, IIconType, ISvgIcon } from './types';

export const isComplexIcon = (type: IIconType): type is IComplexIcon => type in complexIcons;

/**
 * Эта функция позволяет корректно определить ключи в типе
 */
export const checkIcons = <P extends string>(ico: Record<P, ISvgIcon>): Record<P, ISvgIcon> => ico;
