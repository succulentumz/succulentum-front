import { colors } from '@/shared/theme';
import { createUseStyles } from 'react-jss';

export default createUseStyles({
  collectionPage: {
    height: '100%',
    backgroundColor: colors.G30,
    padding: 30,
  },

  content: {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
  },
});
