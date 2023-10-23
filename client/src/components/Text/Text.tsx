import { styled } from '../../../stitches.config';

export const Text = styled('span', {
  // Reset
  lineHeight: '1',
  display: 'block',
  fontFamily: "'Outfit', sans-serif",

  variants: {
    color: {
      hiContrast: { color: '$hiContrast' },
      loContrast: { color: '$loContrast' },
      link: { color: '$olive4' },
      header: { color: '$olive4' },
      white: { color: '$white' },
      outlandOlive: { color: '$outlandOlive' },
      text: { color: '$text' },
    },
    size: {
      '1': {
        fontSize: '$1',
      },
      '2': {
        fontSize: '$2',
      },
      '3': {
        fontSize: '$3',
      },
      '4': {
        fontSize: '$4',
      },
      '5': {
        fontSize: '$5',
      },
      '6': {
        fontSize: '$6',
      },
      '7': {
        fontSize: '$7',
      },
      '8': {
        fontSize: '$8',
      },
      '9': {
        fontSize: '$9',
      },
      '10': {
        fontSize: '$10',
        fontWeight: '900',
      },
      '404': {
        fontSize: '$404',
        fontWeight: '900',
      },
      jumbo: {
        fontSize: '$jumbo',
        fontWeight: '900',
      },
      jumboxl: {
        fontSize: '$jumboxl',
        fontWeight: '900',
      },
    },
    variant: {
      logo: {
        display: 'inline-block',
        fontFamily: "'Spartan', sans-serif",
        fontWeight: 800,
        textTransform: 'uppercase',
      },
    },
  },
  defaultVariants: {
    size: '4',
    color: 'hiContrast',
  },
});
