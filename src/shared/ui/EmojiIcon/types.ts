import { type ReactElement } from 'react';

import type emoji from './assets';

export type IEmojiIconType = keyof typeof emoji;

export type IEmojiIcon = IEmojiIconType | ReactElement;
