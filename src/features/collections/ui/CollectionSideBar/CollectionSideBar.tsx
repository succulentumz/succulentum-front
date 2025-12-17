import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC, useCallback, useState } from 'react';

import {
  PrettyButton,
  PrettyCopyTextBar,
  PrettyInput,
  PrettyLabeledSmallInput,
} from '@/features/helpers/ui/PrettyComponents';
import { IconButton } from '@/shared/ui';

import useStyles from './CollectionSideBar.styles';

export interface ICollectionSideBarProps {
  sharedLink?: string;
  token?: string;
  title: string;
  goBack?: () => void;
  change?: () => void;
}

export const CollectionSideBar: FC<ICollectionSideBarProps> = ({
  title,
  goBack,
  change,
  sharedLink,
  token,
}) => {
  const classes = useStyles();

  const menuCollapsedKey = 'sideBarCollapsed';

  const isShowingSortingAndSearchingSection = true;

  const [menuCollapsed, setMenuCollapsed] = useState<boolean | undefined>(() => {
    const localStorageValue = localStorage.getItem(menuCollapsedKey);

    return localStorageValue !== null ? localStorageValue === '1' : false;
  });

  const updateMenuCollapsed = useCallback((newValue: boolean) => {
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
        {isShowingSortingAndSearchingSection && (
          <div className={classes.sidebarMain}>
            <form>
              <PrettyInput type="search" placeholder="Поиск" disabled={true} />
            </form>
            <form>
              <h4>Фильтры:</h4>
              <hr />
              <h4>Дата создания:</h4>
              <div className={classes.filterContainer}>
                <PrettyLabeledSmallInput type="date" label="от:" disabled={true} />
                <PrettyLabeledSmallInput type="date" label="до:" disabled={true} />
              </div>
            </form>
            <hr />
          </div>
        )}
        <div className={classes.sidebarFooterContainer}>
          <div className={classes.sidebarFooter}>
            {isNotEmpty(goBack) && <PrettyButton onClick={goBack}>Назад</PrettyButton>}
            {isNotEmpty(change) && <PrettyButton onClick={change}>Изменить</PrettyButton>}
          </div>
          {isNotEmpty(sharedLink) && (
            <>
              <h4>Публичный токен:</h4>
              <PrettyCopyTextBar
                text={token ?? sharedLink}
                copytext={sharedLink}
                message="Ссылка скопирована!"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
