import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type ReactNode, useEffect } from 'react';
import React, { useState } from 'react';

import { DeleteButton, PrettyButton } from '@/features/helpers/ui/PrettyComponents';
import { type IApiQueryKey, type IApiRequest, useApiQuery } from '@/shared/api';
import { addToaster } from '@/shared/global';

import useStyles from './CommonForm.styles';

export interface ICommonFormProps<
  CommonRequest extends IApiQueryKey,
  DeleteRequest extends IApiQueryKey | never,
> {
  commonKey: CommonRequest;
  deleteKey?: DeleteRequest;
  defaultRequestData: IApiRequest<CommonRequest>;
  deleteRequestData: DeleteRequest extends never ? undefined : IApiRequest<DeleteRequest>;
  onSubmit?: () => void;
  submitButtonText: string;
  children: (
    handler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    form: IApiRequest<CommonRequest>,
  ) => ReactNode;
}

interface FormData<K extends IApiQueryKey> {
  form: IApiRequest<K>;
  submit: boolean;
  delete: boolean;
}

export function CommonForm<CommonRequest extends IApiQueryKey, DeleteRequest extends IApiQueryKey>({
  commonKey,
  deleteKey,
  defaultRequestData,
  deleteRequestData,
  onSubmit,
  submitButtonText,
  children,
}: ICommonFormProps<CommonRequest, DeleteRequest>) {
  const classes = useStyles();

  const [formData, setFormData] = useState<FormData<CommonRequest>>({
    form: defaultRequestData,
    submit: false,
    delete: false,
  });

  const { data, error, isError } = useApiQuery(commonKey, formData.form, {
    enabled: formData.submit,
  });

  const {
    data: dData,
    error: dError,
    isError: dIsError,
  } = useApiQuery(deleteKey, deleteRequestData, {
    enabled: formData.delete,
  });

  useEffect(() => {
    if (isNotEmpty(data) && formData.submit) {
      setFormData((prev) => ({ ...prev, submit: false }));
      onSubmit?.();
      if (isError) {
        console.error('Error creating Collection\n', error);
        addToaster({ type: 'error', text: 'Ошибка!' });
      } else {
        addToaster({ type: 'ok', text: 'Успех!' });
      }
    } else if (isNotEmpty(dData) && formData.delete) {
      setFormData((prev) => ({ ...prev, delete: false }));
      onSubmit?.();
      if (dIsError) {
        console.error('Error creating Collection\n', dError);
        addToaster({ type: 'error', text: 'Ошибка!' });
      } else {
        addToaster({ type: 'ok', text: 'Успех!' });
      }
    }
  }, [dData, dError, dIsError, data, error, formData, isError, onSubmit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      form: { ...prev.form, [name]: type === 'checkbox' ? checked : value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, submit: true }));
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, delete: true }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {children(handleChange, formData.form)}
      <div className={classes.footer}>
        <PrettyButton type="submit">{submitButtonText}</PrettyButton>
        {deleteKey === undefined ? undefined : (
          <DeleteButton type="button" onClick={handleDelete}>
            УДАЛИТЬ
          </DeleteButton>
        )}
      </div>
    </form>
  );
}
