import { createUseStyles } from 'react-jss';

import { colors } from '@/shared/theme';

export default createUseStyles({
  registrationPage: {
    backgroundColor: colors.G30,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    flexWrap: 'wrap',
    marginBottom: 20,
  },

  submitButton: {
    marginTop: 10,
  },

  smallText: {
    fontSize: 10,
  },
});
