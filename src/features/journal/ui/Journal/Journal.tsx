import { isEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC, Fragment, type ReactNode, useState } from 'react';

import { ModalOverlay } from '@/features/helpers';
import {
  useApiQuery,
  type IPlant,
  journalFetchKey,
  type IEditJournalEntryRequest,
} from '@/shared/api';
import { addToaster } from '@/shared/global';
import { useOpenModal } from '@/shared/global/modal/hooks/useOpenModal';
import { Loader, Splash } from '@/shared/ui';

import { AddJournalItem } from '../AddJournalItem';
import { JournalItem } from '../JournalItem';

import useStyles from './Journal.styles';

export interface IJournalProps {
  plantId: IPlant['id'];
  redactionAllowed: boolean;
}

export const Journal: FC<IJournalProps> = ({ plantId, redactionAllowed }) => {
  const classes = useStyles();

  const [openedModal, setOpenedModal] = useState(false);
  let justOpenedModal = false;

  const fetchJournal = useApiQuery(
    journalFetchKey,
    { plantId },
    {
      enabled: true,
    },
  );

  const isLoading = fetchJournal.isLoading;

  const { openModal, closeModal } = useOpenModal();

  const hangleCloseModal = async () => {
    setOpenedModal(false);
    justOpenedModal = false;
    await closeModal();
  };

  const HandleModal = async (children: ReactNode, title: string) => {
    setOpenedModal(true);
    justOpenedModal = true;
    await openModal((props) => (
      <ModalOverlay
        onClose={hangleCloseModal}
        title={title}
        isOpen={() => justOpenedModal || openedModal}
        key="modalOverlay"
      >
        {children}
      </ModalOverlay>
    ));
  };

  const HandleAddJournalEntryItemModal = async () => {
    addToaster({ type: 'info', text: 'В разработке!' });
  };

  const HandleEditJournalEntryModal = async (entry: IEditJournalEntryRequest) => {
    addToaster({ type: 'info', text: 'В разработке!' });
  };

  return (
    <div className={classes.collectionPage}>
      {isLoading ? (
        <Loader />
      ) : isEmpty(fetchJournal.data) ? (
        <Splash icon="eyes">Журнал не найден!</Splash>
      ) : (
        <div className={classes.content}>
          <Fragment>
            {fetchJournal.data?.map((entry) => (
              <JournalItem
                key={entry.entryId}
                entry={entry}
                redaction={
                  redactionAllowed ? () => HandleEditJournalEntryModal({ ...entry }) : undefined
                }
              />
            ))}
            {redactionAllowed && <AddJournalItem onClick={HandleAddJournalEntryItemModal} />}
          </Fragment>
        </div>
      )}
    </div>
  );
};
