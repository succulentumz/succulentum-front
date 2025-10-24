import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useZustand } from 'use-zustand';

import { Toaster } from '@/shared/ui';

import { MAX_SHOWN_TOASTERS } from './constants';
import { durations } from '../../../../theme';
import { toasterStore } from '../../model';

import useStyles from './ToasterManager.styles';

export const ToasterManager = () => {
  const classes = useStyles();

  const toasters = useZustand(toasterStore, (state) => state.toasters);
  const removeToaster = useZustand(toasterStore, (state) => state.actions.removeToaster);

  const shownToasters = toasters.slice(0, MAX_SHOWN_TOASTERS);

  return (
    <TransitionGroup className={classes.root}>
      {shownToasters.map(({ id, onClose, ...props }) => (
        <CSSTransition key={id} timeout={durations.DEFAULT} classNames={{ ...classes }}>
          <div className={classes.toaster}>
            <Toaster
              onClose={() => (removeToaster(id), onClose?.())}
              onTimeEnd={() => removeToaster(id)}
              {...props}
            />
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
