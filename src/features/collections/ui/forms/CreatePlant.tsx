import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import React, { type FC, useId } from 'react';

import { CommonForm, PrettyInput } from '@/features/helpers';
import { type IPlant, IPlantLifeStatus, plantCreateKey } from '@/shared/api';

export interface ICreatePlantProps {
  ownerId: IPlant['ownerId'];
  collectionId: IPlant['collectionId'];
  folderId?: IPlant['folderId'];
  onSubmit?: (newPlant: IPlant) => void;
}

export const CreatePlant: FC<ICreatePlantProps> = ({
  collectionId,
  folderId,
  ownerId,
  onSubmit,
}) => {
  const id1 = useId();
  return (
    <CommonForm
      commonKey={plantCreateKey}
      defaultRequestData={{
        collectionId,
        folderId,
        ownerId,
        name: '',
        lifeStatus: IPlantLifeStatus.ALIVE,
      }}
      submitButtonText="Создать"
      onCommonSubmit={res => isNotEmpty(res) && onSubmit?.(res)}
      deleteRequestData={undefined}
    >
      {(handleChange, form) => (
        <>
          <label htmlFor={id1}>Название растения:</label>
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
