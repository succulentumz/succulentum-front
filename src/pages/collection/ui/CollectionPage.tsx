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
} from '@/features/collections';
import { ModalOverlay } from '@/features/helpers';
import {
  CreateCollection,
  CreateCollectionFolder,
  CreatePlant,
  EditCollection,
} from '@/features/plants';
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
} from '@/shared/api';
import { addToaster } from '@/shared/global';
import { useOpenModal } from '@/shared/global/modal/hooks/useOpenModal';
import { parseIntSafety } from '@/shared/helpers';
import { Splash } from '@/shared/ui';

import useStyles from './CollectionPage.styles';

export interface ICollectionPageProps {}

export const CollectionPage: FC<ICollectionPageProps> = () => {
  const classes = useStyles();

  const [params, setParams] = useSearchParams();
  const [openedModal, setOpenedModal] = useState(false);
  let justOpenedModal = false;

  const collectionId = parseIntSafety(params.get('collectionId'));
  const folderId = parseIntSafety(params.get('folderId'));

  const { data: collections } = useApiQuery(collectionsFetchKey, undefined, {
    enabled: isEmpty(collectionId),
  });

  let currentCollection: ICollection<Date> | undefined;
  currentCollection = undefined;
  if (isNotEmpty(collections) && isNotEmpty(collectionId)) {
    currentCollection = collections.find((c) => c.id === collectionId);
  }
  currentCollection = useApiQuery(
    collectionFetchKey,
    isEmpty(collectionId) ? undefined : { collectionId },
    {
      enabled: isEmpty(currentCollection) && isNotEmpty(collectionId),
    },
  )?.data;

  const { data: folders } = useApiQuery(
    collectionFoldersFetchKey,
    isNotEmpty(collectionId) ? { collectionId } : undefined,
    { enabled: isNotEmpty(collectionId) },
  );
  let currentFolder: IFolder<Date> | undefined;
  currentFolder = undefined;
  if (isNotEmpty(folders) && isNotEmpty(folderId)) {
    for (const folder of folders) {
      if (folder.id === folderId) {
        currentFolder = folder;
      }
    }
  }

  const shouldRequestPlantsWithoutFolder = isNotEmpty(collectionId) && isEmpty(folderId);
  const { data: plantsWithoutFolder } = useApiQuery(
    plantsFetchKey,
    shouldRequestPlantsWithoutFolder ? { collectionId, folderId: null } : undefined,
    { enabled: shouldRequestPlantsWithoutFolder },
  );

  const { data: plantsInFolder } = useApiQuery(
    folderPlantsFetchKey,
    isNotEmpty(folderId) ? { folderId } : undefined,
    { enabled: isNotEmpty(folderId) },
  );

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
        title={title}
        onClose={hangleCloseModal}
        isOpen={() => justOpenedModal || openedModal}
        key="modalOverlay"
      >
        {children}
      </ModalOverlay>
    ));
  };

  const HandleEditCollectionModal = async () => {
    await HandleModal(
      <EditCollection
        collectionId={collectionId!}
        name={currentCollection?.name}
        isShared={currentCollection?.isShared}
        createdAt={currentCollection?.createdAt}
        description={currentCollection?.description}
        onSubmit={hangleCloseModal}
      ></EditCollection>,
      'Изменение коллекции',
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
          isEmpty(collectionId)
            ? undefined
            : isEmpty(folderId)
              ? HandleEditCollectionModal
              : undefined
        }
      />
      {isEmpty(collectionId) && isEmpty(collections) ? (
        <Splash icon="eyes">Коллекция не найдена!</Splash>
      ) : (
        <div className={classes.content}>
          {isNotEmpty(collectionId) ? (
            <Fragment>
              {isEmpty(folderId) ? (
                <Fragment>
                  {folders?.map((folder) => (
                    <CollectionFolder
                      key={folder.id}
                      folderName={folder.name}
                      folderId={folder.id}
                      onClick={handleClickOnFolder}
                    />
                  ))}
                  {plantsWithoutFolder?.map((plant) => (
                    <PlantItem
                      key={plant.id}
                      plantName={plant.name}
                      plantId={plant.id}
                      plantPhotoId={plant.photoId}
                      onClick={handleClickOnPlant}
                    />
                  ))}
                  <AddCollectionFolder
                    onClick={() =>
                      HandleModal(
                        <CreateCollectionFolder key="createCollectionFolder" />,
                        'Добавить папку',
                      )
                    }
                  />
                </Fragment>
              ) : (
                plantsInFolder?.map((plant) => (
                  <PlantItem
                    key={plant.id}
                    plantName={plant.name}
                    plantId={plant.id}
                    plantPhotoId={plant.photoId}
                    onClick={handleClickOnPlant}
                  />
                ))
              )}
              <AddPlantItem
                onClick={() => HandleModal(<CreatePlant key="createPlant" />, 'Добавить растение')}
              />
            </Fragment>
          ) : (
            <Fragment>
              {collections?.map((collection) => (
                <PlantCollection
                  key={collection.id}
                  collectionName={collection.name}
                  collectionId={collection.id}
                  collectionDescription={collection.description}
                  onClick={handleClickOnCollection}
                  redactionClick={HandleEditCollectionModal}
                />
              ))}
              <AddPlantCollection
                onClick={() =>
                  HandleModal(
                    <CreateCollection
                      onSubmit={hangleCloseModal}
                      key="createCollection"
                      ownerId={0} // TODO INSERT OWNER ID HERE
                    />,
                    'Добавить коллекцию',
                  )
                }
              />
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};
