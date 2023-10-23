import { styled } from '../../../stitches.config';
import { Flex } from '../Flex';

export const TypeBlock = styled(Flex, {
  height: '8rem',
  width: '100%',
  borderRadius: 4,
  border: '1px solid $olive5',
  cursor: 'pointer',
  fontFamily: "'Outfit', sans-serif",
  color: '$hiContrast',
  backgroundColor: '$olive1',
  fontSize: '1.5rem',
  fontWeight: 600,
  textTransform: 'capitalize',
  position: 'relative',
  transition: 'background-color 150ms cubic-bezier(.79,.29,0,.97',
  boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02)',
  '&:hover': {
    backgroundColor: '$olive4',
  },
  variants: {
    active: {
      true: {
        backgroundColor: '$olive5',
        color: '$white',
        fontWeight: 800,
        '&:hover': {
          backgroundColor: '$olive4',
        },
      },
    },
  },
});
