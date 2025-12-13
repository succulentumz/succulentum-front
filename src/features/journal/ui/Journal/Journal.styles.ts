import { createUseStyles } from 'react-jss';

import { colors } from '@/shared/theme';

export default createUseStyles({
  journal: {
    padding: 30,
    height: 'fit-content',
    maxHeight: '100%',
    overflow: 'clip',
  },

  content: {
    maxHeight: '90vh',
    display: 'flex',
    gap: 20,
    flexWrap: 'nowrap',
    overflowY: 'auto',
    flexDirection: 'column',
  },
});
