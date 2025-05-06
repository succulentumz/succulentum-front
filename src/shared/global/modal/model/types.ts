import { type JSX } from 'react';
import { type TransitionProps } from 'react-transition-group/Transition';

export interface IStoredModal {
  modalId: string;
  portalId?: string;
  status: 'opening' | 'opened' | 'closing';
  render: IStoredModalRender;
  /** Если будет возвращено значение не true, то окно закрыто не будет */
  beforeClose?: () => Promise<boolean>;
}

/** Этот тип полный аналог IModalTransitionProps и IDrawerTransitionProps */
export type IStoredModalTransitionProps = Pick<
  TransitionProps<HTMLDivElement>,
  | 'in' // Аналог isOpen, но это свойство нужно для корректной отрисовки Modal внутри TransitionGroup
  | 'mountOnEnter'
  | 'unmountOnExit'
  | 'timeout'
  | 'onEnter'
  | 'onEntering'
  | 'onEntered'
  | 'onExit'
  | 'onExiting'
  | 'onExited'
>;

export type IStoredModalRender = (
  props: IStoredModalTransitionProps & {
    key?: number | string;
    modalId: IStoredModal['modalId'];
    onClose?: () => void;
  },
) => JSX.Element;
