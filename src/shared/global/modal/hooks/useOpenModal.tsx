import { useCallback } from 'react';
import { useZustand } from 'use-zustand';

import { modalStore, type IStoredModalRender } from '../model';

/**
 * Добавляет и показывает модальное окно
 * @param props Свойства модального окна или функциональный компонент
 * @returns Промис, который завершится по закрытию окна
 */
export const useOpenModal = () => {
  const addModal = useZustand(modalStore, (state) => state.actions.addModal);
  const removeLastModal = useZustand(modalStore, (state) => state.actions.removeLastModal);

  const openModal = useCallback(
    (props: IStoredModalRender, otherProps?: Parameters<typeof addModal>[1]): Promise<boolean> =>
      new Promise<boolean>((resolve) => {
        addModal(
          (componentProps) =>
            props({
              ...componentProps,
              onClose: () => {
                componentProps?.onClose?.();
                resolve(true);
              },
            }),
          otherProps,
        );
      }),
    [addModal],
  );

  return { openModal, closeModal: () => removeLastModal() };
};
