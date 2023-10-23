import { createStitches } from '@stitches/react';
import type * as Stitches from '@stitches/react';
import { reset } from 'stitches-reset';

export const {
  styled,
  css,
  theme,
  createTheme,
  getCssText,
  globalCss,
  keyframes,
  config,
} = createStitches({
  // Breakpoints
  media: {
    bp1: '(min-width: 640px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
    bp4: '(min-width: 1440px)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
  },
  // Outland Theme
  theme: {
    colors: {
      hiContrast: '$olive8',
      loContrast: '$olive0',
      // olives
      olive0: '#ffffff',
      olive1: '#f8fdf5',
      olive2: '#c4e29d',
      olive3: '#a6cf70',
      olive4: '#9bb579',
      olive5: '#859d65',
      olive6: '#596248',
      olive7: '#2b331b',
      olive8: '#182008',
      // grays
      gray1: '#fafafa',
      gray2: '#fafbf8',
      gray3: '#eaeaea',
      gray36: '#eaeaea66',
      gray4: '#dfdfdf',
      gray5: '#d7d9d4',
      gray6: '#ced4c0',
      gray7: '#c5cbba',
      gray8: '#959a8a',

      // special
      blue: '#3494D4',
      green: '#72A535',
      red: '#CF2929',
      white: '#ffffff',
      text: '#182008',
      bgBody: '$white',
      anchor: '$olive4',
      header: '$olive2',
      outlandOlive: '#2b331b',
    },
    fontSizes: {
      1: '11px',
      2: '12px',
      3: '.9rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '2rem',
      8: '2.5rem',
      9: '3.25rem',
      10: '6rem',
      // special
      404: '17rem',
      jumboxl: '8.5rem',
      jumbo: '7rem',
      text: '1rem',
      small: '.9rem',
    },
    space: {
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '2rem',
      8: '3rem',
      9: '4rem',
      10: '6rem',
      jumbo: '7rem',
    },
    sizes: {
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '2rem',
      8: '3rem',
      9: '4rem',
      10: '6rem',
      jumbo: '7rem',
    },
    radii: {
      1: '4px',
      2: '6px',
      3: '8px',
      4: '12px',
      round: '50%',
      pill: '9999px',
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      max: '999',
    },
  },
  utils: {
    p: (value: Stitches.PropertyValue<'padding'>) => ({
      padding: value,
    }),
    pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
    }),
    pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
      paddingRight: value,
    }),
    pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
      paddingBottom: value,
    }),
    pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
    }),
    px: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    m: (value: Stitches.PropertyValue<'margin'>) => ({
      margin: value,
    }),
    mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
    }),
    mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
      marginRight: value,
    }),
    mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
      marginBottom: value,
    }),
    ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
    }),
    mx: (value: Stitches.PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: Stitches.PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value,
    }),

    ta: (value: Stitches.PropertyValue<'textAlign'>) => ({
      textAlign: value,
    }),

    fd: (value: Stitches.PropertyValue<'flexDirection'>) => ({
      flexDirection: value,
    }),
    fw: (value: Stitches.PropertyValue<'flexWrap'>) => ({ flexWrap: value }),

    ai: (value: Stitches.PropertyValue<'alignItems'>) => ({
      alignItems: value,
    }),
    ac: (value: Stitches.PropertyValue<'alignContent'>) => ({
      alignContent: value,
    }),
    jc: (value: Stitches.PropertyValue<'justifyContent'>) => ({
      justifyContent: value,
    }),
    as: (value: Stitches.PropertyValue<'alignSelf'>) => ({
      alignSelf: value,
    }),
    fg: (value: Stitches.PropertyValue<'flexGrow'>) => ({ flexGrow: value }),
    fs: (value: Stitches.PropertyValue<'flexShrink'>) => ({
      flexShrink: value,
    }),
    fb: (value: Stitches.PropertyValue<'flexBasis'>) => ({
      flexBasis: value,
    }),

    bc: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
      backgroundColor: value,
    }),

    br: (value: Stitches.PropertyValue<'borderRadius'>) => ({
      borderRadius: value,
    }),
    btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => ({
      borderTopRightRadius: value,
    }),
    bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => ({
      borderBottomRightRadius: value,
    }),
    bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => ({
      borderBottomLeftRadius: value,
    }),
    btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => ({
      borderTopLeftRadius: value,
    }),

    bs: (value: Stitches.PropertyValue<'boxShadow'>) => ({
      boxShadow: value,
    }),

    lh: (value: Stitches.PropertyValue<'lineHeight'>) => ({
      lineHeight: value,
    }),

    ox: (value: Stitches.PropertyValue<'overflowX'>) => ({
      overflowX: value,
    }),
    oy: (value: Stitches.PropertyValue<'overflowY'>) => ({
      overflowY: value,
    }),

    pe: (value: Stitches.PropertyValue<'pointerEvents'>) => ({
      pointerEvents: value,
    }),
    us: (value: Stitches.PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    userSelect: (value: Stitches.PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    size: (value: Stitches.PropertyValue<'width'>) => ({
      width: value,
      height: value,
    }),

    appearance: (value: Stitches.PropertyValue<'appearance'>) => ({
      WebkitAppearance: value,
      appearance: value,
    }),
    backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value,
    }),
  },
});

