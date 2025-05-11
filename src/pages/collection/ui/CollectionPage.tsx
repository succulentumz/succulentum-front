import { CollectionFolder, PlantItem } from '@/features/collections';
import { FC, Fragment, useCallback } from 'react';
import useStyles from './CollectionPage.styles';
import {
  IFolder,
  collectionFoldersFetchKey,
  folderPlantsFetchKey,
  plantsFetchKey,
  useApiQuery,
} from '@/shared/api';
import { useSearchParams } from 'react-router-dom';
import { parseIntSafety } from '@/shared/helpers';
import { isEmpty, isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { Splash } from '@/shared/ui';
import { addToaster } from '@/shared/global';

export interface ICollectionPageProps {}

export const CollectionPage: FC<ICollectionPageProps> = () => {
  const classes = useStyles();

  const [params, setParams] = useSearchParams();

  const collectionId = parseIntSafety(params.get('collectionId'));
  const folderId = parseIntSafety(params.get('folderId'));

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
    (folderId: IFolder['id']) => {
      const newParams = new URLSearchParams(params);
      newParams.set('folderId', folderId.toString());
      setParams(newParams);
    },
    [params],
  );

  const onWorkInProgress = useCallback(
    () => addToaster({ title: 'Работа в процессе', type: 'info' }),
    [],
  );

  return (
    <div className={classes.collectionPage}>
      {isEmpty(collectionId) ? (
        <Splash icon="eyes">Коллекция не найдена!</Splash>
      ) : (
        <div className={classes.content}>
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
                  onClick={onWorkInProgress}
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
                onClick={onWorkInProgress}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};
