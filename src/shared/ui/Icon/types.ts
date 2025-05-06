import { ReactElement, SVGAttributes } from 'react';
import { complexIcons } from './complexIcons';
import { iconsList } from './icons-list';

export interface ISvgIcon {
  viewBox?: string;
  paths?: Array<SVGAttributes<never>>;
  circles?: Array<SVGAttributes<never>>;
  rects?: Array<SVGAttributes<never>>;
}

export type ICommonIcon = keyof typeof iconsList;

export type IComplexIcon = keyof typeof complexIcons;

export type IIconType = ICommonIcon | IComplexIcon;

export type IIcon = IIconType | ReactElement;
