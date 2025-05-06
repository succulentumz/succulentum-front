import { IToasterProps } from '@/shared/ui';

export type IToasterId = string;

export interface IToaster extends IToasterProps {
  id: IToasterId;
}
