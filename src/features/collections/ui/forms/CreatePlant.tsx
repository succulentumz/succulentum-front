import { isEmpty, isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import React, { type FC, useId } from 'react';

import { CommonForm, PrettyInput } from '@/features/helpers';
import { type IApiRequest, type IPlant, IPlantLifeStatus, plantCreateKey } from '@/shared/api';

export interface ICreatePlantProps {
  ownerId: IPlant['ownerId'];
  collectionId: IPlant['collectionId'];
  folderId?: IPlant['folderId'];
  onSubmit?: (newPlant: IPlant) => void;
}

interface IFormExtra {
  birthDateString?: string;
}

type IForm = IApiRequest<'createPlant'> & IFormExtra;

export const CreatePlant: FC<ICreatePlantProps> = ({
  collectionId,
  folderId,
  ownerId,
  onSubmit,
}) => {
  const nameId = useId();
  const genusId = useId();
  const speciesId = useId();
  const varietyId = useId();
  const locationId = useId();
  const sourceId = useId();
  const birthDateId = useId();

  return (
    <CommonForm<'createPlant', never, IForm>
      commonKey={plantCreateKey}
      defaultRequestData={{
        collectionId,
        folderId,
        ownerId,
        name: '',
        lifeStatus: IPlantLifeStatus.ALIVE,
      }}
      submitButtonText="Создать"
      onCommonSubmit={(res) => isNotEmpty(res) && onSubmit?.(res)}
      deleteRequestData={undefined as never}
      formatter={(f) => ({
        ...f,
        birthDate: isEmpty(f.birthDateString) ? undefined : new Date(f.birthDateString),
      })}
    >
      {(handleChange, form) => (
        <>
          <label htmlFor={nameId}>Название растения:</label>
          <PrettyInput
            type="text"
            value={form.name}
            onChange={handleChange}
            autoComplete="plant-name"
            name="name"
            id={nameId}
          />
          <label htmlFor={genusId}>Род:</label>
          <PrettyInput
            type="text"
            value={form.genus}
            onChange={handleChange}
            autoComplete="plant-genus"
            name="genus"
            id={genusId}
          />
          <label htmlFor={speciesId}>Вид:</label>
          <PrettyInput
            type="text"
            value={form.species}
            onChange={handleChange}
            autoComplete="plant-species"
            name="species"
            id={speciesId}
          />
          <label htmlFor={varietyId}>Сорт растения:</label>
          <PrettyInput
            type="text"
            value={form.variety}
            onChange={handleChange}
            autoComplete="plant-variety"
            name="variety"
            id={varietyId}
          />
          <label htmlFor={locationId}>Местоположение:</label>
          <PrettyInput
            type="text"
            value={form.location}
            onChange={handleChange}
            autoComplete="location"
            name="location"
            id={locationId}
          />
          <label htmlFor={sourceId}>Происхождение:</label>
          <PrettyInput
            type="text"
            value={form.source}
            onChange={handleChange}
            autoComplete="source"
            name="source"
            id={sourceId}
          />
          <label htmlFor={birthDateId}>Дата посадки:</label>
          <PrettyInput
            type="date"
            value={form.birthDateString}
            onChange={handleChange}
            name="birthDate"
            id={birthDateId}
          />
        </>
      )}
    </CommonForm>
  );
};
