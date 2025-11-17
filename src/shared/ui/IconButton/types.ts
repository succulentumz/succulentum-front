import { type ButtonHTMLAttributes } from 'react';

import { type ICON_BUTTON_SIZES, type ICON_BUTTON_VIEWS } from './constants';

export type IIconButtonSize = (typeof ICON_BUTTON_SIZES)[number];

export type IIconButtonView = (typeof ICON_BUTTON_VIEWS)[number];

export type IIconButtonHTMLBaseProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled' | 'style' | 'className'
>;
