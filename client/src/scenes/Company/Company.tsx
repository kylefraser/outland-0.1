import {
  Button,
  Container,
  Flex,
  Icon,
  Modal,
  Schedule,
  Section,
  Select,
  Skeleton,
  Text,
} from '../../components';
import { styled } from '../../../stitches.config';
import Sedona from '../../assets/images/sedona.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faGraduationCap,
  faHouse,
  faPhone,
  faSkull,
  faDesktop,
  faUserCircle,
  faHeart,
  faCalendar,
  faDirections,
  faShare,
} from '@fortawesome/pro-regular-svg-icons';
import {
  faCircleXmark,
  faCompass,
  faLocationDot,
} from '@fortawesome/pro-solid-svg-icons';
import { faAirbnb } from '@fortawesome/free-brands-svg-icons';
import { useQuery } from '@apollo/client';
import { ALL_LISTINGS_BY_USER } from '../../queries';
import { useState } from 'react';
import GuideExplore from '../../assets/images/guide-explore.webp';
import React from 'react';
const ListingItem = React.lazy(
  () => import('../../components/ListingItem/ListingItem')
);

interface CompanyProps {
  notify?: any;
}

const CompanySchedule = ({ e, ...props }: any) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div
        style={{
          backgroundImage: `url('${GuideExplore}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          borderRadius: 4,
          height: '140px',
          width: '100%',
          marginBottom: '0.5rem',
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem',
        }}
      >
        <h3
          style={{
            color: '#596248',
            fontSize: '0.9rem',
            fontWeight: 500,
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          {e.event.extendedProps.when}
        </h3>
        <h3
          style={{
            color: '#596248',
            fontSize: '0.9rem',
            fontWeight: 500,
            textTransform: 'capitalize',
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          {e.event.extendedProps.type}
        </h3>
      </div>
      <h3
        style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          fontFamily: "'Outfit', sans-serif",
          marginBottom: '0.5rem',
        }}
      >
        {e.event.title}
      </h3>
      <p
        style={{
          fontSize: '1rem',
          fontWeight: 400,
          fontFamily: "'Outfit', sans-serif",
          color: '#2b331b',
        }}
      >
        {e.event.extendedProps.description}
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: 'auto',
        }}
      >
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 500,
            color: '#2b331b',
            textTransform: 'capitalize',
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          {e.event.extendedProps.city} {e.event.extendedProps.state}
        </h3>
        <p
          style={{
            fontSize: '1rem',
            fontWeight: 500,
            color: '#2b331b',
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          ${e.event.extendedProps.price}
        </p>
      </div>
    </div>
  );
};

const Company = ({ notify }: CompanyProps) => {
  const [modalOpen, setModalOpen] = useState<any>(false);

  let { data, loading } = useQuery(ALL_LISTINGS_BY_USER);

  const [secondaryModalOpen, setSecondaryModalOpen] = useState<any>(false);
  const [eventDetails, setEventDetails] = useState<any>();

  const handleSecondaryEventClick = (e: any) => {
    setEventDetails(<CompanySchedule e={e} />);
    setSecondaryModalOpen(true);
  };

  return (
    <>
      <Header>
        <Container style={{ position: 'relative' }}>
          <Section>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '40rem',
                }}
              >
                <h6
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: '#9BB579',
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: '#9BB579', marginRight: '1ch' }}
                  />
                  Add to favorites
                </h6>
                <h2
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '4.5rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '1.5rem',
                  }}
                >
                  Test Company
                </h2>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 500,
                    color: '#ffffff',
                    lineHeight: 1.3,
                    marginBottom: '1.5rem',
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{' '}
                </p>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#9BB579',
                  }}
                >
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ color: '#9BB579', marginRight: '1ch' }}
                  />
                  Epping, New Hampshire
                </p>
              </div>
              <div
                style={{
                  backgroundColor: '#000000',
                  borderRadius: 8,
                  height: '16rem',
                  width: '24rem',
                }}
              ></div>
            </div>
          </Section>
        </Container>
      </Header>
      <Container
        size={'fullWidth'}
        noPadding
        style={{ backgroundColor: '#182008' }}
      >
        <Container>
          <Section size={'3'}>
            <Flex justify={'between'}>
              <Flex
                direction={'column'}
                style={{
                  width: '100%',
                  marginRight: '10rem',
                  paddingRight: '2rem',
                }}
              >
                <Flex
                  align={'center'}
                  justify={'between'}
                  style={{ width: '100%' }}
                >
                  <Flex direction={'column'} align={'center'}>
                    <Text
                      as={'h6'}
                      size={'6'}
                      color={'white'}
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Veterans
                    </Text>
                    <Flex
                      align={'center'}
                      style={{
                        margin: '0.5rem 0',
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faSkull}
                        style={{ color: '#9BB579', fontSize: '1.5rem' }}
                      />
                      <Text
                        as={'p'}
                        size={'6'}
                        color={'white'}
                        style={{
                          fontWeight: 500,
                          marginLeft: '0.5rem',
                        }}
                      >
                        Yes
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex direction={'column'} align={'center'}>
                    <Text
                      as={'h6'}
                      size={'6'}
                      color={'white'}
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Staff
                    </Text>
                    <Flex
                      align={'center'}
                      style={{
                        margin: '0.5rem 0',
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        style={{ color: '#9BB579', fontSize: '1.5rem' }}
                      />
                      <Text
                        as={'p'}
                        size={'6'}
                        color={'white'}
                        style={{
                          fontWeight: 500,
                          marginLeft: '0.5rem',
                        }}
                      >
                        11
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex direction={'column'} align={'center'}>
                    <Text
                      as={'h6'}
                      size={'6'}
                      color={'white'}
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Courses
                    </Text>
                    <Flex
                      align={'center'}
                      style={{
                        margin: '0.5rem 0',
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faGraduationCap}
                        style={{ color: '#9BB579', fontSize: '1.5rem' }}
                      />
                      <Text
                        as={'p'}
                        size={'6'}
                        color={'white'}
                        style={{
                          fontWeight: 500,
                          marginLeft: '0.5rem',
                        }}
                      >
                        11
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex direction={'column'} align={'center'}>
                    <Text
                      as={'h6'}
                      size={'6'}
                      color={'white'}
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Founded
                    </Text>
                    <Flex
                      align={'center'}
                      style={{
                        margin: '0.5rem 0',
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faHouse}
                        style={{ color: '#9BB579', fontSize: '1.5rem' }}
                      />
                      <Text
                        as={'p'}
                        size={'6'}
                        color={'white'}
                        style={{
                          fontWeight: 500,
                          marginLeft: '0.5rem',
                        }}
                      >
                        2019
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  justify={'between'}
                  style={{
                    marginTop: '2rem',
                    width: '100%',
                  }}
                >
                  <Flex direction={'column'}>
                    <Text
                      as={'h6'}
                      size={'6'}
                      color={'white'}
                      style={{
                        fontWeight: 600,

                        marginBottom: '1rem',
                      }}
                    >
                      Contact
                    </Text>
                    <Flex direction={'column'}>
                      <Flex align={'center'} style={{ marginBottom: '1rem' }}>
                        <Icon
                          icon={faDesktop}
                          size={'2'}
                          style={{ color: '#9BB579', fontSize: '1.5rem' }}
                        />
                        <Text
                          as={'p'}
                          color={'white'}
                          style={{
                            fontWeight: 500,
                            marginLeft: '0.5rem',
                          }}
                        >
                          website.com
                        </Text>
                      </Flex>
                      <Flex align={'center'} style={{ marginBottom: '1rem' }}>
                        <Icon
                          icon={faPhone}
                          size={'2'}
                          style={{ color: '#9BB579', fontSize: '1.5rem' }}
                        />
                        <Text
                          as={'p'}
                          color={'white'}
                          style={{
                            fontWeight: 500,
                            marginLeft: '0.5rem',
                          }}
                        >
                          555-555-5555
                        </Text>
                      </Flex>
                      <Flex align={'center'} style={{ marginBottom: '1rem' }}>
                        <Icon
                          icon={faEnvelope}
                          size={'2'}
                          style={{ color: '#9BB579', fontSize: '1.5rem' }}
                        />
                        <Text
                          as={'p'}
                          color={'white'}
                          style={{
                            fontWeight: 500,
                            marginLeft: '0.5rem',
                          }}
                        >
                          email@email.com
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex direction={'column'}>
                    <Text
                      as={'h6'}
                      size={'6'}
                      color={'white'}
                      style={{
                        fontWeight: 600,

                        marginBottom: '1rem',
                      }}
                    >
                      Address
                    </Text>
                    <div>
                      <Text
                        as={'p'}
                        size={'5'}
                        color={'white'}
                        style={{
                          fontWeight: 500,
                          marginBottom: '0.5rem',
                        }}
                      >
                        227 Miller Rd,
                      </Text>
                      <Text
                        as={'p'}
                        size={'5'}
                        color={'white'}
                        style={{
                          fontWeight: 500,
                          marginBottom: '0.5rem',
                        }}
                      >
                        Dalton, NH
                      </Text>
                      <Text
                        as={'p'}
                        size={'5'}
                        color={'white'}
                        style={{
                          fontWeight: 500,
                          marginBottom: '0.5rem',
                        }}
                      >
                        03598
                      </Text>
                    </div>
                  </Flex>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <a
                      href={
                        'https://www.google.com/maps/place/' +
                        'city' +
                        ',+' +
                        'state'
                      }
                      target="_blank"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        variant="action"
                        small
                        outline
                        style={{ marginBottom: '0.5rem' }}
                      >
                        <FontAwesomeIcon
                          icon={faDirections}
                          style={{ marginRight: '0.5rem' }}
                        />
                        Directions
                      </Button>
                    </a>
                    <Button
                      variant="airbnb"
                      small
                      outline
                      style={{ marginBottom: '0.5rem' }}
                    >
                      <FontAwesomeIcon
                        icon={faAirbnb}
                        style={{ marginRight: '0.5rem' }}
                      />
                      Find a stay
                    </Button>
                    <Button variant="share" small outline>
                      <FontAwesomeIcon
                        icon={faShare}
                        style={{ marginRight: '0.5rem' }}
                      />
                      Share
                    </Button>
                  </div>
                </Flex>
              </Flex>
              <div
                style={{
                  backgroundColor: '#000000',
                  borderRadius: 8,
                  flexShrink: 0,
                  width: '37.5rem',
                  height: '17rem',
                  backgroundImage:
                    "url('https://api.mapbox.com/styles/v1/fraserkc/ckw77lvdq0m0n15rzje21kgri/static/-70.78,43.28,10/640x290?access_token=pk.eyJ1IjoiZnJhc2Vya2MiLCJhIjoiY2t3Nzc2bmZoMTVzcDJ3bGo5eGNwMmx1ZiJ9.4BVSoGs4xQ3bsMsbBW6ABQ')",
                }}
              ></div>
            </Flex>
          </Section>
        </Container>
      </Container>
      <Container>
        <Section size={'3'}>
          <Text
            as={'h4'}
            size={'8'}
            style={{
              fontWeight: 700,
              marginBottom: '1.5rem',
            }}
          >
            Upcoming Courses
          </Text>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                marginBottom: '2.5rem',
                gap: '1rem',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: 160,
                  width: '100%',
                }}
              >
                <Select
                  small
                  label={'Course Type'}
                  selectProps={{ defaultValue: 'all' }}
                >
                  <option value="all">All</option>
                  <option value="course">Course</option>
                  <option value="guide">Guide</option>
                  <option value="access">Access</option>
                  <option value="Epic">Epic</option>
                </Select>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: 160,
                  width: '100%',
                }}
              >
                <Select
                  small
                  label={'Date'}
                  selectProps={{ defaultValue: 'any' }}
                >
                  <option value="any">Any</option>
                  <option value="one">One</option>
                </Select>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: 160,
                  width: '100%',
                }}
              >
                <Select
                  small
                  label={'Duration'}
                  selectProps={{ defaultValue: 'all' }}
                >
                  <option value="all">All</option>
                  <option value="one">One</option>
                </Select>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: 160,
                  width: '100%',
                }}
              >
                <Select
                  small
                  label={'Skill Level'}
                  selectProps={{ defaultValue: 'all' }}
                >
                  <option value="all">All</option>
                  <option value="beginner">Beginner</option>
                  <option value="novice">Novice</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </Select>
              </div>
            </div>
            <Button
              variant="action"
              small
              outline
              onClick={() => setModalOpen(true)}
            >
              <FontAwesomeIcon
                icon={faCalendar}
                style={{ marginRight: '0.5rem' }}
              />
              Calendar
            </Button>
            <Modal
              open={modalOpen}
              onClose={() => {
                setModalOpen(false), setSecondaryModalOpen(false);
              }}
              style={{ height: '70%', zIndex: 10 }}
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '2rem',
                }}
                onClick={() => setModalOpen(false)}
              />
              <Schedule
                eventClick={(e: React.ChangeEvent) =>
                  handleSecondaryEventClick(e)
                }
                events={data?.allListingsByUser?.map(
                  (l: any, index: number) => {
                    return {
                      title: l.name,
                      date: l.date,
                      description: l.description,
                      when: l.date,
                      type: l.type,
                      city: l.city,
                      state: l.state,
                      price: l.price,
                    };
                  }
                )}
                height={'100%'}
              />
            </Modal>
            <Modal
              open={secondaryModalOpen}
              noBackdrop
              onClose={() => setSecondaryModalOpen(false)}
              style={{
                minHeight: '280px',
                height: '280px',
                width: '320px',
                minWidth: '320px',
                borderRadius: 6,
                padding: '2rem',
                zIndex: 20,
              }}
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                }}
                onClick={() => setSecondaryModalOpen(false)}
              />
              {eventDetails}
            </Modal>
          </div>
          <UpcomingCoursesGrid>
            {loading ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Skeleton variant={'grid_image'} />
                  <div>
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                  </div>
                  <Skeleton variant={'text'} style={{ marginTop: '3rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Skeleton variant={'grid_image'} />
                  <div>
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                  </div>
                  <Skeleton variant={'text'} style={{ marginTop: '3rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Skeleton variant={'grid_image'} />
                  <div>
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                  </div>
                  <Skeleton variant={'text'} style={{ marginTop: '3rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Skeleton variant={'grid_image'} />
                  <div>
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                  </div>
                  <Skeleton variant={'text'} style={{ marginTop: '3rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Skeleton variant={'grid_image'} />
                  <div>
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                  </div>
                  <Skeleton variant={'text'} style={{ marginTop: '3rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Skeleton variant={'grid_image'} />
                  <div>
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                  </div>
                  <Skeleton variant={'text'} style={{ marginTop: '3rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Skeleton variant={'grid_image'} />
                  <div>
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                  </div>
                  <Skeleton variant={'text'} style={{ marginTop: '3rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Skeleton variant={'grid_image'} />
                  <div>
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                    <Skeleton variant={'text'} style={{ marginTop: '1rem' }} />
                  </div>
                  <Skeleton variant={'text'} style={{ marginTop: '3rem' }} />
                </div>
              </>
            ) : (
              data?.allListingsByUser?.map((l: any, i: number) => {
                return <ListingItem data-listing={l._id} listing={l} key={i} />;
              })
            )}
            {/* <div style={{ gridColumn: 'three / last', gridRow: 'one' }}>
            <div
              style={{
                height: '100%',
                background:
                  'linear-gradient(95.7deg, #3494D5 19.28%, #3474D5 82.74%)',
                padding: '2rem 3rem',
                borderRadius: 8,
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                position: 'relative',
              }}
            >
              <div
                style={{
                  content: '""',
                  position: 'absolute',
                  backgroundImage: `url('${Noise}')`,
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.05,
                  zIndex: 0,
                }}
              ></div>
              <h5
                style={{
                  fontFamily: "'Spartan', sans-serif",
                  fontSize: '2.25rem',
                  marginBottom: '1rem',
                  zIndex: 1,
                  lineHeight: 1.4,
                }}
              >
                List your business on{' '}
                <Logo fontSize={'2rem'} color={'#ffffff'} />
              </h5>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '1.35rem',
                  fontWeight: 600,
                  lineHeight: 1.4,
                  marginBottom: '2rem',
                  zIndex: 1,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse venenatis id lorem non vehicula.
              </p>
              <Button variant="special" small>
                Get Started
              </Button>
            </div>
          </div> */}
          </UpcomingCoursesGrid>
        </Section>
      </Container>
    </>
  );
};

const Header = styled('header', {
  backgroundColor: '$outlandOlive',
  height: '32.5rem',
  display: 'flex',
  position: 'relative',
  '&:before': {
    backgroundImage: `url(${Sedona})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    content: '""',
    opacity: 0.3,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
});

const UpcomingCoursesGrid = styled('div', {
  display: 'grid',
  gap: '2rem',
  gridTemplateColumns:
    '[one] minmax(0,1fr) [two] minmax(0,1fr) [three] minmax(0,1fr) [four] minmax(0,1fr) [last]',
  gridTemplateRows:
    '[one] minmax(0,1fr) [two] auto [three] auto [four] auto [last]',
  '& > a': {
    textDecoration: 'none',
    color: 'unset',
  },
  '& > a > div': {
    fontFamily: "'Souce Sans Pro', sans-serif",
    fontWeight: 600,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '& > div > p': {
      fontWeight: 500,
    },
    '& > div:first-child': {
      height: '12rem',
      backgroundColor: '#f0f0f0',
      backgroundSize: 'cover',
      borderRadius: 8,
      boxShadow:
        '0px 2px 2px rgba(0, 0, 0, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.1)',
      flexShrink: 0,
    },
  },
});

export default Company;
