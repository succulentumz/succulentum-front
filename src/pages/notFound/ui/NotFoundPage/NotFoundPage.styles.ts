import { createUseStyles } from 'react-jss';

import { colors, dimensions } from '@/shared/theme';

export default createUseStyles({
  notFoundPage: {
    height: '100%',
    display: 'grid',
    placeItems: 'center',
  },

  content: {
    gap: 16,
    display: 'flex',
    flexDirection: 'column',
  },

  link: {
    padding: 16,
    gap: 16,
    borderRadius: dimensions.BORDER_RADIUS_STD,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: colors.N900,

    '&:hover': {
      backgroundColor: colors.G50,
    },
  },
});
