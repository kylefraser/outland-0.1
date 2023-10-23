import { HTMLAttributes } from 'react';
import { styled } from '../../../stitches.config';

interface ListingCarouselProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  label?: string;
}

const ListingCarousel = ({
  children,
  label,
  ...props
}: ListingCarouselProps) => {
  return (
    <div {...props}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {label && <Label>{label}</Label>}
        <div style={{ display: 'flex' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              border: '1px solid',
              marginRight: '1rem',
            }}
          ></div>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              border: '1px solid',
            }}
          ></div>
        </div>
      </div>
      <ListingCarouselOuter>
        <ListingCarouselInner>{children}</ListingCarouselInner>
      </ListingCarouselOuter>
    </div>
  );
};

const Label = styled('h4', {
  color: '#596248',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 700,
  fontSize: '2.25rem',
  marginBottom: '0.5rem',
});

const ListingCarouselOuter = styled('div', {
  padding: '0.75rem 0',
  width: '100%',
  overflowY: 'hidden',
});

const ListingCarouselInner = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridTemplateRows: '22rem',
  width: '200%',
  '& > a': {
    textDecoration: 'none',
    '& > div': {
      alignItems: 'flex-end',
      borderRadius: 6,
      boxShadow:
        '0 2px 10px rgba(96, 102, 84, 0.25), 0 -2px 10px rgba(96, 102, 84, 0.25)',
      cursor: 'pointer',
      display: 'flex',
      height: '100%',
      padding: '1.5rem 1rem',
      transform: 'scale3d(.9, .9, .9)',
      transition: 'transform 150ms linear',
      '&:hover': {
        transform: 'scale3d(1, 1, 1)',
      },
      '&::after': {
        backgroundColor: '#2B331B',
        borderRadius: 6,
        content: "''",
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0.75,
        zIndex: -1,
      },
    },
  },
});

export default ListingCarousel;
