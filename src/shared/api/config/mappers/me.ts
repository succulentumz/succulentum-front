import { parseISO } from 'date-fns';

import { type IMe, type IMeRaw } from '../model';

export const mapperMe = (me: IMeRaw): IMe => ({
  ...me,
  updatedAt: parseISO(me.createdAt),
  createdAt: parseISO(me.createdAt),
});
