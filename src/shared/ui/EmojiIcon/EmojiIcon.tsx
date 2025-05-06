import { type FC } from 'react';

import emoji from './assets';
import { type IEmojiIconType } from './types';

import useStyles from './EmojiIcon.styles';

export interface IEmojiIconProps {
  type: IEmojiIconType;
}

export const EmojiIcon: FC<IEmojiIconProps> = ({ type }) => {
  const classes = useStyles();

  return <img className={classes.emojiIcon} src={emoji[type]} alt="" />;
};
