import React, { type FC, useId } from 'react';

import { CommonForm, PrettyInput } from '@/features/helpers';
import { folderCreateKey, type IFolder } from '@/shared/api';

export interface ICreateCollectionFolderProps {
  collectionId: IFolder['collectionId'];
  onSubmit?: () => void;
}

export const CreateCollectionFolder: FC<ICreateCollectionFolderProps> = ({
  collectionId,
  onSubmit,
}) => {
  const id1 = useId();
  return (
    <CommonForm
      commonKey={folderCreateKey}
      defaultRequestData={{ collectionId, name: '' }}
      submitButtonText="Создать"
      onCommonSubmit={onSubmit}
      deleteRequestData={undefined}
    >
      {(handleChange, form) => (
        <>
          <label htmlFor={id1}>Название папки:</label>
          <PrettyInput
            type="text"
            value={form.name}
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
