import { styled } from '../../../stitches.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Icon = styled(FontAwesomeIcon, {
  variants: {
    size: {
      '1': {
        height: '$4',
        width: '$4',
      },
      '2': {
        height: '$5',
        width: '$5',
      },
      '3': {
        height: '$6',
        width: '$6',
      },
    },
    color: {
      hiContrast: { color: '$hiContrast' },
      loContrast: { color: '$loContrast' },
      link: { color: '$olive4' },
      white: { color: '$white' },
      outlandOlive: { color: '$outlandOlive' },
      text: { color: '$text' },
    },
  },
});
