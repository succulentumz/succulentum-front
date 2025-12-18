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
  Form extends IApiRequest<CommonRequest>,
> {
  commonKey: CommonRequest;
  deleteKey?: DeleteRequest;
  defaultRequestData: Form;
  deleteRequestData: IApiRequest<DeleteRequest>;
  onCommonSubmit?: (result?: IApiResponse<CommonRequest>) => void;
  onDeleteSubmit?: (result?: IApiResponse<DeleteRequest>) => void;
  formatter?: (request: Form) => IApiRequest<CommonRequest> | undefined;
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
    handler: (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => void,
    form: Form,
  ) => ReactNode;
}

interface FormData<K extends IApiQueryKey, Form extends IApiRequest<K>> {
  form: Form;
  submit?: IApiRequest<K>;
  delete: boolean;
}

export function CommonForm<
  CommonRequest extends IApiQueryKey,
  DeleteRequest extends IApiQueryKey,
  Form extends IApiRequest<CommonRequest> = IApiRequest<CommonRequest>,
>({
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
  formatter = (v) => v,
  submitStyle,
  deleteStyle,
  formStyle,
  footerStyle,
  children,
}: ICommonFormProps<CommonRequest, DeleteRequest, Form>) {
  const classes = useStyles();

  const [formData, setFormData] = useState<FormData<CommonRequest, Form>>({
    form: defaultRequestData,
    delete: false,
  });

  const { data, error, isError } = useApiQuery(commonKey, formData.submit, {
    enabled: isNotEmpty(formData.submit),
  });

  const {
    data: dData,
    error: dError,
    isError: dIsError,
  } = useApiQuery(deleteKey, deleteRequestData, {
    enabled: formData.delete,
  });

  useEffect(() => {
    if ((isNotEmpty(data) || isError) && formData.submit) {
      setFormData((prev) => ({ ...prev, submit: undefined }));
      onCommonSubmit?.(data);
      if (isError) {
        console.error('CommonForm Error\n', error);
        if (showToasterOnError) {
          addToaster({ type: 'error', text: 'Ошибка!' });
        }
      } else if (showToasterOnSuccess) {
        addToaster({ type: 'ok', text: 'Успех!' });
      }
    } else if ((isNotEmpty(dData) || dIsError) && formData.delete) {
      setFormData((prev) => ({ ...prev, delete: false }));
      onDeleteSubmit?.(dData);
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

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : undefined;

    setFormData((prev) => ({
      ...prev,
      form: { ...prev.form, [name]: type === 'checkbox' ? checked : value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, submit: formatter(prev.form) }));
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
