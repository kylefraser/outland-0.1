import { styled } from '../../../stitches.config';
import { Container, Flex, Grid, Logo, Section, Text } from '../../components';
import Ace from '../../assets/images/ace.webp';
import BeeKeeper from '../../assets/images/beekeeper.webp';
import BeeKeepers from '../../assets/images/beekeepers.webp';
import Plants from '../../assets/images/plants.webp';
import Chicken from '../../assets/images/chicken.webp';
import Facepaint from '../../assets/images/facepaint.webp';
import Forward from '../../assets/videos/get_training7.mp4';
import GuideHunt from '../../assets/images/guide-hunt.webp';
import GuideFish from '../../assets/images/guide-fish.webp';
import GuideExplore from '../../assets/images/guide-explore.webp';
import FourByFour from '../../assets/images/4x4.webp';
import GreenBeret from '../../assets/images/green-beret.webp';
import Inshore from '../../assets/images/inshore.webp';
import Marine from '../../assets/images/marine-raider.webp';
import Paddle from '../../assets/images/paddle.webp';
import Range from '../../assets/images/range.webp';
import Sff from '../../assets/images/sff.webp';
import Socf from '../../assets/images/socf.webp';
import Steak from '../../assets/images/steak.webp';
import Topographic from '../../assets/images/topographic.webp';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/pro-solid-svg-icons';

interface HomeProps {
  token?: string | number | null;
  setSearchedLocation: any;
}

