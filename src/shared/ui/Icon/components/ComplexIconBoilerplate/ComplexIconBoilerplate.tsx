import { type FC, useMemo } from 'react';

import { complexIcons } from '../../complexIcons';
import { type IComplexIcon } from '../../types';

export interface IComplexIconBoilerplateProps {
  type: IComplexIcon;
}

export const ComplexIconBoilerplate: FC<IComplexIconBoilerplateProps> = ({ type }) => {
  const icons = useMemo(() => complexIcons, []);
  const ComplexIcon = icons[type];

  return <div dangerouslySetInnerHTML={{ __html: ComplexIcon }} />;
};
