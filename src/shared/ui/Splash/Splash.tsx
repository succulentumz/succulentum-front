import { type FC, type ReactNode } from 'react';

import { renderEmojiIcon, type IEmojiIcon } from '../EmojiIcon';

import useStyles from './Splash.styles';

export interface ISplashProps {
  icon: IEmojiIcon;
  children?: ReactNode;
}

export const Splash: FC<ISplashProps> = ({ icon, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.splash}>
      <div className={classes.iconWrapper}>
        <div className={classes.icon}>{renderEmojiIcon(icon)}</div>
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};
