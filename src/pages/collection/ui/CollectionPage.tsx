import { isEmpty, isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC, Fragment, useCallback, useState } from 'react';
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
import {
  collectionFoldersFetchKey,
  collectionsFetchKey,
  folderPlantsFetchKey,
  plantsFetchKey,
  useApiQuery,
  type IPlant,
  type ICollection,
  type IFolder,
  collectionFetchKey,
  type IEditCollectionRequest,
  type IEditFolderRequest,
  collectionCreateKey,
} from '@/shared/api';
import { addToaster } from '@/shared/global';
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

  const fetchCollections = useApiQuery(collectionsFetchKey, undefined, {
    enabled: isEmpty(collectionId),
  });

  let currentCollection: ICollection<Date> | undefined;
  currentCollection = undefined;
  if (!isEmpty(fetchCollections.data) && !isEmpty(collectionId)) {
    for (const collection of fetchCollections.data) {
      if (collection.id === collectionId) {
        currentCollection = collection;
      }
    }
  }
  currentCollection = useApiQuery(
    collectionFetchKey,
    isEmpty(collectionId) ? undefined : { collectionId },
    {
      enabled: isEmpty(currentCollection) && !isEmpty(collectionId),
    },
  )?.data;

  const fetchCollectionFolders = useApiQuery(
    collectionFoldersFetchKey,
    isNotEmpty(collectionId) ? { collectionId } : undefined,
    { enabled: isNotEmpty(collectionId) },
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
  currentCollection = useApiQuery(
    collectionFetchKey,
    isEmpty(collectionId) ? undefined : { collectionId },
    {
      enabled: isEmpty(currentCollection) && !isEmpty(collectionId),
    },
  )?.data;

  const shouldRequestPlantsWithoutFolder = isNotEmpty(collectionId) && isEmpty(folderId);
  const fetchPlants = useApiQuery(
    plantsFetchKey,
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

  const handleClickOnPlant = useCallback(
    (currentPlantId: IPlant['id']) => {
      addToaster({ title: `Работа в процессе ${currentPlantId}`, type: 'info' });
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

  const CloseModal = async () => {
    setOpenedModal(false);
    justOpenedModal = false;
    await closeModal();
  };

  const HandleModal = async (children: JSX.Element, title: string) => {
    setOpenedModal(true);
    justOpenedModal = true;
    await openModal((props) => (
      <ModalOverlay
        onClose={CloseModal}
        title={title}
        isOpen={() => justOpenedModal || openedModal}
        key="modalOverlay"
      >
        {children}
      </ModalOverlay>
    ));
  };

  const HandleCreatePlantCollectionModal = async () => {
    await HandleModal(
      <CreateCollection
        onSubmit={CloseModal}
        ownerId={0} // TODO INSERT OWNER ID HERE
        key="createCollection"
      />,
      'Добавить коллекцию',
    );
  };

  const HandleCreateCollectionFolderModal = async () => {
    await HandleModal(
      <CreateCollectionFolder
        onSubmit={CloseModal}
        key={collectionCreateKey}
        collectionId={collectionId!}
      />,
      'Добавить папку',
    );
  };

  const HandleAddPlantItemModal = async () => {
    await HandleModal(
      <CreatePlant
        onSubmit={closeModal}
        ownerId={0} // TODO INSERT OWNER ID HERE
        collectionId={collectionId!}
        key="createPlant"
      />,
      'Добавить растение',
    );
  };

  const HandleEditCollectionModal = async (collection: IEditCollectionRequest) => {
    await HandleModal(
      <EditCollection collection={collection} onSubmit={CloseModal}></EditCollection>,
      'Изменение коллекции',
    );
  };

  const HandleEditCollectionFolderModal = async (folder: IEditFolderRequest) => {
    await HandleModal(
      <EditCollectionFolder folder={folder} onSubmit={CloseModal}></EditCollectionFolder>,
      'Изменение папки',
    );
  };

  return (
    <div className={classes.collectionPage}>
      <CollectionSideBar
        title={
          (isEmpty(collectionId)
            ? 'Моя коллекция'
            : isEmpty(folderId)
              ? currentCollection?.name
              : currentFolder?.name) ?? 'Моя коллекция'
        }
        goBack={isNotEmpty(collectionId) ? hangleClickGoBack : undefined}
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
              {isEmpty(folderId) ? (
                <Fragment>
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
                    <PlantItem key={plant.id} plant={plant} onClick={handleClickOnPlant} />
                  ))}
                  {redactionAllowed ? (
                    <AddCollectionFolder onClick={HandleCreateCollectionFolderModal} />
                  ) : undefined}
                </Fragment>
              ) : (
                fetchFolderPlants.data?.map((plant) => (
                  <PlantItem key={plant.id} plant={plant} onClick={handleClickOnPlant} />
                ))
              )}
              {redactionAllowed ? <AddPlantItem onClick={HandleAddPlantItemModal} /> : undefined}
            </Fragment>
          ) : (
            <Fragment>
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
              {redactionAllowed ? (
                <AddPlantCollection onClick={HandleCreatePlantCollectionModal} />
              ) : undefined}
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};
