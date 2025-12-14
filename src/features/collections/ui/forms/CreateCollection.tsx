import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC, useId } from 'react';
import React from 'react';

import { CommonForm, PrettyInput } from '@/features/helpers';
import { collectionCreateKey, type ICollection, type ICreateCollectionRequest } from '@/shared/api';

export interface ICreateCollectionProps {
  ownerId: ICreateCollectionRequest['ownerId'];
  onSubmit?: (newCollection: ICollection) => void;
}

export const CreateCollection: FC<ICreateCollectionProps> = ({ ownerId, onSubmit }) => {
  const id = useId();
  return (
    <CommonForm
      commonKey={collectionCreateKey}
      defaultRequestData={{ ownerId, name: '', isShared: false }}
      onCommonSubmit={(res) => isNotEmpty(res) && onSubmit?.(res)}
      submitButtonText="Создать"
      deleteRequestData={undefined}
    >
      {(handleChange, form) => (
        <>
          <label htmlFor={id}>Название коллекции:</label>
          <PrettyInput
            type="text"
            value={form.name}
            onChange={handleChange}
            autoComplete="off"
            name="name"
            id={id}
          />
        </>
      )}
    </CommonForm>
  );
};
