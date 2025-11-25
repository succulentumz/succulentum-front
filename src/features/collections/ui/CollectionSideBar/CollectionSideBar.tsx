import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import React, { type FC, useState } from 'react';

import {
  PrettyButton,
  PrettyInput,
  PrettyLabeledSmallInput,
} from '@/features/helpers/ui/PrettyComponents';
import { IconButton } from '@/shared/ui';

import useStyles from './CollectionSideBar.styles';

export interface ICollectionSideBarProps {
  title: string;
  goBack?: () => void;
  change?: () => void;
}

export const CollectionSideBar: FC<ICollectionSideBarProps> = ({ title, goBack, change }) => {
  const classes = useStyles();

  const menuCollapsedKey = 'sideBarCollapsed';

  const [menuCollapsed, setMenuCollapsed] = useState<boolean | undefined>(() => {
    const localStorageValue = localStorage.getItem(menuCollapsedKey);

    return localStorageValue !== null ? localStorageValue === '1' : false;
  });

  const updateMenuCollapsed = React.useCallback((newValue: boolean) => {
    setMenuCollapsed(newValue);

    if (newValue === undefined) {
      localStorage.removeItem(menuCollapsedKey);
    } else {
      localStorage.setItem(menuCollapsedKey, newValue ? '1' : '0');
    }
  }, []);

  const toggleMenu = () => {
    updateMenuCollapsed(!menuCollapsed);
  };

  return (
    <div
      className={`${classes.sidebarContainer} ${menuCollapsed ? classes.sidebarContainerCollapsed : ''}`}
    >
      <div
        className={`${classes.toggleButton} ${menuCollapsed ? classes.toggleButtonCollapsed : ''}`}
        title={menuCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
      >
        <div className={classes.toggleButtonInner}>
          <IconButton onClick={toggleMenu} icon="menu"></IconButton>
        </div>
      </div>
      <div className={`${classes.sidebar} ${menuCollapsed ? classes.sidebarCollapsed : ''}`}>
        <div className={classes.sidebarHeader}>
          <h2>{title}</h2>
        </div>
        <div className={classes.sidebarMain}>
          <form>
            <PrettyInput type="search" placeholder="Поиск" />
          </form>
          <form>
            <h4>Фильтры:</h4>
            <hr />
            <h4>Дата создания:</h4>
            <div className={classes.filterContainer}>
              <PrettyLabeledSmallInput type="date" label="от:"></PrettyLabeledSmallInput>
              <PrettyLabeledSmallInput type="date" label="до:"></PrettyLabeledSmallInput>
            </div>
          </form>
        </div>
        <div className={classes.sidebarFooter}>
          {isNotEmpty(goBack) ? <PrettyButton onClick={goBack}>Назад</PrettyButton> : undefined}
          {isNotEmpty(change) ? <PrettyButton onClick={change}>Изменить</PrettyButton> : undefined}
        </div>
      </div>
    </div>
  );
};
