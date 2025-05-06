import { isEmpty, isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { createStore } from 'zustand';

import { type IStoredModal } from './types';

export interface IModalStoreState {
  modals: IStoredModal[];
}

type IStoredModalNotRequired = Partial<Omit<IStoredModal, 'modalId' | 'props' | 'status'>>;

export interface IModalStoreActions {
  getById: (props: IStoredModal['modalId']) => IStoredModal | undefined;
  addModal: (
    render: IStoredModal['render'],
    otherProps?: IStoredModalNotRequired,
  ) => IStoredModal['modalId'];
  replaceModal: (
    render: IStoredModal['render'],
    otherProps?: IStoredModalNotRequired,
  ) => Promise<IStoredModal['modalId']>;
  removeModal: (modalId: IStoredModal['modalId']) => Promise<void>;
  removeLastModal: () => Promise<void>;
  removeAllModals: () => Promise<void>;
  updateModal: (
    modalId: IStoredModal['modalId'],
    newValue: Partial<Omit<IStoredModal, 'modalId'>>,
  ) => void;
}

export type IModalStore = IModalStoreState & { actions: IModalStoreActions };

export const modalStore = createStore<IModalStore>((set, get) => ({
  modals: [],

  actions: {
    /**
     * @param modalId - идентификатор модального окна
     * @returns модальное окно
     */
    getById: (modalId) => get().modals.find((m) => m.modalId === modalId),

    /**
     * Добавляет новое модальное окно
     * @param render - рендер функция
     * @param restProps - другие свойства модального окна (beforeClose)
     * @returns идентификатор нового модального окна
     */
    addModal: (render, restProps) => {
      const modalId = crypto.randomUUID();

      set(({ modals }) => ({
        modals: [...modals, { modalId, render, status: 'opening', ...restProps }],
      }));

      return modalId;
    },

    /**
     * Добавляет новое модальное окно вместо всех открытых
     * @param render - рендер функция
     * @param restProps - другие свойства модального окна (beforeClose)
     * @returns идентификатор нового модального окна
     */
    replaceModal: async (render, restProps) => {
      const {
        actions: { addModal, removeAllModals },
      } = get();

      await removeAllModals();
      return addModal(render, restProps);
    },

    /**
     * Удаляет модальное окно
     * @param modalId - идентификатор модального окна
     */
    removeModal: async (modalId) => {
      const {
        actions: { updateModal, getById },
      } = get();

      const modalToRemove = getById(modalId);
      if (isEmpty(modalToRemove)) {
        return;
      }

      if (modalToRemove.status === 'closing') {
        console.warn(`modal ${modalToRemove.modalId} is closing now`);
        return;
      }

      if (isNotEmpty(modalToRemove.beforeClose)) {
        updateModal(modalToRemove.modalId, { status: 'closing' });
        const shouldClose = await modalToRemove.beforeClose();
        updateModal(modalToRemove.modalId, { status: 'opened' });

        if (!shouldClose) {
          throw new Error(`stop closing for modal ${modalToRemove.modalId}`);
        }
      } else {
        updateModal(modalToRemove.modalId, { status: 'closing' });
      }

      set(({ modals }) => ({
        modals: modals.filter((m) => m.modalId !== modalId),
      }));
    },

    /**
     * Удаляет последнее модальное окно
     */
    removeLastModal: async () => {
      const {
        modals,
        actions: { removeModal },
      } = get();

      const lastModal = modals.at(-1);

      if (isNotEmpty(lastModal)) {
        await removeModal(lastModal.modalId);
      }
    },

    /**
     * Удаляет все модальные окна
     */
    removeAllModals: async () => {
      const {
        modals,
        actions: { removeModal },
      } = get();

      const reversedModals = [...modals].reverse();

      for (const modal of reversedModals) {
        await removeModal(modal.modalId);
      }
    },

    /**
     * Обновляет модальное окно
     */
    updateModal: (modalId, newValue) => {
      set(({ modals }) => ({
        modals: modals.map((m) => (m.modalId === modalId ? { ...m, ...newValue } : m)),
      }));
    },
  },
}));
