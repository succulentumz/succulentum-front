import { isString } from '@true-engineering/true-react-platform-helpers';
import { type ReactNode } from 'react';

import { EmojiIcon } from './EmojiIcon';
import { type IEmojiIcon } from './types';

export const renderEmojiIcon = (emojiIcon: IEmojiIcon): ReactNode =>
  isString(emojiIcon) ? <EmojiIcon type={emojiIcon} /> : emojiIcon;
