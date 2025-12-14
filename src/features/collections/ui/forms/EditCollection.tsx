import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC, useId } from 'react';
import React from 'react';

import { CommonForm, PrettyInput } from '@/features/helpers';
import {
  collectionDeleteKey,
  collectionEditKey,
  type ICollection,
  type IEditCollectionRequest,
} from '@/shared/api';

export interface IEditCollectionProps {
  collection: IEditCollectionRequest;
  onSubmit?: (newCollection: ICollection) => void;
  onDeleteSubmit?: () => void;
}

export const EditCollection: FC<IEditCollectionProps> = ({
  collection,
  onSubmit,
  onDeleteSubmit,
}) => {
  const nameId = useId();
  return (
    <CommonForm
      commonKey={collectionEditKey}
      deleteKey={collectionDeleteKey}
      defaultRequestData={{
        name: collection.name ?? '',
        collectionId: collection.collectionId,
      }}
      deleteRequestData={{ collectionId: collection.collectionId }}
      submitButtonText="Изменить"
      onCommonSubmit={(res) => isNotEmpty(res) && onSubmit?.(res)}
      onDeleteSubmit={(res) => isNotEmpty(res) && onDeleteSubmit?.()}
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
        </>
      )}
    </CommonForm>
  );
};
