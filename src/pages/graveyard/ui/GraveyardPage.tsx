import { isEmpty, isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC, type ReactNode, useState } from 'react';

import { CollectionSideBar } from '@/features/collections';
import { GraveyardPlantItem } from '@/features/graveyard';
import { ModalOverlay } from '@/features/helpers';
import { Journal, JournalId } from '@/features/journal';
import { PlantModal } from '@/features/plants';
import { useApiQuery, type IPlant, plantsBuriedFetchKey } from '@/shared/api';
import { useOpenModal } from '@/shared/global/modal/hooks/useOpenModal';
import { Loader, Splash } from '@/shared/ui';

import useStyles from './GraveyardPage.styles';

export interface IGraveyardPageProps {}

export const GraveyardPage: FC<IGraveyardPageProps> = () => {
  const classes = useStyles();

  const [openedModal, setOpenedModal] = useState(false);
  let justOpenedModal = false;

  const redactionAllowed = true;

  const [graveyardPlants, setGraveyardPlants] = useState<IPlant[] | undefined>(undefined);

  const fetchGraveyardPlants = useApiQuery(plantsBuriedFetchKey, {}, { enabled: true });

  if (isNotEmpty(fetchGraveyardPlants.data) && isEmpty(graveyardPlants)) {
    setGraveyardPlants(fetchGraveyardPlants.data);
  }

  const isLoading = fetchGraveyardPlants.isLoading || isEmpty(graveyardPlants);

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
    insideClick?: () => void,
  ) => {
    setOpenedModal(true);
    justOpenedModal = true;
    await openModal((props) => (
      <ModalOverlay
        {...props}
        onClose={() => {
          onClose();
          props.onClose?.();
        }}
        title={title}
        isOpen={() => justOpenedModal || openedModal}
        insideClick={insideClick}
      >
        {children}
      </ModalOverlay>
    ));
  };

  const HandleJournalModal = async (plant: IPlant, plantIndex: number) => {
    await HandleModal(
      <Journal plantId={plant.id} key="journal" redactionAllowed={redactionAllowed} />,
      'Журнал растения',
      () => handleCloseModal().then(() => HandlePlantModal(plant, plantIndex)),
      () => document.getElementById(JournalId)?.click(),
    );
  };

  const HandlePlantModal = async (plant: IPlant, index: number) => {
    await HandleModal(
      <PlantModal
        onClose={handleCloseModal}
        plant={plant}
        redactionAllowed={redactionAllowed}
        key="plantModal"
        openJournal={() => handleCloseModal().then(() => HandleJournalModal(plant, index))}
        onRedactionSubmit={(newPlant) => {
          handleCloseModal();
          graveyardPlants?.splice(index, 1, newPlant);
          setGraveyardPlants(graveyardPlants);
        }}
        onDeleteSubmit={() => {
          handleCloseModal();
          graveyardPlants?.splice(index, 1);
          setGraveyardPlants(graveyardPlants);
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
      ) : isEmpty(graveyardPlants) ? (
        <Splash icon="eyes">Коллекция не найдена!</Splash>
      ) : (
        <div className={classes.content}>
          {graveyardPlants?.map((plant, index) => (
            <GraveyardPlantItem
              key={plant.id}
              plant={plant}
              onClick={() => HandlePlantModal(plant, index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
