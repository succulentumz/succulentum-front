import { type FC, useId } from 'react';
import React from 'react';

import { CommonForm, PrettyInput } from '@/features/helpers';
import { collectionDeleteKey, collectionEditKey, type IEditCollectionRequest } from '@/shared/api';

export interface IEditCollectionProps {
  collection: IEditCollectionRequest;
  onSubmit?: () => void;
}

export const EditCollection: FC<IEditCollectionProps> = ({ collection, onSubmit }) => {
  const nameId = useId();
  const descriptionId = useId();
  return (
    <CommonForm
      commonKey={collectionEditKey}
      deleteKey={collectionDeleteKey}
      defaultRequestData={{
        name: collection.name ?? '',
        description: collection.description,
        collectionId: collection.collectionId,
      }}
      deleteRequestData={{ collectionId: collection.collectionId }}
      submitButtonText="Изменить"
      onCommonSubmit={onSubmit}
      onDeleteSubmit={onSubmit}
    >
      {(handleChange, formData) => (
        <>
          <div>
            <label htmlFor={nameId}>Название коллекции:</label>
            <PrettyInput
              type="text"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              name="name"
              id={nameId}
            />
          </div>
          <div>
            <label htmlFor={descriptionId}>Описание коллекции:</label>
            <PrettyInput
              type="text"
              value={formData.description}
              onChange={handleChange}
              autoComplete="off"
              name="description"
              id={descriptionId}
            />
          </div>
        </>
      )}
    </CommonForm>
  );
};
