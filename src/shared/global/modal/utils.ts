import { omit } from '@true-engineering/true-react-platform-helpers';

import { type IStoredModal } from './model';
import { isEqual } from '../../helpers';

const excludeModalStoreKeys: Array<keyof IStoredModal> = ['beforeClose', 'render', 'status'];

export const areModalsEqual = (modals1: IStoredModal[], modals2: IStoredModal[]) =>
  modals1.length === modals2.length &&
  modals1.every((ai, i) =>
    isEqual(omit(ai, excludeModalStoreKeys), omit(modals2[i], excludeModalStoreKeys)),
  );
