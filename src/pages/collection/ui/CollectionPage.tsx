import { isEmpty, isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC, Fragment, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  CollectionSideBar,
  PlantCollection,
  CollectionFolder,
  PlantItem,
  AddPlantItem,
  AddCollectionFolder,
} from '@/features/collections';
import { ModalOverlay } from '@/features/helpers';
import { CreateCollection, CreateCollectionFolder, CreatePlant } from '@/features/plants';
import {
  collectionFoldersFetchKey,
  collectionsFetchKey,
  folderPlantsFetchKey,
  plantsFetchKey,
  useApiQuery,
  type IPlant,
  type ICollection,
  type IFolder,
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

  const { data: folders } = useApiQuery(
    collectionFoldersFetchKey,
    isNotEmpty(collectionId) ? { collectionId } : undefined,
    { enabled: isNotEmpty(collectionId) },
  );

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

  const HandleModal = async (children: JSX.Element) => {
    setOpenedModal(true);
    justOpenedModal = true;
    await openModal((props) => (
      <ModalOverlay
        title="Добавить растение"
        onClose={async () => {
          setOpenedModal(false);
          justOpenedModal = false;
          await closeModal();
        }}
        isOpen={() => justOpenedModal || openedModal}
        key="modalOverlay"
      >
        {children}
      </ModalOverlay>
    ));
  };

  const onWorkInProgress = useCallback(
    () => addToaster({ title: 'Работа в процессе', type: 'info' }),
    [],
  );

  return (
    <div className={classes.collectionPage}>
      <CollectionSideBar title="Моя коллекция =)" goBackClick={hangleClickGoBack} />
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
                      HandleModal(<CreateCollectionFolder key="createCollectionFolder" />)
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
              <AddPlantItem onClick={() => HandleModal(<CreatePlant key="createPlant" />)} />
            </Fragment>
          ) : (
            <Fragment>
              {collections?.map((collection) => (
                <PlantCollection
                  key={collection.id}
                  collectionName={collection.name}
                  collectionId={collection.id}
                  onClick={handleClickOnCollection}
                />
              ))}
              {/*<AddCollection*/}
              {/*  onClick={() => HandleModal(<CreateCollection key="createCollection" />)}*/}
              {/*/>*/}
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};
