import { isEmpty, isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC, Fragment, type ReactNode, useCallback, useState } from 'react';
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
  // folderPlantsFetchKey,
  collectionPlantsFetchKey,
  useApiQuery,
  type ICollection,
  type IFolder,
  type IEditCollectionRequest,
  type IEditFolderRequest,
  collectionCreateKey,
  type IPlant,
  plantsFetchKey,
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
  const showPublicToken = false;

  const [collections, setCollections] = useState<ICollection[] | undefined>();
  const [allCollectionFolders, setAllCollectionFolders] = useState<
    Map<ICollection['id'], IFolder[]>
  >(new Map());
  const [allPlants, setAllPlants] = useState<Map<ICollection['id'], IPlant[]>>(new Map());
  const [allFolderPlants, setAllFolderPlants] = useState<Map<IFolder['id'], IPlant[]>>(new Map());

  let done = true;

  const fetchCollections = useApiQuery(
    collectionsFetchKey,
    {},
    { enabled: isEmpty(collectionId) && isEmpty(collections) },
  );

  if (isNotEmpty(fetchCollections.data) && isEmpty(collections)) {
    setCollections(fetchCollections.data);
    done = false;
  }
  const currentCollectionIndex = collections?.findIndex((c) => c.id === collectionId);
  const currentCollection = isNotEmpty(currentCollectionIndex)
    ? collections?.[currentCollectionIndex]
    : undefined;

  const collectionFolders = isNotEmpty(collectionId)
    ? allCollectionFolders?.get(collectionId)
    : undefined;
  const shouldFetchCollectionFolders = isEmpty(collectionFolders) && isNotEmpty(collectionId);
  const fetchCollectionFolders = useApiQuery(
    collectionFoldersFetchKey,
    shouldFetchCollectionFolders ? { collectionId } : undefined,
    { enabled: shouldFetchCollectionFolders },
  );
  if (isNotEmpty(fetchCollectionFolders.data) && isEmpty(collectionFolders)) {
    allCollectionFolders.set(collectionId!, fetchCollectionFolders.data);
    setAllCollectionFolders(allCollectionFolders);
    done = false;
  }
  const currentFolderIndex = collectionFolders?.findIndex((f) => f.id === folderId);
  const currentFolder = isNotEmpty(currentFolderIndex)
    ? collectionFolders?.[currentFolderIndex]
    : undefined;

  const plants =
    isNotEmpty(collectionId) && isEmpty(folderId) ? allPlants.get(collectionId) : undefined;
  const shouldFetchPlants = isEmpty(plants) && isNotEmpty(collectionId) && isEmpty(folderId);
  const fetchPlants = useApiQuery(
    collectionPlantsFetchKey,
    shouldFetchPlants ? { collectionId } : undefined,
    { enabled: shouldFetchPlants },
  );
  if (isNotEmpty(fetchPlants.data) && isEmpty(plants)) {
    allPlants.set(collectionId!, fetchPlants.data);
    setAllPlants(allPlants);
    done = false;
  }

  const folderPlants = isNotEmpty(folderId) ? allFolderPlants.get(folderId) : undefined;
  const shouldFetchFolderPlants = isEmpty(folderPlants) && isNotEmpty(folderId);
  const fetchFolderPlants = useApiQuery(
    plantsFetchKey,
    shouldFetchFolderPlants ? { filter: { folderId } } : undefined,
    { enabled: shouldFetchFolderPlants },
  );
  if (isNotEmpty(fetchFolderPlants.data) && isEmpty(folderPlants)) {
    allFolderPlants.set(folderId!, fetchFolderPlants.data);
    setAllFolderPlants(allFolderPlants);
    done = false;
  }

  const isLoading =
    !done ||
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

  const HandleJournalModal = async (plant: IPlant, plantIndex: number, isInFolder: boolean) => {
    await HandleModal(
      <Journal plantId={plant.id} key="journal" redactionAllowed={redactionAllowed} />,
      'Журнал растения',
      () => handleCloseModal().then(() => HandlePlantModal(plant, plantIndex, isInFolder)),
      () => document.getElementById(JournalId)?.click(),
    );
  };

  const HandlePlantModal = async (plant: IPlant, index: number, isInFolder: boolean) => {
    await HandleModal(
      <PlantModal
        onClose={handleCloseModal}
        plant={plant}
        redactionAllowed={redactionAllowed}
        key="plantModal"
        openJournal={() =>
          handleCloseModal().then(() => HandleJournalModal(plant, index, isInFolder))
        }
        onRedactionSubmit={(newPlant) => {
          if (isInFolder) {
            folderPlants?.splice(index, 1, newPlant);
            setAllFolderPlants(allFolderPlants);
          } else {
            plants?.splice(index, 1, newPlant);
            setAllPlants(allPlants);
          }
        }}
        onDeleteSubmit={() => {
          handleCloseModal();
          if (isInFolder) {
            folderPlants?.splice(index, 1);
            setAllFolderPlants(allFolderPlants);
          } else {
            plants?.splice(index, 1);
            setAllPlants(allPlants);
          }
        }}
      />,
      plant.name,//<--- здесь можешь поменять имя растения на что-то другое, например "растение"
    );
  };

  const HandleCreatePlantCollectionModal = async () => {
    await HandleModal(
      <CreateCollection
        onSubmit={(newCollection) => {
          handleCloseModal();
          collections?.push(newCollection);
          setCollections(collections);
        }}
        ownerId={0} // TODO INSERT OWNER ID HERE
        key="createCollection"
      />,
      'Добавить коллекцию',
    );
  };

  const HandleCreateCollectionFolderModal = async () => {
    await HandleModal(
      <CreateCollectionFolder
        onSubmit={(newFolder) => {
          handleCloseModal();
          allCollectionFolders.get(collectionId!)?.push(newFolder);
          setAllCollectionFolders(allCollectionFolders);
        }}
        key={collectionCreateKey}
        collectionId={collectionId!}
      />,
      'Добавить папку',
    );
  };

  const HandleAddPlantItemModal = async () => {
    await HandleModal(
      <CreatePlant
        onSubmit={(newPlant) => {
          handleCloseModal();
          if (isEmpty(folderId)) {
            allPlants.get(collectionId!)?.push(newPlant);
            setAllPlants(allPlants);
          } else {
            allFolderPlants.get(folderId)?.push(newPlant);
            setAllFolderPlants(allFolderPlants);
          }
        }}
        folderId={folderId}
        ownerId={0} // TODO INSERT OWNER ID HERE
        collectionId={collectionId!}
        key="createPlant"
      />,
      'Добавить растение',
    );
  };

  const HandleEditCollectionModal = async (collection: IEditCollectionRequest, index: number) => {
    await HandleModal(
      <EditCollection
        collection={collection}
        onSubmit={(newCollection) => {
          handleCloseModal();
          collections?.splice(index, 1, newCollection);
          setCollections(collections);
        }}
        onDeleteSubmit={() => {
          handleCloseModal();
          collections?.splice(index, 1);
          setCollections(collections);
        }}
      />,
      'Изменение коллекции',
    );
  };

  const HandleEditCollectionFolderModal = async (folder: IEditFolderRequest, index: number) => {
    await HandleModal(
      <EditCollectionFolder
        folder={folder}
        onSubmit={(newFolder) => {
          handleCloseModal();
          allCollectionFolders.get(folder.collectionId)?.splice(index, 1, newFolder);
          setAllCollectionFolders(allCollectionFolders);
        }}
        onDeleteSubmit={() => {
          handleCloseModal();
          allCollectionFolders.get(folder.collectionId)?.splice(index, 1);
          setCollections(collections);
        }}
      />,
      'Изменение папки',
    );
  };

  const sharedLink =
    showPublicToken && isEmpty(folderId)
      ? `${window.location.protocol}//${window.location.host}/shared?token=${currentCollection?.sharedLink}`
      : undefined;

  return (
    <div className={classes.collectionPage}>
      <CollectionSideBar
        title={(isEmpty(folderId) ? currentCollection?.name : currentFolder?.name) ?? 'Каталог'}
        goBack={isNotEmpty(collectionId) ? hangleClickGoBack : undefined}
        sharedLink={showPublicToken ? sharedLink : undefined}
        token={showPublicToken ? currentCollection?.sharedLink : undefined}
        change={
          !redactionAllowed || isEmpty(collectionId)
            ? undefined
            : isEmpty(folderId)
              ? () =>
                  HandleEditCollectionModal(
                    { ...currentCollection!, collectionId },
                    currentCollectionIndex!,
                  )
              : () =>
                  HandleEditCollectionFolderModal(
                    { ...currentFolder!, folderId },
                    currentFolderIndex!,
                  )
        }
      />
      {isLoading ? (
        <Loader />
      ) : isEmpty(collectionId) && isEmpty(collections) ? (
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
                  {collectionFolders?.map((folder, index) => (
                    <CollectionFolder
                      key={folder.id}
                      folder={folder}
                      onClick={handleClickOnFolder}
                      redactionClick={
                        redactionAllowed
                          ? () =>
                              HandleEditCollectionFolderModal(
                                { ...folder, folderId: folder.id },
                                index,
                              )
                          : undefined
                      }
                    />
                  ))}
                  {plants?.map((plant, index) => (
                    <PlantItem
                      key={plant.id}
                      plant={plant}
                      onClick={() => HandlePlantModal(plant, index, false)}
                    />
                  ))}
                </Fragment>
              ) : (
                folderPlants?.map((plant, index) => (
                  <PlantItem
                    key={plant.id}
                    plant={plant}
                    onClick={() => HandlePlantModal(plant, index, true)}
                  />
                ))
              )}
            </Fragment>
          ) : (
            <Fragment>
              {redactionAllowed && (
                <AddPlantCollection onClick={HandleCreatePlantCollectionModal} />
              )}
              {collections?.map((collection, index) => (
                <PlantCollection
                  key={collection.id}
                  collection={collection}
                  onClick={handleClickOnCollection}
                  redactionClick={
                    redactionAllowed
                      ? () =>
                          HandleEditCollectionModal(
                            { ...collection, collectionId: collection.id },
                            index,
                          )
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
