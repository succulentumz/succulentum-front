import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC } from 'react';
import React, { useState } from 'react';

import { PrettyButton, PrettyInput } from '@/features/helpers/ui/PrettyComponents';
import { collectionCreateKey, type ICreateCollectionRequest, useApiQuery } from '@/shared/api';
import { addToaster } from '@/shared/global';

import useStyles from './CreateCollection.styles';
import createCollection from '@/shared/api/config/collection/requests/collection/create-collection';

export interface ICreateCollectionProps {
  ownerId: ICreateCollectionRequest['ownerId'];
  onSubmit?: () => void;
}

interface FormData extends ICreateCollectionRequest {
  submit: boolean;
}

export const CreateCollection: FC<ICreateCollectionProps> = ({ ownerId, onSubmit }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: undefined,
    isShared: false,
    sharedLink: undefined,
    ownerId,
    submit: false,
  });

  const { data, error, isError, isLoading } = useApiQuery(collectionCreateKey, formData, {
    enabled: formData.submit,
  });

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
        <PrettyInput
          type="text"
          value={formData.name}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <PrettyButton type="submit">Создать</PrettyButton>
    </form>
  );
};
