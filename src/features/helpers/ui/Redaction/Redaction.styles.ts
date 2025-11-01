import { createUseStyles } from 'react-jss';

export default createUseStyles({
  redactionButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    cursor: 'pointer',
    height: 'fit-content',
    width: 'fit-content',
    flex: 'none',
    borderRadius: '50%',
    backgroundColor: 'rgba(0 ,0, 0, 0)',
    '&:hover': {
      backgroundColor: 'rgba(0 ,0, 0, 0.2)',
      color: 'white',
    },
  },
});
