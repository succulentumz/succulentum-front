import { type FC, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { useZustand } from 'use-zustand';

import { modalStore } from '../../model';
import { areModalsEqual } from '../../utils';

import useStyles from './ModalManager.styles';

export const ModalManager: FC = () => {
  const classes = useStyles();

  const modals = useZustand(modalStore, (state) => state.modals, areModalsEqual);
  const removeModal = useZustand(modalStore, (state) => state.actions.removeModal);
  const updateModal = useZustand(modalStore, (state) => state.actions.updateModal);

  return (
    // @ts-ignore
    <TransitionGroup className={classes.modalManager}>
      {modals.map(({ modalId, render }) =>
        render({
          key: modalId,
          modalId,
          onClose: () => removeModal(modalId),
          onEntered: () => {
            updateModal(modalId, { status: 'opened' });
          },
        }),
      )}
    </TransitionGroup>
  );
};
