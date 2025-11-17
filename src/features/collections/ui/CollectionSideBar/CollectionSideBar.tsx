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

  const [menuCollapsed, setMenuCollapsed] = useState<boolean>();

  const toggleMenu = () => {
    setMenuCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`${classes.sidebarContainer} ${menuCollapsed ? classes.sidebarContainerCollapsed : ''}`}
    >
      <button
        className={`${classes.toggleButton}`}
        onClick={toggleMenu}
        aria-label={menuCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
      >
        <IconButton icon="menu"></IconButton>
      </button>
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
