export const SLIDE_UP_ANIMATION_DURATION = 150;
const SLIDE_UP_POSITION_START = 15;
const SLIDE_UP_POSITION_END = 0;

export const animations = {
  defaultTransition: '0.25s ease-in-out',
  // Если понадобится, сюда можно пробросить параметры через useTheme props
  slideUp: {
    'slide-up-enter': {
      opacity: 0,
      transform: `translateY(${SLIDE_UP_POSITION_START}px)`,
    },

    'slide-up-enter-active': {
      opacity: 1,
      transform: `translateY(${SLIDE_UP_POSITION_END}px)`,
      transition: `${SLIDE_UP_ANIMATION_DURATION}ms ease-in-out`,
      transitionProperty: 'opacity, transform',
    },

    'slide-up-exit-active': {
      opacity: 1,
      transform: `translateY(${SLIDE_UP_POSITION_END}px)`,
    },

    'slide-up-exit': {
      opacity: 0,
      transform: `translateY(${SLIDE_UP_POSITION_START}px)`,
      transition: `${SLIDE_UP_ANIMATION_DURATION}ms ease-in-out`,
      transitionProperty: 'opacity, transform',
    },
  },
};
