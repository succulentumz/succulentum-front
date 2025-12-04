import { createUseStyles } from 'react-jss';
import { colors } from '../../../shared/theme';

export default createUseStyles({
  container: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },

  topSection: {
    height: '40vh',
    minHeight: 300,
    backgroundImage: 'url(/src/shared/ui/EmojiIcon/assets/jungles.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'left',
    flexShrink: 0,
  },

  bottomSection: {
    flex: 1,
    backgroundColor: '#23F377',
    position: 'relative',
  },

  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'flex-start',
    padding: '2rem',
    gap: '2rem',
  },

  avatarSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    maxWidth: '40%',
    marginTop: '5vh', // Добавил отступ сверху для аватара
  },

  avatarContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 500,
    aspectRatio: '1/1',
  },

  largeCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: '#23F377',
  },

  avatarCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    height: '95%',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid #fff',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  userName: {
    fontFamily: 'Jost, sans-serif',
    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
    color: '#000',
    margin: '2rem 0 0 0',
    fontWeight: 500,
    textAlign: 'center',
  },

  rightSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    maxWidth: '55%',
    marginTop: '45vh', // Увеличил отступ - сдвинул вниз
  },

  aboutSection: {
    flex: 1,
  },

  aboutTextarea: {
    width: '100%',
    height: 200,
    minHeight: 150,
    backgroundColor: colors.W100,
    border: 'none',
    borderRadius: 30,
    padding: '1.5rem',
    fontFamily: 'Jost, sans-serif',
    fontSize: '1.4rem',
    color: '#000',
    resize: 'none',
    outline: 'none',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',

    '&::placeholder': {
      color: '#999',
    },
  },

  buttonsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
  },

  navButton: {
    padding: '1rem 0.5rem',
    backgroundColor: colors.W100,
    border: 'none',
    borderRadius: 20,
    fontFamily: 'Jost, sans-serif',
    fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
    color: '#000',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: 60,
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',

    '&:hover:not(:disabled)': {
      backgroundColor: '#f0f0f0',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
    },

    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.6,
      transform: 'none',

      '&:hover': {
        backgroundColor: colors.W100,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      },
    },
  },

  /* Стили для меню профиля */
  menuContainer: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    zIndex: 1000,
  },

  menuButton: {
    width: 60,
    height: 60,
    backgroundColor: '#000',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',

    '&:hover': {
      backgroundColor: '#333',
      transform: 'scale(1.05)',
    },

    '@media (min-width: 768px)': {
      width: 80,
      height: 80,
    },
  },

  dot: {
    width: 6,
    height: 6,
    backgroundColor: colors.W100,
    borderRadius: '50%',

    '@media (min-width: 768px)': {
      width: 8,
      height: 8,
    },
  },

  dropdownMenu: {
    position: 'absolute',
    top: 'calc(100% + 10px)',
    right: 0,
    backgroundColor: colors.W100,
    borderRadius: 12,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    padding: [8, 0],
    minWidth: 200,
    border: '1px solid #e0e0e0',
    zIndex: 1001,
  },

  menuItem: {
    width: '100%',
    padding: [12, 16],
    backgroundColor: 'transparent',
    border: 'none',
    textAlign: 'left',
    fontFamily: 'Jost, sans-serif',
    fontSize: 16,
    color: '#000',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',

    '&:hover:not(:disabled)': {
      backgroundColor: '#f5f5f5',
    },

    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.6,

      '&:hover': {
        backgroundColor: 'transparent',
      },
    },

    '&:not(:last-child)': {
      borderBottom: '1px solid #f0f0f0',
    },
  },
});
