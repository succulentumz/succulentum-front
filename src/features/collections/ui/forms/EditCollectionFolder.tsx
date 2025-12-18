import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC, useId } from 'react';
import React from 'react';

import { CommonForm, PrettyInput } from '@/features/helpers';
import {
  folderDeleteKey,
  folderEditKey,
  type IEditFolderRequest,
  type IFolder,
} from '@/shared/api';

export interface IEditCollectionFolderProps {
  folder: IEditFolderRequest;
  onSubmit?: (newFolder: IFolder) => void;
  onDeleteSubmit?: () => void;
}

export const EditCollectionFolder: FC<IEditCollectionFolderProps> = ({
  folder,
  onSubmit,
  onDeleteSubmit,
}) => {
  const id1 = useId();
  return (
    <CommonForm
      commonKey={folderEditKey}
      deleteKey={folderDeleteKey}
      defaultRequestData={{
        name: folder.name ?? '',
        collectionId: folder.collectionId,
        folderId: folder.folderId,
      }}
      deleteRequestData={{ folderId: folder.folderId }}
      submitButtonText="Изменить"
      onCommonSubmit={(res) => isNotEmpty(res) && onSubmit?.(res)}
      onDeleteSubmit={(res) => isNotEmpty(res) && onDeleteSubmit?.()}
    >
      {(handleChange, formData) => (
        <>
          <label htmlFor={id1}>Название папки:</label>
          <PrettyInput
            type="text"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
            name="name"
            id={id1}
          />
        </>
      )}
    </CommonForm>
  );
};
