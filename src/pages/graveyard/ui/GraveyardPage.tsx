import { isEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC, type ReactNode, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CollectionSideBar } from '@/features/collections';
import { GraveyardPlantItem } from '@/features/graveyard';
import { ModalOverlay } from '@/features/helpers';
import { PlantModal } from '@/features/plants';
import { useApiQuery, type IPlant, plantsBuriedFetchKey } from '@/shared/api';
import { useOpenModal } from '@/shared/global/modal/hooks/useOpenModal';
import { Loader, Splash } from '@/shared/ui';

import useStyles from './GraveyardPage.styles';
import { Journal } from '@/features/journal';

export interface IGraveyardPageProps {}

export const GraveyardPage: FC<IGraveyardPageProps> = () => {
  const classes = useStyles();

  const [openedModal, setOpenedModal] = useState(false);
  let justOpenedModal = false;

  const redactionAllowed = true;

  const fetchGraveyardPlants = useApiQuery(plantsBuriedFetchKey, {}, { enabled: true });

  const isLoading = fetchGraveyardPlants.isLoading;

  const { openModal, closeModal } = useOpenModal();

  const handleCloseModal = async () => {
    setOpenedModal(false);
    justOpenedModal = false;
    await closeModal();
  };

  const HandleModal = async (
    children: ReactNode,
    title: string,
    onClose: () => void = handleCloseModal,
  ) => {
    setOpenedModal(true);
    justOpenedModal = true;
    await openModal((props) => (
      <ModalOverlay
        onClose={onClose}
        title={title}
        isOpen={() => justOpenedModal || openedModal}
        key="modalOverlay"
      >
        {children}
      </ModalOverlay>
    ));
  };

  const HandleJournalModal = async (plant: IPlant) => {
    await HandleModal(
      <Journal plantId={plant.id} key="journal" redactionAllowed={redactionAllowed} />,
      'Журнал растения',
      () => {
        handleCloseModal();
        HandlePlantModal(plant);
      },
    );
  };

  const HandlePlantModal = async (plant: IPlant) => {
    await HandleModal(
      <PlantModal
        onClose={handleCloseModal}
        plant={plant}
        redactionAllowed={redactionAllowed}
        key="plantModal"
        openJournal={() => {
          handleCloseModal();
          HandleJournalModal(plant);
        }}
      />,
      plant.name,
    );
  };

  return (
    <div className={classes.collectionPage}>
      <CollectionSideBar title="Кладбище" />
      {isLoading ? (
        <Loader />
      ) : isEmpty(fetchGraveyardPlants) || isEmpty(fetchGraveyardPlants.data) ? (
        <Splash icon="eyes">Коллекция не найдена!</Splash>
      ) : (
        <div className={classes.content}>
          {fetchGraveyardPlants.data?.map((plant) => (
            <GraveyardPlantItem
              key={plant.id}
              plant={plant}
              onClick={() => HandlePlantModal(plant)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
