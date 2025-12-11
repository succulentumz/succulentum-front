import { isEmpty, isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC, Fragment, type ReactNode, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CollectionSideBar, CollectionFolder, PlantItem } from '@/features/collections';
import { ModalOverlay } from '@/features/helpers';
import { PlantModal } from '@/features/plants';
import {
  useApiQuery,
  type IFolder,
  type IPlant,
  sharedCollectionFetchKey,
  sharedFoldersFetchKey,
  sharedPlantsFetchKey,
  sharedFolderPlantsFetchKey,
} from '@/shared/api';
import { useOpenModal } from '@/shared/global/modal/hooks/useOpenModal';
import { parseIntSafety } from '@/shared/helpers';
import { Loader, Splash } from '@/shared/ui';

import useStyles from './SharedCollectionPage.styles';
import { Journal } from '@/features/journal';

export interface ISharedCollectionPageProps {}

export const SharedCollectionPage: FC<ISharedCollectionPageProps> = () => {
  const classes = useStyles();

  const [params, setParams] = useSearchParams();
  const [openedModal, setOpenedModal] = useState(false);
  let justOpenedModal = false;

  const redactionAllowed = false;

  const token = params.get('token');
  const folderId = parseIntSafety(params.get('folderId'));

  const { data: currentCollection } = useApiQuery(
    sharedCollectionFetchKey,
    isEmpty(token) ? undefined : { token },
    {
      enabled: isNotEmpty(token),
    },
  );

  const fetchCollectionFolders = useApiQuery(
    sharedFoldersFetchKey,
    isNotEmpty(token) ? { token } : undefined,
    { enabled: isNotEmpty(token) },
  );
  let currentFolder: IFolder<Date> | undefined;
  currentFolder = undefined;
  if (!isEmpty(fetchCollectionFolders.data) && !isEmpty(folderId)) {
    for (const folder of fetchCollectionFolders.data) {
      if (folder.id === folderId) {
        currentFolder = folder;
      }
    }
  }

  const shouldRequestPlantsWithoutFolder = isNotEmpty(token) && isEmpty(folderId);
  const fetchPlants = useApiQuery(
    sharedPlantsFetchKey,
    shouldRequestPlantsWithoutFolder ? { token } : undefined,
    { enabled: shouldRequestPlantsWithoutFolder },
  );

  const fetchFolderPlants = useApiQuery(
    sharedFolderPlantsFetchKey,
    isNotEmpty(folderId) && isNotEmpty(token) ? { folderId, token } : undefined,
    { enabled: isNotEmpty(folderId) },
  );

  const isLoading =
    fetchCollectionFolders.isLoading || fetchPlants.isLoading || fetchFolderPlants.isLoading;

  const { openModal, closeModal } = useOpenModal();

  const handleClickOnFolder = useCallback(
    (currentFolderId: IFolder['id']) => {
      const newParams = new URLSearchParams(params);
      newParams.set('folderId', currentFolderId.toString());
      setParams(newParams);
    },
    [params, setParams],
  );

  const hangleClickGoBack = useCallback(() => {
    const newParams = new URLSearchParams(params);
    if (isNotEmpty(newParams.get('folderId'))) {
      newParams.delete('folderId', undefined);
    } else if (isNotEmpty(newParams.get('collectionId'))) {
      newParams.delete('collectionId', undefined);
    }
    setParams(newParams);
  }, [params, setParams]);

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
      <CollectionSideBar
        title={(isEmpty(folderId) ? currentCollection?.name : currentFolder?.name) ?? 'Коллекция'}
        goBack={isNotEmpty(folderId) ? hangleClickGoBack : undefined}
        change={undefined}
      />
      {isLoading ? (
        <Loader />
      ) : isEmpty(token) ? (
        <Splash icon="eyes">Коллекция не найдена!</Splash>
      ) : (
        <div className={classes.content}>
          {isEmpty(folderId) ? (
            <Fragment>
              {fetchCollectionFolders.data?.map((folder) => (
                <CollectionFolder
                  key={folder.id}
                  folder={folder}
                  onClick={handleClickOnFolder}
                  redactionClick={undefined}
                />
              ))}
              {fetchPlants.data?.map((plant) => (
                <PlantItem key={plant.id} plant={plant} onClick={() => HandlePlantModal(plant)} />
              ))}
            </Fragment>
          ) : (
            fetchFolderPlants.data?.map((plant) => (
              <PlantItem key={plant.id} plant={plant} onClick={() => HandlePlantModal(plant)} />
            ))
          )}
        </div>
      )}
    </div>
  );
};
