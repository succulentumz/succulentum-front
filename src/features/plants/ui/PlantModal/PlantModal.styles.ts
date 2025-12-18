import { createUseStyles } from 'react-jss';

import { colors } from '@/shared/theme';

export default createUseStyles({
  modalOverlay: {
  },

  modalContainer: {
    position: 'relative',
    width: '80vw', // уменьшил с 95vw
    height: '80vh', // уменьшил с 95vh
    maxWidth: '1600px',
    maxHeight: '900px',
    borderRadius: '20px',
    display: 'flex',
    padding: '2rem',
    gap: 0,
  },

  plantNameInput: {
    width: '100%',
    padding: '0.8rem',
    marginBottom: '1rem',
    fontSize: '1.5rem',
    fontFamily: 'Jost, sans-serif',
    border: `2px solid ${colors.N100}`,
    borderRadius: '8px',
    outline: 'none',

    '&:focus': {
      borderColor: colors.G1000,
    },
  },

  plantNameDisplay: {
    fontSize: '1.8rem',
    fontFamily: 'Jost, sans-serif',
    color: colors.G1000,
    marginBottom: '1rem',
    textAlign: 'left',
    fontWeight: 600,
  },

  plantNameContainer: {
    position: 'absolute',
    top: '2rem',
    left: '2rem',
    zIndex: 10,
    maxWidth: '50%',
  },

  leftSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  mainImageContainer: {
    width: '55vh',
    height: '55vh',
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: '1rem',
    borderRadius: 0,
  },

  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  imageGallery: {
    display: 'flex',
    width: '55vh',
  },

  galleryImageWrapper: {
    flex: 1,
    height: 'calc(55vh / 5)',
    border: '2px solid rgba(128, 128, 128, 0.3)',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:not(:last-child)': {
      borderRight: 'none',
    },
    '&:hover': {
      borderColor: 'rgba(128, 128, 128, 0.7)',
    },
  },

  galleryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  rightSection: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },

  aboutTextarea: {
    height: '55vh',
    backgroundColor: '#fff',
    padding: '1.5rem',
    border: 1,
    borderStyle: 'solid',
    borderLeftStyle: 'inherit',
    borderColor: colors.N100,
    borderRadius: [0, 10, 10, 0],
    borderLeftColor: 'transparent',
    borderLeft: 'none',
    fontSize: '1.2rem',
    fontFamily: 'Jost, sans-serif',
    resize: 'none',
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',

    '&:read-only': {
      cursor: 'default',
    },
  },

  statusContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: '1rem',
  },

  statusRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },

  statusLabel: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '0.5rem 1.5rem',
    fontFamily: 'Jost, sans-serif',
    fontSize: '1rem',
  },

  statusOption: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '0.5rem 1.5rem',
    fontFamily: 'Jost, sans-serif',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '0.5rem',

    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },

  editStatusButton: {
    width: '40px',
    height: '40px',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '0.5rem',

    '&:hover': {
      backgroundColor: '#f0f0f0',
    },

    '& img': {
      width: '20px',
      height: '20px',
    },
  },

  buryButton: {
    backgroundColor: '#096E1F',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '0.5rem 1.5rem',
    fontFamily: 'Jost, sans-serif',
    fontSize: '1rem',
    cursor: 'pointer',
    alignSelf: 'flex-end',

    '&:hover': {
      backgroundColor: '#085a1a',
    },
  },

  backButton: {
    position: 'absolute',
    bottom: '2rem', // Отступ от нижнего края модалки (такой же как padding у modalContainer)
    left: '2rem',   // Отступ от левого края модалки (такой же как padding у modalContainer)
    backgroundColor: '#214C06',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '0.8rem 2rem',
    fontFamily: 'Jost, sans-serif',
    fontSize: '1.2rem',
    cursor: 'pointer',
    zIndex: 10, // Чтобы была поверх других элементов

    '&:hover': {
      backgroundColor: '#1a3d05',
    },
  },

  actionCircles: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    display: 'flex',
    gap: '1rem',
    transition: 'all 0.3s ease',
    flexDirection: 'row-reverse', // Меняем порядок отображения
  },

  actionCircleWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.3s ease',

    // Когда наводим на круг, все круги которые визуально левее (но в DOM идут после) сдвигаются
    '&:hover ~ &': {
      transform: 'translateX(-80px)',
    },

    // Сам круг, на который наводим, не двигается
    '&:hover': {
      transform: 'none',
    },
  },

  actionCircle: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
    zIndex: 2,
    position: 'relative',

    '&:hover': {
      backgroundColor: '#f0f0f0',
      transform: 'translateX(10px)',

      '& + $tooltip': {
        opacity: 1,
        transform: 'translateX(0)',
      },
    },

    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',

      '&:hover': {
        transform: 'none',
        backgroundColor: '#fff',
      },
    },

    '& img': {
      width: '40px',
      height: '40px',
    },
  },

  tooltip: {
    position: 'absolute',
    right: '90px',
    backgroundColor: 'rgba(9, 110, 31, 0.9)',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '25px',
    fontFamily: 'Jost, sans-serif',
    fontSize: '0.9rem',
    whiteSpace: 'nowrap',
    opacity: 0,
    transform: 'translateX(-10px)',
    transition: 'all 0.3s ease',
    pointerEvents: 'none',
    zIndex: 1,
  },

  imageModalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },

  imageModalContent: {
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
  },

  largeImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  closeImageModal: {
    position: 'absolute',
    top: '-40px',
    right: 0,
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '2rem',
    cursor: 'pointer',

    '&:hover': {
      color: '#ccc',
    },
  },
});
