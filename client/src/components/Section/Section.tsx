import { styled } from '../../../stitches.config';

export const Section = styled('section', {
  // Reset
  boxSizing: 'border-box',
  flexShrink: 0,
  width: '100%',
  '&::before': {
    boxSizing: 'border-box',
    content: '""',
  },
  '&::after': {
    boxSizing: 'border-box',
    content: '""',
  },

  variants: {
    size: {
      '1': {
        py: '$3',
      },
      '2': {
        py: '$5',
      },
      '3': {
        py: '$9',
      },
      '4': {
        py: '$jumbo',
      },
    },
  },
  defaultVariants: {
    size: '4',
  },
});
