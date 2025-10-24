import { type ReactNode } from 'react';

import { Icon } from './Icon';
import { type IIcon } from './types';

export const renderIcon = (icon: IIcon): ReactNode =>
  typeof icon === 'string' ? <Icon type={icon} /> : icon;
