import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC } from 'react';

import {
  PrettyButton,
  PrettyInput,
  PrettyLabeledSmallInput,
} from '@/features/helpers/ui/PrettyComponents';

import useStyles from './CollectionSideBar.styles';

export interface ICollectionSideBarProps {
  title: string;
  goBack?: () => void;
  change?: () => void;
}

export const CollectionSideBar: FC<ICollectionSideBarProps> = ({ title, goBack, change }) => {
  const classes = useStyles();

  return (
    <div className={classes.sidebar}>
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
        {isNotEmpty(goBack) ? (
          <PrettyButton style={{ float: 'left' }} onClick={goBack}>
            Назад
          </PrettyButton>
        ) : undefined}
        {isNotEmpty(change) ? (
          <PrettyButton style={{ float: 'right' }} onClick={change}>
            Изменить
          </PrettyButton>
        ) : undefined}
      </div>
    </div>
  );
};
