import { type FC, useId } from 'react';
import React from 'react';

import { CommonForm, PrettyInput } from '@/features/helpers';
import { collectionCreateKey, type ICreateCollectionRequest } from '@/shared/api';

export interface ICreateCollectionProps {
  ownerId: ICreateCollectionRequest['ownerId'];
  onSubmit?: () => void;
}

export const CreateCollection: FC<ICreateCollectionProps> = ({ ownerId, onSubmit }) => {
  const id1 = useId();
  return (
    <CommonForm
      commonKey={collectionCreateKey}
      defaultRequestData={{ ownerId, name: '', isShared: false }}
      deleteRequestData={undefined}
      onSubmit={onSubmit}
      submitButtonText="Создать"
    >
      {(handleChange, form) => (
        <>
          <label htmlFor={id1}>Название коллекции:</label>
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
