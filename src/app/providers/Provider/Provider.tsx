import { type FC, type ReactNode } from 'react';

import { ModalManager, ToasterManager } from '@/shared/global';

import { QueryProvider } from '../QueryProvider';

// import '@/shared/lib/i18n';

import './provider.styles.css';

export interface IProviderProps {
  children?: ReactNode;
}

export const Provider: FC<IProviderProps> = ({ children }) => (
  <>
    <QueryProvider>
      <ModalManager />
      <ToasterManager />
      <div className="provider-wrapper">{children}</div>
    </QueryProvider>
  </>
);
