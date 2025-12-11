import { isEmpty, isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC, Fragment, type ReactNode, useCallback, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  CollectionSideBar,
  PlantCollection,
  CollectionFolder,
  PlantItem,
  AddPlantItem,
  AddPlantCollection,
  AddCollectionFolder,
  CreateCollection,
  CreateCollectionFolder,
  CreatePlant,
  EditCollection,
  EditCollectionFolder,
} from '@/features/collections';
import { ModalOverlay } from '@/features/helpers';
import { Journal, JournalId } from '@/features/journal';
import { PlantModal } from '@/features/plants';
import {
  collectionFoldersFetchKey,
  collectionsFetchKey,
  folderPlantsFetchKey,
  collectionPlantsFetchKey,
  useApiQuery,
  type ICollection,
  type IFolder,
  collectionFetchKey,
  type IEditCollectionRequest,
  type IEditFolderRequest,
  collectionCreateKey,
  type IPlant,
} from '@/shared/api';
import { useOpenModal } from '@/shared/global/modal/hooks/useOpenModal';
import { parseIntSafety } from '@/shared/helpers';
import { Loader, Splash } from '@/shared/ui';

import useStyles from './CollectionPage.styles';

export interface ICollectionPageProps {}

export const CollectionPage: FC<ICollectionPageProps> = () => {
  const classes = useStyles();

  const [params, setParams] = useSearchParams();
  const [openedModal, setOpenedModal] = useState(false);
  let justOpenedModal = false;

  const collectionId = parseIntSafety(params.get('collectionId'));
  const folderId = parseIntSafety(params.get('folderId'));

  const redactionAllowed = true;

  const fetchCollections = useApiQuery(
    collectionsFetchKey,
    {},
    {
      enabled: isEmpty(collectionId),
    },
  );

  const currentCollection = useApiQuery(
    collectionFetchKey,
    isEmpty(collectionId) ? undefined : { collectionId },
    {
      enabled: isNotEmpty(collectionId),
    },
  )?.data;

  const fetchCollectionFolders = useApiQuery(
    collectionFoldersFetchKey,
    isNotEmpty(collectionId) ? { collectionId } : undefined,
    { enabled: isNotEmpty(collectionId) },
  );
  let currentFolder: IFolder<Date> | undefined;
  currentFolder = undefined;
  if (isNotEmpty(fetchCollectionFolders.data) && isNotEmpty(folderId)) {
    for (const folder of fetchCollectionFolders.data) {
      if (folder.id === folderId) {
        currentFolder = folder;
      }
    }
  }

  const shouldRequestPlantsWithoutFolder = isNotEmpty(collectionId) && isEmpty(folderId);
  const fetchPlants = useApiQuery(
    collectionPlantsFetchKey,
    shouldRequestPlantsWithoutFolder ? { collectionId } : undefined,
    { enabled: shouldRequestPlantsWithoutFolder },
  );

  const fetchFolderPlants = useApiQuery(
    folderPlantsFetchKey,
    isNotEmpty(folderId) ? { folderId } : undefined,
    { enabled: isNotEmpty(folderId) },
  );

  const isLoading =
    fetchCollections.isLoading ||
    fetchCollectionFolders.isLoading ||
    fetchPlants.isLoading ||
    fetchFolderPlants.isLoading;

  const { openModal, closeModal } = useOpenModal();

  const handleClickOnFolder = useCallback(
    (currentFolderId: IFolder['id']) => {
      const newParams = new URLSearchParams(params);
      newParams.set('folderId', currentFolderId.toString());
      setParams(newParams);
    },
    [params, setParams],
  );

  const handleClickOnCollection = useCallback(
    (currentCollectionId: ICollection['id']) => {
      const newParams = new URLSearchParams(params);
      newParams.set('collectionId', currentCollectionId.toString());
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
    insideClick?: () => void,
  ) => {
    setOpenedModal(true);
    justOpenedModal = true;
    await openModal((props) => (
      <ModalOverlay
        onClose={onClose}
        title={title}
        isOpen={() => justOpenedModal || openedModal}
        key="modalOverlay"
        insideClick={insideClick}
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
      document.getElementById(JournalId)?.click,
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

  const HandleCreatePlantCollectionModal = async () => {
    await HandleModal(
      <CreateCollection
        onSubmit={handleCloseModal}
        ownerId={0} // TODO INSERT OWNER ID HERE
        key="createCollection"
      />,
      'Добавить коллекцию',
    );
  };

  const HandleCreateCollectionFolderModal = async () => {
    await HandleModal(
      <CreateCollectionFolder
        onSubmit={handleCloseModal}
        key={collectionCreateKey}
        collectionId={collectionId!}
      />,
      'Добавить папку',
    );
  };

  const HandleAddPlantItemModal = async () => {
    await HandleModal(
      <CreatePlant
        onSubmit={handleCloseModal}
        ownerId={0} // TODO INSERT OWNER ID HERE
        collectionId={collectionId!}
        key="createPlant"
      />,
      'Добавить растение',
    );
  };

  const HandleEditCollectionModal = async (collection: IEditCollectionRequest) => {
    await HandleModal(
      <EditCollection collection={collection} onSubmit={handleCloseModal}></EditCollection>,
      'Изменение коллекции',
    );
  };

  const HandleEditCollectionFolderModal = async (folder: IEditFolderRequest) => {
    await HandleModal(
      <EditCollectionFolder folder={folder} onSubmit={handleCloseModal}></EditCollectionFolder>,
      'Изменение папки',
    );
  };

  const sharedLink = isEmpty(folderId)
    ? `${window.location.protocol}//${window.location.host}/shared?token=${currentCollection?.sharedLink}`
    : undefined;

  return (
    <div className={classes.collectionPage}>
      <CollectionSideBar
        title={(isEmpty(folderId) ? currentCollection?.name : currentFolder?.name) ?? 'Каталог'}
        goBack={isNotEmpty(collectionId) ? hangleClickGoBack : undefined}
        sharedLink={sharedLink}
        token={currentCollection?.sharedLink}
        change={
          !redactionAllowed || isEmpty(collectionId)
            ? undefined
            : isEmpty(folderId)
              ? () => HandleEditCollectionModal({ ...currentCollection!, collectionId })
              : () => HandleEditCollectionFolderModal({ ...currentFolder!, folderId })
        }
      />
      {isLoading ? (
        <Loader />
      ) : isEmpty(collectionId) && isEmpty(fetchCollections.data) ? (
        <Splash icon="eyes">Коллекция не найдена!</Splash>
      ) : (
        <div className={classes.content}>
          {isNotEmpty(collectionId) ? (
            <Fragment>
              {redactionAllowed ? <AddPlantItem onClick={HandleAddPlantItemModal} /> : undefined}
              {isEmpty(folderId) ? (
                <Fragment>
                  {redactionAllowed && (
                    <AddCollectionFolder onClick={HandleCreateCollectionFolderModal} />
                  )}
                  {fetchCollectionFolders.data?.map((folder) => (
                    <CollectionFolder
                      key={folder.id}
                      folder={folder}
                      onClick={handleClickOnFolder}
                      redactionClick={
                        redactionAllowed
                          ? () =>
                              HandleEditCollectionFolderModal({ ...folder, folderId: folder.id })
                          : undefined
                      }
                    />
                  ))}
                  {fetchPlants.data?.map((plant) => (
                    <PlantItem
                      key={plant.id}
                      plant={plant}
                      onClick={() => HandlePlantModal(plant)}
                    />
                  ))}
                </Fragment>
              ) : (
                fetchFolderPlants.data?.map((plant) => (
                  <PlantItem key={plant.id} plant={plant} onClick={() => HandlePlantModal(plant)} />
                ))
              )}
            </Fragment>
          ) : (
            <Fragment>
              {redactionAllowed && (
                <AddPlantCollection onClick={HandleCreatePlantCollectionModal} />
              )}
              {fetchCollections.data?.map((collection) => (
                <PlantCollection
                  key={collection.id}
                  collection={collection}
                  onClick={handleClickOnCollection}
                  redactionClick={
                    redactionAllowed
                      ? () =>
                          HandleEditCollectionModal({ ...collection, collectionId: collection.id })
                      : undefined
                  }
                />
              ))}
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};
