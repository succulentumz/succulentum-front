const fontBase = {
  fontFamily: 'Arial',
  fontStyle: 'normal',
  fontWeight: 400,
} as const;

const boldFontWeight = 700;

export const custom9 = {
  ...fontBase,
  fontSize: 9,
  lineHeight: '12px',
  letterSpacing: '0.2px',
} as const;

export const custom9Bold = {
  ...custom9,
  fontWeight: boldFontWeight,
} as const;

export const custom11 = {
  ...fontBase,
  fontSize: 11,
  lineHeight: '14px',
  letterSpacing: '0.2px',
} as const;

export const custom11Bold = {
  ...custom11,
  fontWeight: boldFontWeight,
} as const;

export const custom13 = {
  ...fontBase,
  fontSize: 13,
  lineHeight: '17px',
  letterSpacing: '0.15px',
} as const;

export const custom13Bold = {
  ...custom13,
  fontWeight: boldFontWeight,
} as const;

export const common11 = {
  ...fontBase,
  fontSize: 11,
  lineHeight: '16px',
  letterSpacing: '0.2px',
} as const;

export const common11Bold = {
  ...common11,
  fontWeight: boldFontWeight,
} as const;

const compact = {
  compact20: {
    ...fontBase,
    fontSize: 20,
    lineHeight: '26px' /* 130% */,
    letterSpacing: 0,
  },

  compact18: {
    ...fontBase,
    fontSize: 18,
    lineHeight: '23px',
    letterSpacing: 0,
  },

  compact16: {
    ...fontBase,
    fontSize: 16,
    lineHeight: '22px' /* 137.5% */,
    letterSpacing: 0,
  },

  compact16Bold: {
    fontBase,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '22px' /* 137.5% */,
    letterSpacing: 0,
  },

  compact14: {
    ...fontBase,
    fontSize: 14,
    lineHeight: '18px' /* 128.571% */,
    letterSpacing: '0.15px',
  },

  compact14Bold: {
    ...fontBase,
    fontSize: 14,
    fontWeight: 700,
    lineHeight: '18px' /* 128.571% */,
    letterSpacing: '0.15px',
  },
} as const;

const common = {
  common20: {
    ...fontBase,
    fontSize: 20,
    lineHeight: '28px',
    letterSpacing: 0,
  },

  common18: {
    ...fontBase,
    fontSize: 18,
    lineHeight: '26px' /* 144.444% */,
    letterSpacing: 0,
  },

  common16: {
    ...fontBase,
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: 0,
  },

  common14: {
    ...fontBase,
    fontSize: 14,
    lineHeight: '20px' /* 142.857% */,
    letterSpacing: '0.15px',
  },

  common12: {
    ...fontBase,
    fontSize: 12,
    lineHeight: '16px' /* 133.333% */,
    letterSpacing: '0.2px',
  },

  common10: {
    ...fontBase,
    fontSize: 10,
    lineHeight: '14px' /* 140% */,
    letterSpacing: '0.17px',
  },
} as const;

const commonBold = {
  common20Bold: {
    ...fontBase,
    fontSize: 20,
    fontWeight: 700,
    lineHeight: '28px' /* 140% */,
    letterSpacing: 0,
  },

  common18Bold: {
    ...fontBase,
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '26px' /* 144.444% */,
    letterSpacing: 0,
  },

  common16Bold: {
    ...fontBase,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '24px' /* 150% */,
    letterSpacing: 0,
  },

  common14Bold: {
    ...fontBase,
    fontSize: 14,
    fontWeight: 700,
    lineHeight: '20px' /* 142.857% */,
    letterSpacing: '0.15px',
  },

  common12Bold: {
    ...fontBase,
    fontSize: 12,
    fontWeight: 700,
    lineHeight: '16px' /* 133.333% */,
    letterSpacing: '0.24px',
  },

  common10Bold: {
    ...fontBase,
    fontSize: 10,
    fontWeight: 700,
    lineHeight: '14px' /* 140% */,
    letterSpacing: '0.17px',
  },
} as const;

export const typography = {
  ...compact,
  ...common,
  ...commonBold,
  custom9,
  custom9Bold,
  custom11,
  custom13,
  custom11Bold,
  custom13Bold,
  common11,
  common11Bold,
} as const;
