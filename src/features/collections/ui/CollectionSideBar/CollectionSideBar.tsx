import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC } from 'react';

import useStyles from './CollectionSideBar.styles';

export interface ICollectionSideBarProps {
  title: string;
  goBackClick: () => void | undefined;
}

export const CollectionSideBar: FC<ICollectionSideBarProps> = ({ title, goBackClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarHeader}>
        <h2>{title}</h2>
      </div>
      <div className={classes.sidebarMain}>
        <form>
          <div className={classes.inputBox}>
            <input type="search" className={classes.searchbar} placeholder="Поиск" />
          </div>
        </form>
        <form>
          <h4>Фильтры:</h4>
          <hr />
          <h4>Дата создания:</h4>
          <div className={classes.filterContainer}>
            <div className={classes.inputBox}>
              <div className={classes.filterbox}>
                <div className={classes.smallLeftFilterLabel}>от:</div>
                <input className={classes.filterbar} type="date" />
              </div>
            </div>
            <div className={classes.inputBox}>
              <div className={classes.filterbox}>
                <div className={classes.smallLeftFilterLabel}>до:</div>
                <input className={classes.filterbar} type="date" />
              </div>
            </div>
          </div>
        </form>
      </div>
      {isNotEmpty(goBackClick) ? (
        <button className={classes.backButton} onClick={goBackClick}>
          Назад
        </button>
      ) : undefined}
    </div>
  );
};
