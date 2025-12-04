import React, { type FC, useId } from 'react';

import { CommonForm, PrettyInput } from '@/features/helpers';
import { type ICreatePlantRequest, IPlantLifeStatus, plantCreateKey } from '@/shared/api';

export interface ICreatePlantProps {
  ownerId: ICreatePlantRequest['ownerId'];
  collectionId: ICreatePlantRequest['collectionId'];
  folderId?: ICreatePlantRequest['folderId'];
  onSubmit?: () => void;
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
      deleteRequestData={undefined}
      submitButtonText="Создать"
      onSubmit={onSubmit}
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
