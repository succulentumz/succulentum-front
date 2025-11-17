import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';

import { colors } from './colors';

const withScrollBar = {
  boxSizing: 'border-box',
  overflow: 'auto',

  // Chromium
  '@supports selector(::-webkit-scrollbar)': {
    '--webkit-scrollbar-width': '10px',
    '--webkit-scrollbar-height': '10px',

    '&::-webkit-scrollbar': {
      width: 'var(--webkit-scrollbar-width)',
      height: 'var(--webkit-scrollbar-height)',

      '&-thumb': {
        width: 6,
        minHeight: 30,
        border: [2, 'solid', 'transparent'],
        borderRadius: 5,
        backgroundColor: colors.N60,
        backgroundClip: 'padding-box',

        '&:hover': {
          backgroundColor: colors.N80,
        },
      },

      '&-track-piece': {
        backgroundColor: 'transparent',
      },

      '&-corner': {
        backgroundColor: 'transparent',
      },
    },
  },

  // Firefox
  '@supports not selector(::-webkit-scrollbar)': {
    scrollbarWidth: 'thin',
    scrollbarColor: `${colors.N60} transparent`,
  },
};

export const helpers = {
  withScrollBar,
  /**
   * Хелпер для добавление красивого скролла с виртуальным расширением блока. Учитывает направление
   * ввода `ltr` и `rtl` при помощи логических свойств.
   */
  withAwesomeScrollBar: (inlineOffset = 0, blockOffset = 0) => ({
    ...withScrollBar,

    marginInline: `-${inlineOffset}px`,
    marginBlock: `-${blockOffset}px`,
    paddingInline: `${inlineOffset}px calc(${inlineOffset}px - var(--webkit-scrollbar-width, 0px))`,
    paddingBlock: `${blockOffset}px calc(${blockOffset}px - var(--webkit-scrollbar-height, 0px))`,
    scrollbarGutter: 'stable',
  }),

  /** Хелпер для добавления обрезки текста в одну строку */
  withEllipsis: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  /** Хелпер для добавления обрезки текста в несколько строк */
  withLineClamp: (maxLines: number, minLines?: number) =>
    ({
      minHeight: isNotEmpty(minLines) ? `${minLines}lh` : 'auto',
      display: '-webkit-box',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: maxLines,
    }) as const,
} as const;

export const zIndexes = {
  /** Дефолтное значение zIndex для контрола */
  DEFAULT: 0,
  /** Для контролов, в которых есть ошибка (чтобы в группе контролов показывались все красные бордеры) */
  INVALID_CONTROL: 1,
  /** Для контролов, которые находятся в фокусе */
  ACTIVE_CONTROL: 2,
  /** Для шторок */
  DRAWER: 5,
  /** Для дропдаунов */
  DROPDOWN: 10,
  /** Для тултипов */
  TOOLTIP: 20,
  /** Контейнеры, которые должны перекрывать любой контент кроме модальных окон */
  OVERLAY: 49,
  /** Модальные окна */
  MODAL_WINDOW: 50,
  /** Тостеры */
  TOASTER: 60,
  /** Лоадер */
  LOADER: 100,
  /** Дефолтное значение zIndex для обычной ячейки таблицы */
  TABLE_CELL: 0,
  /** Для sticky-ячеек таблицы */
  TABLE_STICKY_CELL: 1,
  /** Для ячеек таблицы, которые находятся в шапке */
  TABLE_HEAD_CELL: 2,
} as const;
