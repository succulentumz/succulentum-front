import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import clsx from 'clsx';
import { type ReactNode, useEffect } from 'react';
import React, { useState } from 'react';

import { DeleteButton, PrettyButton } from '@/features/helpers/ui/PrettyComponents';
import { type IApiQueryKey, type IApiRequest, type IApiResponse, useApiQuery } from '@/shared/api';
import { addToaster } from '@/shared/global';

import useStyles from './CommonForm.styles';

export interface ICommonFormProps<
  CommonRequest extends IApiQueryKey,
  DeleteRequest extends IApiQueryKey | never,
> {
  commonKey: CommonRequest;
  deleteKey?: DeleteRequest;
  defaultRequestData: IApiRequest<CommonRequest>;
  deleteRequestData?: IApiRequest<DeleteRequest>;
  onCommonSubmit?: (isError: boolean, result: IApiResponse<CommonRequest>) => void;
  onDeleteSubmit?: (isError: boolean, result: IApiResponse<DeleteRequest>) => void;
  submitButtonText: string;
  showToasterOnSuccess?: boolean;
  showToasterOnSuccessDeletion?: boolean;
  showToasterOnError?: boolean;
  showToasterOnErrorDeletion?: boolean;
  submitStyle?: React.ComponentProps<'button'>;
  deleteStyle?: React.ComponentProps<'button'>;
  formStyle?: React.ComponentProps<'form'>;
  footerStyle?: React.ComponentProps<'div'>;
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
  onCommonSubmit,
  onDeleteSubmit,
  submitButtonText,
  showToasterOnSuccess = true,
  showToasterOnSuccessDeletion = true,
  showToasterOnError = true,
  showToasterOnErrorDeletion = true,
  submitStyle,
  deleteStyle,
  formStyle,
  footerStyle,
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
      onCommonSubmit?.(isError, data);
      if (isError) {
        console.error('CommonForm Error\n', error);
        if (showToasterOnError) {
          addToaster({ type: 'error', text: 'Ошибка!' });
        }
      } else if (showToasterOnSuccess) {
        addToaster({ type: 'ok', text: 'Успех!' });
      }
    } else if (isNotEmpty(dData) && formData.delete) {
      setFormData((prev) => ({ ...prev, delete: false }));
      onDeleteSubmit?.(isError, dData);
      if (dIsError) {
        console.error('CommonForm deletion Error\n', dError);
        if (showToasterOnErrorDeletion) {
          addToaster({ type: 'error', text: 'Ошибка!' });
        }
      } else if (showToasterOnSuccessDeletion) {
        addToaster({ type: 'ok', text: 'Успех!' });
      }
    }
  }, [dData, dError, dIsError, data, error, formData, isError, onCommonSubmit]);

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
    <form {...formStyle} onSubmit={handleSubmit}>
      {children(handleChange, formData.form)}
      <div {...footerStyle} className={clsx(classes.footer, footerStyle?.className)}>
        <PrettyButton {...submitStyle} type="submit">
          {submitButtonText}
        </PrettyButton>
        {deleteKey && (
          <DeleteButton {...deleteStyle} type="button" onClick={handleDelete}>
            УДАЛИТЬ
          </DeleteButton>
        )}
      </div>
    </form>
  );
}
