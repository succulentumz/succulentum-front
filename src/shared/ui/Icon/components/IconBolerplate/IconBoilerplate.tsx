import { FC, useMemo } from 'react';
import { iconsList as commonIcons } from '../../icons-list';
import { ICommonIcon } from '../../types';

export interface IIconBoilerplateProps {
  type: ICommonIcon;
}

export const IconBoilerplate: FC<IIconBoilerplateProps> = ({ type }) => {
  const icons = useMemo(() => commonIcons, []);
  const icon = icons[type];

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={icon.viewBox ?? '0 0 20 20'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {icon.paths?.map((path, index) => (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill={path.fill ?? 'currentColor'}
          stroke={path.stroke ?? 'none'}
          key={index}
          {...path}
        />
      ))}

      {icon.rects?.map((rect, index) => <rect {...rect} key={index} />)}

      {icon.circles?.map((circle, index) => <circle {...circle} key={index} />)}
    </svg>
  );
};
