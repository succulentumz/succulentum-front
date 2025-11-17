import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC } from 'react';
import React, { useState } from 'react';

import { PrettyButton, PrettyInput } from '@/features/helpers/ui/PrettyComponents';
import {
  collectionCreateKey,
  collectionEditKey,
  type ICollection,
  IEditCollectionRequest,
  IEditCollectionRequestBody,
  useApiQuery,
} from '@/shared/api';
import { addToaster } from '@/shared/global';

import useStyles from './EditCollection.styles';

export interface IEditCollectionProps extends IEditCollectionRequest {
  onSubmit?: () => void;
}

interface FormData extends IEditCollectionRequestBody {
  submit: boolean;
}

export const EditCollection: FC<IEditCollectionProps> = ({
  collectionId,
  name,
  description,
  isShared,
  onSubmit,
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState<FormData>({
    name: name ?? '',
    description,
    isShared: isShared ?? false,
    submit: false,
  });

  const { data, error, isError, isLoading } = useApiQuery(
    collectionEditKey,
    { ...formData, collectionId },
    { enabled: formData.submit },
  );

  if (isNotEmpty(data)) {
    console.log(isLoading, formData.submit);
    //setFormData((prev) => ({ ...prev, submit: false }));//todo fix bug
    onSubmit?.();
    if (isError) {
      console.error('Error creating Collection\n', error);
      addToaster({ type: 'error', text: 'Ошибка!' });
    } else {
      addToaster({ type: 'ok', text: 'Успех!' });
      console.log(data);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, submit: true }));
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Название коллекции:</label>
        <PrettyInput type="text" value={formData.name} onChange={handleChange} autoComplete="off" />
      </div>
      <div>
        <label>Описание коллекции:</label>
        <PrettyInput type="text" value={formData.description} onChange={handleChange} autoComplete="off" />
      </div>

      <PrettyButton type="submit">Создать</PrettyButton>
    </form>
  );
};
