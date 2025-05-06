import {
  type BaseConfigType,
  type IApiClientOptions,
} from '@true-engineering/true-react-common-api-client';
import { Trans } from 'react-i18next';

import { i18n } from '@/shared/lib/i18n';

import { addToaster } from './model';

type Options = Required<IApiClientOptions<BaseConfigType>>;

export const showSuccessToaster: Options['showSuccessToaster'] = ({ name }, payload) => {
  const t = i18n.getFixedT(null, 'api', `${name}.successToaster`);

  const params = payload as Record<string, string>;

  addToaster({
    title: t('title', '', params),
    text: t('text', '', params),
    children: <Trans>{t('children', '', params)}</Trans>,
    type: 'ok',
  });
};

export const showErrorToaster: Options['showErrorToaster'] = ({ errorCode }) => {
  if (!i18n.exists(`errorToaster.${errorCode}`, { ns: 'api' })) {
    return;
  }

  const t = i18n.getFixedT(null, 'api', `errorToaster.${errorCode}`);

  addToaster({
    title: t('title', ''),
    text: t('text', ''),
    children: <Trans>{t('children', '')}</Trans>,
    type: 'error',
  });
};
