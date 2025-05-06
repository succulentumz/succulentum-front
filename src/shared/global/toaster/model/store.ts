import { createStore } from 'zustand';

import { type IToaster } from './toaster';

export interface IToasterStore {
  toasters: IToaster[];

  actions: {
    addToaster(payload: Omit<IToaster, 'id'>): void;
    removeToaster(toasterId: IToaster['id']): void;
  };
}

export const toasterStore = createStore<IToasterStore>((set) => ({
  toasters: [],

  actions: {
    addToaster: (payload) =>
      set(({ toasters }) => ({
        toasters: [...toasters, { ...payload, id: crypto.randomUUID() }],
      })),

    removeToaster: (toasterId) =>
      set(({ toasters }) => ({
        toasters: toasters.filter(({ id }) => id !== toasterId),
      })),
  },
}));

export const { addToaster, removeToaster } = toasterStore.getState().actions;
