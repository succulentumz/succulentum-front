import { isEmpty, isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC, Fragment, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CollectionFolder, PlantItem } from '@/features/collections';
import { PlantCollection } from '@/features/collections/ui/PlantCollection';
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
import { parseIntSafety } from '@/shared/helpers';
import { Splash } from '@/shared/ui';

import useStyles from './CollectionPage.styles';

export interface ICollectionPageProps {}

export const CollectionPage: FC<ICollectionPageProps> = () => {
  const classes = useStyles();

  const [params, setParams] = useSearchParams();

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

  const onWorkInProgress = useCallback(
    () => addToaster({ title: 'Работа в процессе', type: 'info' }),
    [],
  );

  return (
    <div className={classes.collectionPage}>
      <div className={classes.sidebar}>
        <div className={classes.sidebarHeader}>
          <h2>Моя коллекция =)</h2>
        </div>
        <div className={classes.sidebarMain}>
          <form>
            <div className={classes.inputBox}>
              <input type="search" className={classes.searchbar} placeholder="Поиск" />
            </div>
          </form>
          <form>
            <h4>Фильтры:</h4>
            <hr />
            <h4>Дата создания:</h4>
            <div className={classes.filterContainer}>
              <div className={classes.inputBox}>
                <div className={classes.filterbox}>
                  <div className={classes.smallLeftFilterLabel}>от:</div>
                  <input className={classes.filterbar} type="date" />
                </div>
              </div>
              <div className={classes.inputBox}>
                <div className={classes.filterbox}>
                  <div className={classes.smallLeftFilterLabel}>до:</div>
                  <input className={classes.filterbar} type="date" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <button className={classes.backButton}>Назад</button>
      </div>
      {isEmpty(collectionId) && isEmpty(collections) ? (
        <Splash icon="eyes">Коллекция не найдена!</Splash>
      ) : (
        <div className={classes.content}>
          {isNotEmpty(collectionId) ? (
            isEmpty(folderId) ? (
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
            )
          ) : (
            collections?.map((collection) => (
              <PlantCollection
                key={collection.id}
                collectionName={collection.name}
                collectionId={collection.id}
                onClick={handleClickOnCollection}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};
