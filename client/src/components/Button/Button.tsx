import { ButtonHTMLAttributes } from 'react';
import { styled } from '../../../stitches.config';
import { ColourModeContext } from '../ThemeProvider';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'special'
    | 'action'
    | 'white'
    | 'share'
    | 'airbnb';
  outline?: boolean;
  medium?: boolean;
  small?: boolean;
  mini?: boolean;
  inline?: boolean;
}

const Button = ({
  variant,
  outline,
  medium,
  children,
  small,
  mini,
  inline,
  ...props
}: ButtonProps) => {
  return (
    <ColourModeContext.Consumer>
      {(context: any) => (
        <ButtonElem
          variant={variant}
          outline={outline}
          medium={medium}
          mini={mini}
          small={small}
          inline={inline}
          {...props}
          color={context.colorMode}
        >
          {children}
        </ButtonElem>
      )}
    </ColourModeContext.Consumer>
  );
};

const ButtonElem = styled('button', {
  variants: {
    variant: {
      primary: {
        backgroundColor: '$olive5',
        color: '$white',
        '&:hover': {
          backgroundColor: '$olive6',
        },
      },
      secondary: {
        backgroundColor: '$olive3',
        color: '$white',
        '&:hover': {
          backgroundColor: '$olive4',
        },
      },
      action: {
        backgroundColor: '$blue',
        color: '$white',
        '&:hover': {
          backgroundColor: '#2176ae',
        },
      },
      special: {
        backgroundColor: 'transparent',
        borderColor: '$white',
        color: '$white',
        '&:hover': {
          color: '#000000',
          mixBlendMode: 'color-dodge',
          backgroundColor: '$white',
        },
      },
      white: {
        backgroundColor: 'transparent',
        borderColor: '$white',
        color: '$white',
        '&:hover': {
          color: '#000000',
          mixBlendMode: 'lighten',
          backgroundColor: '$white',
        },
      },
      share: {
        backgroundColor: '#3474D4',
        color: '$white',
        '&:hover': {
          backgroundColor: '#3474D4',
        },
      },
      airbnb: {
        backgroundColor: '#FF5A5F',
        color: '$white',
        '&:hover': {
          backgroundColor: '#FF5A5F',
        },
      },
    },
    outline: {
      true: { borderWidth: 2, borderStyle: 'solid' },
    },
    medium: {
      true: {
        fontSize: '1.625rem',
        padding: '0.5rem 1.75rem',
      },
    },
    small: {
      true: {
        fontSize: '1.25rem',
        padding: '0.5rem 1rem',
      },
    },
    mini: {
      true: {
        fontSize: '1rem',
        padding: '0.375rem 0.825rem',
      },
    },
    inline: {
      true: {
        borderColor: 'transparent !important',
      },
    },
    color: {
      dark: {},
      light: {},
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      outline: true,
      css: {
        backgroundColor: 'transparent',
        borderColor: '$olive5',
        color: '$olive5',
        '&:hover': {
          backgroundColor: '$olive5',
          color: '$white',
        },
      },
    },
    {
      variant: 'secondary',
      outline: true,
      css: {
        backgroundColor: 'transparent',
        borderColor: '$olive3',
        color: '$olive3',
        '&:hover': {
          backgroundColor: '$olive3',
          color: '$white',
        },
      },
    },
    {
      variant: 'action',
      outline: true,
      color: 'dark',
      css: {
        backgroundColor: 'transparent',
        borderColor: '$blue',
        color: '$white',
        '&:hover': {
          backgroundColor: '$blue',
          color: '$white',
        },
      },
    },
    {
      variant: 'action',
      outline: true,
      color: 'light',
      css: {
        backgroundColor: 'transparent',
        borderColor: '$blue',
        color: '$blue',
        '&:hover': {
          backgroundColor: '$blue',
          color: '$white',
        },
      },
    },
    {
      variant: 'share',
      outline: true,
      color: 'dark',
      css: {
        backgroundColor: 'transparent',
        borderColor: '#3474D4',
        color: '$white',
        '&:hover': {
          backgroundColor: '#3474D4',
          color: '$white',
        },
      },
    },
    {
      variant: 'share',
      outline: true,
      color: 'light',
      css: {
        backgroundColor: 'transparent',
        borderColor: '#3474D4',
        color: '#3474D4',
        '&:hover': {
          backgroundColor: '#3474D4',
          color: '$white',
        },
      },
    },
    {
      variant: 'airbnb',
      outline: true,
      color: 'dark',
      css: {
        backgroundColor: 'transparent',
        borderColor: '#FF5A5F',
        color: '$white',
        '&:hover': {
          backgroundColor: '#FF5A5F',
          color: '$white',
        },
      },
    },
    {
      variant: 'airbnb',
      outline: true,
      color: 'light',
      css: {
        backgroundColor: 'transparent',
        borderColor: '#FF5A5F',
        color: '#FF5A5F',
        '&:hover': {
          backgroundColor: '#FF5A5F',
          color: '$white',
        },
      },
    },
  ],
  defaultVariants: {
    variant: 'primary',
  },
  backgroundColor: 'transparent',
  borderRadius: 50,
  border: '2px solid transparent',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1.1,
  fontFamily: "'Outfit', sans-serif",
  fontSize: '2rem',
  fontWeight: 700,
  padding: '0.5rem 2.5rem',
  position: 'relative',
  transition:
    'color 50ms cubic-bezier(.79,.29,0,.97), background-color 150ms cubic-bezier(.79,.29,0,.97)',
});

export default Button;
