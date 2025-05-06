import { type IToaster } from './toaster';
import { type IBackendErrorType } from '../../../model';
import { durations } from '../../../theme';

export const defaultParams: Partial<
  Record<
    IBackendErrorType | number,
    Partial<Omit<IToaster, 'title' | 'text' | 'children' | 'type' | 'tweakStyles'>>
  >
> = {
  401: {
    timeout: durations.INFINITE,
    hasCloseButton: true,
  },
};
