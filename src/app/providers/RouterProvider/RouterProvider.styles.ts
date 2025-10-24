import { createUseStyles } from 'react-jss';

import { animations, colors, helpers } from '@/shared/theme';

export default createUseStyles({
  layout: {
    position: 'relative',
    height: '100%',
    ...helpers.withScrollBar,
  },
  header: {
    position: 'sticky',
    top: 0,
    padding: [10, 5, 0, 5],
    backgroundColor: colors.P80,
  },
  logo: {
    height: 'auto',
    width: '30%',
  },
  tabsContainer: {
    display: 'flex',
    gap: 10,
    marginTop: 10,
    marginLeft: 40,
  },
  tab: {
    display: 'block',
    boxSizing: 'border-box',
    width: 'fit-content',
    padding: [5, 10],
    borderRadius: [6, 6, 0, 0],
    border: ['solid', 3, colors.P150],
    borderBottom: 'unset',
    backgroundColor: colors.W100,
    color: colors.P150,
    textDecoration: 'none',
    transition: animations.defaultTransition,
    transitionProperty: ['color', 'backgroundColor'],

    '&[class*="active"]': {
      backgroundColor: colors.P150,
      color: colors.W100,
    },
  },
});
