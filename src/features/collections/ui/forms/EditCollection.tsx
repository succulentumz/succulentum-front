import { type FC, useId } from 'react';
import React from 'react';

import { CommonForm, PrettyInput } from '@/features/helpers';
import { collectionDeleteKey, collectionEditKey, type IEditCollectionRequest } from '@/shared/api';

export interface IEditCollectionProps {
  collection: IEditCollectionRequest;
  onSubmit?: () => void;
}

export const EditCollection: FC<IEditCollectionProps> = ({ collection, onSubmit }) => {
  const id1 = useId();
  const id2 = useId();
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
      onSubmit={onSubmit}
    >
      {(handleChange, formData) => (
        <>
          <div>
            <label htmlFor={id1}>Название коллекции:</label>
            <PrettyInput
              type="text"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              id={id1}
            />
          </div>
          <div>
            <label htmlFor={id2}>Описание коллекции:</label>
            <PrettyInput
              type="text"
              value={formData.description}
              onChange={handleChange}
              autoComplete="off"
              id={id2}
            />
          </div>
        </>
      )}
    </CommonForm>
  );
};
