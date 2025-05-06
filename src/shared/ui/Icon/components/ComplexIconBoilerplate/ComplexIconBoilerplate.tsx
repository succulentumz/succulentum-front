import { FC, useMemo } from 'react';
import { complexIcons } from '../../complexIcons';
import { IComplexIcon } from '../../types';

export interface IComplexIconBoilerplateProps {
  type: IComplexIcon;
}

export const ComplexIconBoilerplate: FC<IComplexIconBoilerplateProps> = ({ type }) => {
  const icons = useMemo(() => complexIcons, []);
  const ComplexIcon = icons[type];

  return <div dangerouslySetInnerHTML={{ __html: ComplexIcon }} />;
};