export const darkTheme = createTheme('dark', {
  colors: {
    hiContrast: '$olive8',
    loContrast: '$olive0',
    olive0: '#182008',
    olive1: '#2b331b',
    olive2: '#596248',
    olive3: '#859d65',
    olive4: '#9bb579',
    olive5: '#a6cf70',
    olive6: '#c4e29d',
    olive7: '#f8fdf5',
    olive8: '#ffffff',
    gray1: '#959a8a',
    gray2: '#c5cbba',
    gray3: '#ced4c0',
    gray36: '#ced4c066',
    gray4: '#d7d9d4',
    gray5: '#dfdfdf',
    gray6: '#eaeaea',
    gray7: '#fafbf8',
    gray8: '#fafafa',
  },
});

export const globalStyles = globalCss({
  ...reset,
  '@import':
    'https://fonts.googleapis.com/css2?family=Sorts+Mill+Goudy&family=Source+Sans+3:wght@400;500;600;700;900&family=Outfit:wght@400;600;700;800;900&family=Source+Sans+Pro:wght@400;600;700;900&family=Spartan:wght@700;800;900&display=swap',
  '*': {
    boxSizing: 'border-box',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    'text-rendering': 'optimizeLegibility',
    '-webkit-tap-highlight-color': 'transparent',
  },
  html: {
    fontFamily: "'Outfit",
    fontSize: 15,
    '@bp2': {
      fontSize: 15,
    },
    '@bp3': {
      fontSize: 16,
    },
    '@bp4': {
      fontSize: 17,
    },
  },
  body: {
    color: '$text',
    backgroundColor: '$olive1',
    lineHeight: 1,
    margin: 0,
  },
  a: {
    color: '$anchor',
  },
  '.fc': {
    fontFamily: "'Outfit', sans-serif",
    width: '100%',
  },
  '.fc .fc-toolbar-title': {
    color: '$olive8 !important',
    fontSize: '$7 !important',
  },
  '.fc .fc-toolbar .fc-toolbar-chunk:first-of-type': {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 700,
    fontSize: '2rem',
  },
  '.fc .fc-daygrid-day-number': {
    color: '$olive8 !important',
  },
  '.fc .fc-daygrid-day.fc-day-today': {
    backgroundColor: '$olive7 !important',
  },
  '.fc .fc-day-today .fc-daygrid-day-number': {
    color: '$olive0 !important',
  },
  '.fc .fc-button-primary': {
    backgroundColor: '$olive2 !important',
    border: '0 !important',
    '&:hover:enabled': {
      backgroundColor: '$olive3 !important',
    },
  },
  '.fc-event': {
    border: '1px solid $olive4 !important',
    backgroundColor: '$olive4 !important',
    cursor: 'pointer',
    padding: '0.125rem !important',
    transition: 'background-color 100ms ease-in-out',
    '&:hover': {
      backgroundColor: '$olive3 !important',
    },
  },
});
