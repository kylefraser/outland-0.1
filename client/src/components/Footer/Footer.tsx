import { HTMLAttributes, useLayoutEffect, useRef, useState } from 'react';
import { styled } from '../../../stitches.config';
import Flag from '../../assets/images/us-flag-white.webp';
import { Container, Flex, Logo, Section, Text } from '..';
import { Link, useLocation } from 'react-router-dom';

interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

const Footer = ({ style, ...props }: FooterProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const { pathname, search } = useLocation();

  return (
    <FooterOuter
      ref={ref}
      id="footer"
      style={{ bottom: 0, ...style }}
      size={'fullWidth'}
      noPadding
      {...props}
    >
      <Container size={pathname == '/map' ? 'fullWidth' : '4'}>
        <Section size="3">
          <FooterInner align={'start'}>
            <Logo color={'white'} size={'7'} style={{ marginRight: 'auto' }} />
            <Flex direction={'column'} style={{ margin: '0 4rem' }}>
              <Text color={'white'} as="h4" size="3">
                About
              </Text>
              <ul style={{ padding: 0 }}>
                <Text color={'white'} as="li" size="3">
                  <Link
                    to={'/about/who-we-are'}
                    style={{ color: '#fff', textDecoration: 'none' }}
                  >
                    Who we are
                  </Link>
                </Text>
                <Text color={'white'} as="li" size="3">
                  Roadmap
                </Text>
                <Text color={'white'} as="li" size="3">
                  Store
                </Text>
              </ul>
            </Flex>
            <Flex direction={'column'} style={{ margin: '0 4rem' }}>
              <Text color={'white'} as="h4" size="3">
                Business
              </Text>
              <ul style={{ padding: 0 }}>
                <Text color={'white'} as="li" size="3">
                  Adding your business
                </Text>
                <Text color={'white'} as="li" size="3">
                  Why Outland
                </Text>
                <Text color={'white'} as="li" size="3">
                  <Link
                    to={'/faq'}
                    style={{ color: '#fff', textDecoration: 'none' }}
                  >
                    FAQ
                  </Link>
                </Text>
              </ul>
            </Flex>
            <Flex direction={'column'} style={{ margin: '0 4rem' }}>
              <Text color={'white'} as="h4" size="3">
                Support
              </Text>
              <ul style={{ padding: 0 }}>
                <Text color={'white'} as="li" size="3">
                  Technical
                </Text>
                <Text color={'white'} as="li" size="3">
                  Help
                </Text>
                <Text color={'white'} as="li" size="3">
                  Contact
                </Text>
              </ul>
            </Flex>
          </FooterInner>
          <hr
            style={{
              backgroundColor: '#EDEDED',
              mixBlendMode: 'overlay',
              height: 2,
              width: '100%',
              margin: '6rem 0 0',
            }}
          />
          <Flex
            align={'center'}
            justify={'end'}
            style={{
              display: 'flex',
              alignSelf: 'flex-end',
              marginTop: '2rem',
              position: 'relative',
              width: '100%',
            }}
          >
            <Text color={'white'} as="small" size="2" style={{}}>
              Copyright © 2021
            </Text>
            <img
              src={Flag}
              style={{
                width: '3rem',
                mixBlendMode: 'overlay',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
          </Flex>
        </Section>
      </Container>
    </FooterOuter>
  );
};

export default Footer;

const FooterOuter = styled(Container, {
  backgroundColor: '#2b331b',
  zIndex: 1,
});

const FooterInner = styled(Flex, {
  '& > div': {
    padding: '1rem 1rem 0 0',
  },
  '& > div:not(:first-of-type)': {
    padding: '1rem',
    '& > h4': {
      fontFamily: "'Outfit', sans-serif",
      fontSize: '1.5rem',
      fontWeight: 800,
      marginTop: '1rem',
    },
    '& > ul > li': {
      fontFamily: "'Outfit', sans-serif",
      fontSize: '1.35rem',
      marginTop: '2rem',
    },
  },
});