const Home = ({ setSearchedLocation }: HomeProps) => {
  return (
    <div style={{ width: '100%' }}>
      <Container>
        <Section style={{ paddingBottom: 0 }}>
          <Flex
            align={'center'}
            direction={'column'}
            style={{
              maxWidth: '65vw',
              margin: '0 auto 3rem',
            }}
          >
            <Text
              as="h2"
              size={'10'}
              style={{
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            >
              Find a guide
            </Text>
            <Text
              size={'7'}
              style={{
                textAlign: 'center',
                marginBottom: '2rem',
                maxWidth: '60rem',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse venenatis id lorem non vehicula.
            </Text>
            <Link
              to="/map?type=guide#3/39/-95"
              onClick={() => setSearchedLocation('')}
              style={{
                alignSelf: 'center',
                textDecoration: 'none',
                color: '#72A535',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '2rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Search all guides{' '}
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ marginLeft: '0.75ch' }}
              />
            </Link>
          </Flex>
          <GuideCategories
            columns={{ '@initial': '1', '@bp3': '3' }}
            gap={'6'}
            style={{ WebkitTransform: 'translate3d(0,0,0)' }}
          >
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  backgroundImage: `url('${GuideHunt}')`,
                  backgroundSize: 'cover',
                  mixBlendMode: 'hard-light',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.75,
                  zIndex: 0,
                }}
              ></div>
              <h2
                style={{
                  position: 'relative',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                  zIndex: 1,
                }}
              >
                Hunt
              </h2>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  backgroundImage: `url('${GuideFish}')`,
                  backgroundSize: 'cover',
                  mixBlendMode: 'hard-light',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.75,
                  zIndex: 0,
                }}
              ></div>
              <h2
                style={{
                  position: 'relative',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                  zIndex: 1,
                }}
              >
                Fish
              </h2>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  backgroundImage: `url('${GuideExplore}')`,
                  backgroundSize: 'cover',
                  mixBlendMode: 'hard-light',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.75,
                  zIndex: 0,
                }}
              ></div>
              <h2
                style={{
                  position: 'relative',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                  zIndex: 1,
                }}
              >
                Explore
              </h2>
            </div>
          </GuideCategories>
        </Section>
        <Section>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '65vw',
              margin: '0 auto 0',
            }}
          >
            <Text
              as="h2"
              size={'10'}
              style={{
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            >
              Knowledge transfer
            </Text>
            <Text
              size={'7'}
              style={{
                textAlign: 'center',
                marginBottom: '2rem',
                maxWidth: '60rem',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse venenatis id lorem non vehicula.
            </Text>
            <Link
              to="/map?type=course#3/39/-95"
              onClick={() => setSearchedLocation('')}
              style={{
                alignSelf: 'center',
                textDecoration: 'none',
                color: '#72A535',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '2rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Search all courses{' '}
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ marginLeft: '0.75ch' }}
              />
            </Link>
          </div>
          <CourseCategories>
            <div
              style={{
                gridArea: 'a',
                padding: '4rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Text
                size={'jumboxl'}
                style={{
                  fontWeight: 800,
                  color: '#ffffff',
                  marginTop: 'auto',
                  textAlign: 'left',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Get training
              </Text>
              <div
                style={{
                  overflow: 'hidden',
                  borderRadius: 12,
                  mixBlendMode: 'hard-light',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.75,
                  transform: 'translateZ(0)',
                  zIndex: 0,
                }}
              >
                <video
                  src={Forward}
                  style={{
                    height: '100%',
                    position: 'absolute',
                    right: '-8.25rem',
                  }}
                  autoPlay
                  playsInline
                  muted
                  loop
                />
              </div>
            </div>
            <div
              style={{
                gridArea: 'b',
                position: 'relative',
              }}
            >
              <div
                style={{
                  backgroundImage: `url('${BeeKeepers}')`,
                  backgroundSize: 'cover',
                  mixBlendMode: 'hard-light',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.75,
                  zIndex: 0,
                  borderRadius: 12,
                }}
              ></div>
              <h2
                style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.2)', zIndex: 1 }}
              >
                Beekeeping
              </h2>
            </div>
            <div
              style={{
                gridArea: 'c',
                position: 'relative',
              }}
            >
              <div
                style={{
                  backgroundImage: `url('${Plants}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'right',
                  mixBlendMode: 'hard-light',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.75,
                  zIndex: 0,
                  borderRadius: 12,
                }}
              ></div>
              <h2
                style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.2)', zIndex: 1 }}
              >
                Gardening
              </h2>
            </div>
            <div
              style={{
                gridArea: 'd',
                position: 'relative',
              }}
            >
              <div
                style={{
                  backgroundImage: `url('${Steak}')`,
                  backgroundSize: 'cover',
                  mixBlendMode: 'hard-light',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.75,
                  zIndex: 0,
                  borderRadius: 12,
                }}
              ></div>
              <h2
                style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.2)', zIndex: 1 }}
              >
                Butchery
              </h2>
            </div>
            <div
              style={{
                gridArea: 'e',
                position: 'relative',
              }}
            >
              <div
                style={{
                  backgroundImage: `url('${Chicken}')`,
                  backgroundSize: 'cover',
                  mixBlendMode: 'hard-light',
                  backgroundPosition: 'right',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.75,
                  zIndex: 0,
                  borderRadius: 12,
                }}
              ></div>
              <h2
                style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.2)', zIndex: 1 }}
              >
                Chickens
              </h2>
            </div>
          </CourseCategories>
        </Section>
      </Container>
      <Section
        style={{
          backgroundColor: '#2b331b',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('${Topographic}')`,
            backgroundSize: '100% 100%',
            mixBlendMode: 'multiply',
          }}
        ></div>
        <Container>
          <Flex
            direction={'column'}
            align={'center'}
            style={{
              maxWidth: '65vw',
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <Text
              as="h2"
              size={'10'}
              style={{
                color: '#ffffff',
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            >
              Explore further
            </Text>
            <p
              style={{
                color: '#ffffff',
                fontSize: '2rem',
                fontFamily: "'Outfit', sans-serif",
                textAlign: 'center',
                marginBottom: '2rem',
                maxWidth: '60rem',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse venenatis id lorem non vehicula.
            </p>
            <Link
              to="/map?type=access#3/39/-95"
              onClick={() => setSearchedLocation('')}
              style={{
                alignSelf: 'center',
                textDecoration: 'none',
                color: '#72A535',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '2rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Search for access{' '}
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ marginLeft: '0.75ch' }}
              />
            </Link>
          </Flex>
          <GuideCategories
            columns={{ '@initial': '1', '@bp3': '3' }}
            gap={'6'}
            style={{
              WebkitTransform: 'translate3d(0,0,0)',
              gridTemplateColumns: 'repeat(4, 1fr)',
              marginTop: '3rem',
            }}
          >
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  backgroundImage: `url('${Paddle}')`,
                  backgroundSize: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.75,
                  zIndex: 0,
                }}
              ></div>
              <h2
                style={{
                  position: 'relative',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                  zIndex: 1,
                }}
              >
                Paddle
              </h2>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  backgroundImage: `url('${FourByFour}')`,
                  backgroundSize: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.75,
                  zIndex: 0,
                }}
              ></div>
              <h2
                style={{
                  position: 'relative',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                  zIndex: 1,
                }}
              >
                4x4
              </h2>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  backgroundImage: `url('${Range}')`,
                  backgroundSize: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.75,
                  zIndex: 0,
                }}
              ></div>
              <h2
                style={{
                  position: 'relative',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                  zIndex: 1,
                }}
              >
                Range
              </h2>
            </div>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  backgroundImage: `url('${Inshore}')`,
                  backgroundSize: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.75,
                  zIndex: 0,
                }}
              ></div>
              <h2
                style={{
                  position: 'relative',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                  zIndex: 1,
                }}
              >
                Inshore
              </h2>
            </div>
          </GuideCategories>
        </Container>
      </Section>
      <Container>
        <Section>
          <div
            style={{
              padding: '6rem',
              background: `url('${BeeKeeper}')`,
              backgroundSize: 'cover',
              borderRadius: '1rem',
              height: '56.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '65vw',
                justifySelf: 'flex-end',
                marginTop: 'auto',
              }}
            >
              <Text
                as="h2"
                size={'10'}
                style={{
                  color: '#ffffff',
                  textAlign: 'center',
                  fontWeight: 800,
                  lineHeight: '1.3',
                }}
              >
                Hosting listings on <br />{' '}
                <Logo size="jumbo" color="white" dotSize="2rem" />
              </Text>
              <p
                style={{
                  color: '#ffffff',
                  fontSize: '2rem',
                  fontFamily: "'Outfit', sans-serif",
                  textAlign: 'center',
                  marginBottom: '2rem',
                  maxWidth: '60rem',
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse venenatis id lorem non vehicula. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit.
              </p>
              <Link
                to="/register"
                style={{
                  alignSelf: 'center',
                  textDecoration: 'none',
                  color: '#ffffff',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '2rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Get started{' '}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{ marginLeft: '0.75ch' }}
                />
              </Link>
            </div>
          </div>
        </Section>
      </Container>
      <Flex
        style={{
          backgroundColor: '#182008',
          position: 'relative',
        }}
      >
        <Container>
          <Section>
            <div
              style={{
                display: 'flex',
                width: '46%',
                flexDirection: 'column',
              }}
            >
              <Logo
                color={'header'}
                style={{ marginBottom: '1rem' }}
                size={'6'}
              />
              <Text
                size={'9'}
                style={{
                  color: '#ffffff',
                  fontWeight: 800,
                  marginBottom: '1rem',
                  lineHeight: 1.1,
                }}
              >
                Giving back to those willing to give all.
              </Text>
              <Text
                size={'6'}
                style={{
                  color: '#ffffff',
                  marginBottom: '2rem',
                  lineHeight: 1.3,
                }}
              >
                Lorem ipsum dolor sit pledge 5% back from every transaction,
                equally to the following charities. Suspendisse venenatis id
                lorem non vehicula.
              </Text>
              <div
                style={{
                  display: 'grid',
                  alignItems: 'center',
                  gridTemplateAreas: `'one . two . three'
                                      '. four . five .'`,
                  gap: '3rem 0',
                  marginTop: '2rem',
                }}
              >
                <img
                  style={{ gridArea: 'one', width: '11.25rem' }}
                  src={GreenBeret}
                />
                <img style={{ gridArea: 'two', width: '10rem' }} src={Sff} />
                <img
                  style={{ gridArea: 'three', width: '8rem' }}
                  src={Marine}
                />
                <img style={{ gridArea: 'four', width: '8rem' }} src={Socf} />
                <img style={{ gridArea: 'five', width: '9.25rem' }} src={Ace} />
              </div>
            </div>
            <div
              style={{
                backgroundImage: `url('${Facepaint}')`,
                mixBlendMode: 'lighten',
                backgroundSize: 'cover',
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: '67.25rem',
                height: '56.25rem',
              }}
            ></div>
          </Section>
        </Container>
      </Flex>
    </div>
  );
};

const GuideCategories = styled(Grid, {
  '& > div': {
    background: 'linear-gradient(95.7deg, #535F3C 19.28%, #424B30 82.74%)',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '24.5rem',
    '& > h2': {
      color: '#ffffff',
      fontFamily: "'Outfit', sans-serif",
      fontSize: '3.25rem',
      fontWeight: 800,
    },
  },
});

const CourseCategories = styled('div', {
  display: 'grid',
  gridTemplateColumns:
    'minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)',
  gridTemplateRows: 'repeat(2, 24.5rem)',
  gridTemplateAreas: `'a a b c'
                      'a a d e'`,
  gap: '1.5rem',
  marginTop: '3rem',
  '& > div': {
    background: 'linear-gradient(95.7deg, #535F3C 19.28%, #424B30 82.74%)',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    '& > h2': {
      color: '#ffffff',
      fontFamily: "'Outfit', sans-serif",
      fontSize: '3.25rem',
      fontWeight: 800,
      textAlign: 'center',
    },
  },
});

export default Home;
