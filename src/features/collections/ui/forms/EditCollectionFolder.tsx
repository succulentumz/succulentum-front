import { type FC, useId } from 'react';
import React from 'react';

import { CommonForm, PrettyInput } from '@/features/helpers';
import {
  folderDeleteKey,
  folderEditKey,
  type IEditFolderRequest,
} from '@/shared/api';

export interface IEditCollectionFolderProps {
  folder: IEditFolderRequest;
  onSubmit?: () => void;
}

export const EditCollectionFolder: FC<IEditCollectionFolderProps> = ({ folder, onSubmit }) => {
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
      onSubmit={onSubmit}
    >
      {(handleChange, formData) => (
        <>
          <label htmlFor={id1}>Название папки:</label>
          <PrettyInput
            type="text"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
            id={id1}
          />
        </>
      )}
    </CommonForm>
  );
};
