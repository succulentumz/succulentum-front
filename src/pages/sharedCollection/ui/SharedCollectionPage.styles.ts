import { createUseStyles } from 'react-jss';

import { colors } from '@/shared/theme';

export default createUseStyles({
  collectionPage: {
    minHeight: '100%',
    height: 'fit-content',
    backgroundColor: colors.G30,
    display: 'flex',
  },

  content: {
    padding: 30,
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
});
