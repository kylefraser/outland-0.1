import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_USER, ME } from '../../../queries';
import {
  Button,
  Container,
  Flex,
  Icon,
  Input,
  Section,
  Skeleton,
  Switch,
  Text,
  TextArea,
  Toast,
} from '../../../components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCrosshairsSimple,
  faFlashlight,
  faSkull,
  faSnowflake,
} from '@fortawesome/pro-regular-svg-icons';
import { faStar } from '@fortawesome/pro-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/pro-solid-svg-icons';
import { styled } from '../../../../stitches.config';
import { Avatar } from '../../../components/Avatar';
import { useForm } from 'react-hook-form';
import Calendar from 'react-calendar';
import USAMap from 'react-usa-map';

interface UserOutingProps {
  setError: any;
  token?: string | number | null;
}

const UserOuting = ({ setError, token }: UserOutingProps) => {
  const mapHandler = (event: { target: { dataset: { name: any } } }) => {};

  const statesCustomConfig = () => {
    return {
      TN: {
        fill: '#859d65',
        clickHandler: (event: { target: { dataset: any } }) =>
          alert('Custom handler for NJ'),
      },
      ME: {
        fill: '#2b331b',
      },
      MT: {
        fill: '#a6cf70',
      },
    };
  };

  if (!token) {
    return (
      <Navigate replace to="/login" state={{ alert: 'Login or Register' }} />
    );
  }

  return (
    <Container>
      <Section size={3}>
        <Text as={'h2'} size={'8'} style={{ fontWeight: 700 }}>
          Outing
        </Text>
        <Section size={'3'}>
          <Flex direction={'column'} gap={'4'}>
            <div
              style={{ display: 'flex', width: '100%', marginBottom: '4rem' }}
            >
              <div
                style={{
                  flex: '0 0 calc(30% - 4rem)',
                  marginRight: '3rem',
                  padding: '1rem 3rem 1rem 0',
                  borderRight: '1px solid #DFDFDF',
                }}
              >
                <Text
                  as={'h6'}
                  size={'6'}
                  style={{
                    fontWeight: 700,
                    marginBottom: '0.125rem',
                  }}
                >
                  Upcoming Itinerary
                </Text>
                <Text
                  as={'p'}
                  size={'4'}
                  style={{
                    fontWeight: 500,
                    lineHeight: 1.3,
                    marginBottom: '1.5rem',
                  }}
                >
                  You have{' '}
                  <Text
                    color={'header'}
                    style={{ display: 'inline', fontWeight: 700 }}
                  >
                    4
                  </Text>{' '}
                  upcoming experiences on your schedule.
                </Text>
                <hr
                  style={{
                    border: '1px solid #d3d3d3',
                    borderTop: 0,
                    marginTop: '1rem',
                  }}
                />
                <Text
                  as={'p'}
                  style={{
                    fontWeight: 500,
                    lineHeight: 1.3,
                    marginBottom: '0.5rem',
                  }}
                >
                  <span style={{ fontWeight: 800 }}>1</span> Course
                </Text>
                <Text
                  as={'p'}
                  style={{
                    fontWeight: 500,
                    lineHeight: 1.3,
                    marginBottom: '0.5rem',
                  }}
                >
                  <span style={{ fontWeight: 800 }}>2</span> Guide
                </Text>
                <Text
                  as={'p'}
                  style={{
                    fontWeight: 500,
                    lineHeight: 1.3,
                    marginBottom: '0.5rem',
                  }}
                >
                  <span style={{ fontWeight: 800 }}>1</span> Access
                </Text>
                <Text
                  as={'p'}
                  style={{
                    fontWeight: 500,
                    lineHeight: 1.3,
                    marginBottom: '1.5rem',
                  }}
                >
                  <span style={{ fontWeight: 800 }}>0</span> Epic
                </Text>
                <Calendar calendarType={'US'} />
              </div>
              <div
                style={{
                  padding: '1rem 0',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3,1fr)',
                    gap: '1.5rem',
                  }}
                >
                  <Flex
                    direction={'column'}
                    style={{
                      borderRadius: 12,
                      border: '1px solid #596248',
                      padding: '3rem',
                    }}
                  >
                    <Text
                      as={'h6'}
                      size={'3'}
                      style={{
                        fontWeight: 700,
                        lineHeight: 1.4,
                        marginBottom: '1rem',
                      }}
                    >
                      Today - 12:00pm
                    </Text>
                    <Text
                      as={'h2'}
                      size={'6'}
                      style={{
                        fontWeight: 700,
                        lineHeight: 1.4,
                      }}
                    >
                      Listing 101
                    </Text>
                    <Text
                      as={'p'}
                      size={'4'}
                      style={{
                        lineHeight: '1.4',
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse venenatis id lorem non vehicula.
                    </Text>
                    <div
                      style={{
                        display: 'flex',
                        marginTop: '2rem',
                        width: '100%',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#eaeaea',
                            position: 'relative',
                            zIndex: 4,
                          }}
                        ></div>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#dadada',
                            position: 'relative',
                            marginLeft: '-3rem',
                            zIndex: 3,
                          }}
                        ></div>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#cacaca',
                            position: 'relative',
                            marginLeft: '-3rem',
                            zIndex: 2,
                          }}
                        ></div>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#bababa',
                            position: 'relative',
                            marginLeft: '-3rem',
                            zIndex: 1,
                          }}
                        ></div>
                      </div>
                      <Link
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          textDecoration: 'none',
                          flexShrink: 0,
                          lineHeight: 1,
                        }}
                        to="#"
                      >
                        <Text
                          as={'p'}
                          size={'3'}
                          color={'link'}
                          style={{
                            fontWeight: 600,
                            lineHeight: 1,
                            borderBottom: '1px solid #9BB579',
                          }}
                        >
                          View more details
                        </Text>
                      </Link>
                    </div>
                  </Flex>
                  <Flex
                    direction={'column'}
                    style={{
                      borderRadius: 12,
                      border: '1px solid #596248',
                      padding: '3rem',
                    }}
                  >
                    <Text
                      as={'h6'}
                      size={'3'}
                      style={{
                        fontWeight: 700,
                        lineHeight: 1.4,
                        marginBottom: '1rem',
                      }}
                    >
                      Today - 12:00pm
                    </Text>
                    <Text
                      as={'h2'}
                      size={'6'}
                      style={{
                        fontWeight: 700,
                        lineHeight: 1.4,
                      }}
                    >
                      Listing 101
                    </Text>
                    <Text
                      as={'p'}
                      size={'4'}
                      style={{
                        lineHeight: '1.4',
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse venenatis id lorem non vehicula.
                    </Text>
                    <div
                      style={{
                        display: 'flex',
                        marginTop: '2rem',
                        width: '100%',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#eaeaea',
                            position: 'relative',
                            zIndex: 4,
                          }}
                        ></div>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#dadada',
                            position: 'relative',
                            marginLeft: '-3rem',
                            zIndex: 3,
                          }}
                        ></div>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#cacaca',
                            position: 'relative',
                            marginLeft: '-3rem',
                            zIndex: 2,
                          }}
                        ></div>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#bababa',
                            position: 'relative',
                            marginLeft: '-3rem',
                            zIndex: 1,
                          }}
                        ></div>
                      </div>
                      <Link
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          textDecoration: 'none',
                          flexShrink: 0,
                          lineHeight: 1,
                        }}
                        to="#"
                      >
                        <Text
                          as={'p'}
                          size={'3'}
                          color={'link'}
                          style={{
                            fontWeight: 600,
                            lineHeight: 1,
                            borderBottom: '1px solid #9BB579',
                          }}
                        >
                          View more details
                        </Text>
                      </Link>
                    </div>
                  </Flex>
                  <Flex
                    direction={'column'}
                    style={{
                      borderRadius: 12,
                      border: '1px solid #596248',
                      padding: '3rem',
                    }}
                  >
                    <Text
                      as={'h6'}
                      size={'3'}
                      style={{
                        fontWeight: 700,
                        lineHeight: 1.4,
                        marginBottom: '1rem',
                      }}
                    >
                      Today - 12:00pm
                    </Text>
                    <Text
                      as={'h2'}
                      size={'6'}
                      style={{
                        fontWeight: 700,
                        lineHeight: 1.4,
                      }}
                    >
                      Listing 101
                    </Text>
                    <Text
                      as={'p'}
                      size={'4'}
                      style={{
                        lineHeight: '1.4',
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse venenatis id lorem non vehicula.
                    </Text>
                    <div
                      style={{
                        display: 'flex',
                        marginTop: '2rem',
                        width: '100%',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#eaeaea',
                            position: 'relative',
                            zIndex: 4,
                          }}
                        ></div>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#dadada',
                            position: 'relative',
                            marginLeft: '-3rem',
                            zIndex: 3,
                          }}
                        ></div>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#cacaca',
                            position: 'relative',
                            marginLeft: '-3rem',
                            zIndex: 2,
                          }}
                        ></div>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#bababa',
                            position: 'relative',
                            marginLeft: '-3rem',
                            zIndex: 1,
                          }}
                        ></div>
                      </div>
                      <Link
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          textDecoration: 'none',
                          flexShrink: 0,
                          lineHeight: 1,
                        }}
                        to="#"
                      >
                        <Text
                          as={'p'}
                          size={'3'}
                          color={'link'}
                          style={{
                            fontWeight: 600,
                            lineHeight: 1,
                            borderBottom: '1px solid #9BB579',
                          }}
                        >
                          View more details
                        </Text>
                      </Link>
                    </div>
                  </Flex>
                  <Flex
                    direction={'column'}
                    style={{
                      borderRadius: 12,
                      border: '1px solid #596248',
                      padding: '3rem',
                    }}
                  >
                    <Text
                      as={'h6'}
                      size={'3'}
                      style={{
                        fontWeight: 700,
                        lineHeight: 1.4,
                        marginBottom: '1rem',
                      }}
                    >
                      Today - 12:00pm
                    </Text>
                    <Text
                      as={'h2'}
                      size={'6'}
                      style={{
                        fontWeight: 700,
                        lineHeight: 1.4,
                      }}
                    >
                      Listing 101
                    </Text>
                    <Text
                      as={'p'}
                      size={'4'}
                      style={{
                        lineHeight: '1.4',
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse venenatis id lorem non vehicula.
                    </Text>
                    <div
                      style={{
                        display: 'flex',
                        marginTop: '2rem',
                        width: '100%',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#eaeaea',
                            position: 'relative',
                            zIndex: 4,
                          }}
                        ></div>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#dadada',
                            position: 'relative',
                            marginLeft: '-3rem',
                            zIndex: 3,
                          }}
                        ></div>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#cacaca',
                            position: 'relative',
                            marginLeft: '-3rem',
                            zIndex: 2,
                          }}
                        ></div>
                        <div
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '9999px',
                            backgroundColor: '#bababa',
                            position: 'relative',
                            marginLeft: '-3rem',
                            zIndex: 1,
                          }}
                        ></div>
                      </div>
                      <Link
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          textDecoration: 'none',
                          flexShrink: 0,
                          lineHeight: 1,
                        }}
                        to="#"
                      >
                        <Text
                          as={'p'}
                          size={'3'}
                          color={'link'}
                          style={{
                            fontWeight: 600,
                            lineHeight: 1,
                            borderBottom: '1px solid #9BB579',
                          }}
                        >
                          View more details
                        </Text>
                      </Link>
                    </div>
                  </Flex>
                </div>
              </div>
            </div>
            <div
              style={{ display: 'flex', marginBottom: '4rem', width: '100%' }}
            >
              <div
                style={{
                  flex: '0 0 calc(30% - 4rem)',
                  marginRight: '3rem',
                  padding: '1rem 3rem 1rem 0',
                  borderRight: '1px solid #DFDFDF',
                }}
              >
                <Text
                  as={'h6'}
                  size={'6'}
                  style={{
                    fontWeight: 700,
                    marginBottom: '0.125rem',
                  }}
                >
                  Recent Experiences
                </Text>
                <Text
                  as={'p'}
                  size={'4'}
                  style={{
                    fontWeight: 500,
                    lineHeight: 1.3,
                    marginBottom: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  Did you have a great time? Don't forget to leave a rating for
                  your host.
                  <Link
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      margin: '2rem 1rem 0 0',
                      borderBottom: '1px solid #9BB579',
                      textDecoration: 'none',
                    }}
                    to="#"
                  >
                    <Text
                      as={'p'}
                      size={'3'}
                      color={'link'}
                      style={{
                        fontWeight: 600,
                        lineHeight: 1.5,
                        marginRight: '0.5rem',
                      }}
                    >
                      View previous experience history
                    </Text>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      style={{
                        color: '#9BB579',
                        fontSize: '.9rem',
                      }}
                    />
                  </Link>
                </Text>
              </div>
              <div
                style={{
                  padding: '1rem 0',
                  width: '100%',
                }}
              >
                <ListingRow
                  direction={'row'}
                  align={'center'}
                  style={{ backgroundColor: 'rgba(0,0,0,0.07)' }}
                >
                  <Flex
                    direction={'column'}
                    style={{ maxWidth: '25%', width: '100%' }}
                  >
                    <Text style={{ fontWeight: 700 }}>Listing</Text>
                  </Flex>
                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Text style={{ fontWeight: 700 }}>Type</Text>
                  </Flex>

                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Text style={{ fontWeight: 700 }}>Rating</Text>
                  </Flex>
                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Text style={{ fontWeight: 700 }}>Booked date</Text>
                  </Flex>
                </ListingRow>
                <ListingRow direction={'row'} align={'center'}>
                  <Flex
                    direction={'column'}
                    style={{ maxWidth: '25%', width: '100%' }}
                  >
                    <Text
                      as={'h3'}
                      size={'4'}
                      style={{
                        fontWeight: 600,
                        paddingBottom: '0.25rem',
                      }}
                    >
                      Course Name
                    </Text>
                    <Text
                      as={'h3'}
                      size={'3'}
                      style={{
                        fontWeight: 400,
                        width: '100%',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        lineHeight: 1.1,
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse venenatis id lorem non vehicula.
                    </Text>
                  </Flex>
                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Flex
                      align={'center'}
                      justify={'center'}
                      style={{
                        backgroundColor: 'rgba(166, 207, 102, 0.7)',
                        border: '1px solid rgba(166, 207, 102, 1)',
                        padding: '0.125rem 0.5rem',
                        borderRadius: 9999,
                      }}
                    >
                      <Text
                        as={'h6'}
                        size={'3'}
                        color={'white'}
                        style={{
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          lineHeight: 1,
                        }}
                      >
                        Epic
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Text
                      as={'h6'}
                      size={'6'}
                      style={{
                        fontWeight: 500,
                      }}
                    >
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStarSolid}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStarSolid}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStar}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStar}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStar}
                        style={{ marginRight: '0.125ch' }}
                      />
                    </Text>
                  </Flex>
                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Text
                      as={'h6'}
                      size={'3'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1,
                      }}
                    >
                      July 4th, 2023
                    </Text>
                  </Flex>
                </ListingRow>
                <ListingRow direction={'row'} align={'center'}>
                  <Flex
                    direction={'column'}
                    style={{ maxWidth: '25%', width: '100%' }}
                  >
                    <Text
                      as={'h3'}
                      size={'4'}
                      style={{
                        fontWeight: 600,
                        paddingBottom: '0.25rem',
                      }}
                    >
                      Course Name
                    </Text>
                    <Text
                      as={'h3'}
                      size={'3'}
                      style={{
                        fontWeight: 400,
                        width: '100%',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        lineHeight: 1.1,
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse venenatis id lorem non vehicula.
                    </Text>
                  </Flex>
                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Flex
                      align={'center'}
                      justify={'center'}
                      style={{
                        backgroundColor: 'rgba(166, 207, 102, 0.7)',
                        border: '1px solid rgba(166, 207, 102, 1)',
                        padding: '0.125rem 0.5rem',
                        borderRadius: 9999,
                      }}
                    >
                      <Text
                        as={'h6'}
                        size={'3'}
                        color={'white'}
                        style={{
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          lineHeight: 1,
                        }}
                      >
                        Epic
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Text
                      as={'h6'}
                      size={'6'}
                      style={{
                        fontWeight: 500,
                      }}
                    >
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStarSolid}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStarSolid}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStar}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStar}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStar}
                        style={{ marginRight: '0.125ch' }}
                      />
                    </Text>
                  </Flex>
                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Text
                      as={'h6'}
                      size={'3'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1,
                      }}
                    >
                      July 4th, 2023
                    </Text>
                  </Flex>
                </ListingRow>
                <ListingRow direction={'row'} align={'center'}>
                  <Flex
                    direction={'column'}
                    style={{ maxWidth: '25%', width: '100%' }}
                  >
                    <Text
                      as={'h3'}
                      size={'4'}
                      style={{
                        fontWeight: 600,
                        paddingBottom: '0.25rem',
                      }}
                    >
                      Course Name
                    </Text>
                    <Text
                      as={'h3'}
                      size={'3'}
                      style={{
                        fontWeight: 400,
                        width: '100%',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        lineHeight: 1.1,
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse venenatis id lorem non vehicula.
                    </Text>
                  </Flex>
                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Flex
                      align={'center'}
                      justify={'center'}
                      style={{
                        backgroundColor: 'rgba(166, 207, 102, 0.7)',
                        border: '1px solid rgba(166, 207, 102, 1)',
                        padding: '0.125rem 0.5rem',
                        borderRadius: 9999,
                      }}
                    >
                      <Text
                        as={'h6'}
                        size={'3'}
                        color={'white'}
                        style={{
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          lineHeight: 1,
                        }}
                      >
                        Epic
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Text
                      as={'h6'}
                      size={'6'}
                      style={{
                        fontWeight: 500,
                      }}
                    >
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStarSolid}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStarSolid}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStar}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStar}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStar}
                        style={{ marginRight: '0.125ch' }}
                      />
                    </Text>
                  </Flex>
                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Text
                      as={'h6'}
                      size={'3'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1,
                      }}
                    >
                      July 4th, 2023
                    </Text>
                  </Flex>
                </ListingRow>
                <ListingRow direction={'row'} align={'center'}>
                  <Flex
                    direction={'column'}
                    style={{ maxWidth: '25%', width: '100%' }}
                  >
                    <Text
                      as={'h3'}
                      size={'4'}
                      style={{
                        fontWeight: 600,
                        paddingBottom: '0.25rem',
                      }}
                    >
                      Course Name
                    </Text>
                    <Text
                      as={'h3'}
                      size={'3'}
                      style={{
                        fontWeight: 400,
                        width: '100%',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse venenatis id lorem non vehicula.
                    </Text>
                  </Flex>
                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Flex
                      align={'center'}
                      justify={'center'}
                      style={{
                        backgroundColor: 'rgba(166, 207, 102, 0.7)',
                        border: '1px solid rgba(166, 207, 102, 1)',
                        padding: '0.125rem 0.5rem',
                        borderRadius: 9999,
                      }}
                    >
                      <Text
                        as={'h6'}
                        size={'3'}
                        color={'white'}
                        style={{
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          lineHeight: 1,
                        }}
                      >
                        Epic
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Text
                      as={'h6'}
                      size={'6'}
                      style={{
                        fontWeight: 500,
                      }}
                    >
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStarSolid}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStarSolid}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStar}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStar}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStar}
                        style={{ marginRight: '0.125ch' }}
                      />
                    </Text>
                  </Flex>
                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Text
                      as={'h6'}
                      size={'3'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1,
                      }}
                    >
                      July 4th, 2023
                    </Text>
                  </Flex>
                </ListingRow>
                <ListingRow direction={'row'} align={'center'}>
                  <Flex
                    direction={'column'}
                    style={{ maxWidth: '25%', width: '100%' }}
                  >
                    <Text
                      as={'h3'}
                      size={'4'}
                      style={{
                        fontWeight: 600,
                        paddingBottom: '0.25rem',
                      }}
                    >
                      Course Name
                    </Text>
                    <Text
                      as={'h3'}
                      size={'3'}
                      style={{
                        fontWeight: 400,
                        width: '100%',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse venenatis id lorem non vehicula.
                    </Text>
                  </Flex>
                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Flex
                      align={'center'}
                      justify={'center'}
                      style={{
                        backgroundColor: 'rgba(166, 207, 102, 0.7)',
                        border: '1px solid rgba(166, 207, 102, 1)',
                        padding: '0.125rem 0.5rem',
                        borderRadius: 9999,
                      }}
                    >
                      <Text
                        as={'h6'}
                        size={'3'}
                        color={'white'}
                        style={{
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          lineHeight: 1,
                        }}
                      >
                        Epic
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Text
                      as={'h6'}
                      size={'6'}
                      style={{
                        fontWeight: 500,
                      }}
                    >
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStarSolid}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStarSolid}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStar}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStar}
                        style={{ marginRight: '0.125ch' }}
                      />
                      <Icon
                        size={'2'}
                        color={'link'}
                        icon={faStar}
                        style={{ marginRight: '0.125ch' }}
                      />
                    </Text>
                  </Flex>
                  <Flex
                    style={{ maxWidth: '25%', width: '100%' }}
                    justify={'center'}
                    align={'center'}
                  >
                    <Text
                      as={'h6'}
                      size={'3'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1,
                      }}
                    >
                      July 4th, 2023
                    </Text>
                  </Flex>
                </ListingRow>
              </div>
            </div>
            <div
              style={{ display: 'flex', marginBottom: '4rem', width: '100%' }}
            >
              <div
                style={{
                  flex: '0 0 calc(30% - 4rem)',
                  marginRight: '3rem',
                  padding: '1rem 3rem 1rem 0',
                  borderRight: '1px solid #DFDFDF',
                }}
              >
                <Text
                  as={'h6'}
                  size={'6'}
                  style={{
                    fontWeight: 700,
                    marginBottom: '0.125rem',
                  }}
                >
                  Stats
                </Text>
                <Text
                  as={'p'}
                  size={'4'}
                  style={{
                    fontWeight: 500,
                    lineHeight: 1.3,
                    marginBottom: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  Some interesting data about the experiences you've been on.
                  <Link
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      margin: '2rem 1rem 0 0',
                      borderBottom: '1px solid #9BB579',
                      textDecoration: 'none',
                    }}
                    to="#"
                  >
                    <Text
                      as={'p'}
                      size={'3'}
                      color={'link'}
                      style={{
                        fontWeight: 600,
                        lineHeight: 1.5,
                        marginRight: '0.5rem',
                      }}
                    >
                      View more stats
                    </Text>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      style={{
                        color: '#9BB579',
                        fontSize: '.9rem',
                      }}
                    />
                  </Link>
                </Text>
              </div>
              <div
                style={{
                  padding: '1rem 0',
                  width: '100%',
                }}
              >
                <div style={{ marginBottom: '4rem', zoom: 0.65 }}>
                  <USAMap
                    customize={statesCustomConfig()}
                    onClick={mapHandler}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '0 0 1rem',
                    gap: '0.25rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0 1rem 0 0',
                    }}
                  >
                    <Icon
                      icon={faFlashlight}
                      style={{
                        color: '#9BB579',
                      }}
                      size={'1'}
                    />
                    <Text
                      as={'p'}
                      size={'3'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1.5,
                        paddingTop: '0.15rem',
                        marginLeft: '0.25rem',
                      }}
                    >
                      Flashlight
                    </Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0 1rem 0 0',
                    }}
                  >
                    <Icon
                      icon={faSkull}
                      style={{
                        color: '#9BB579',
                      }}
                      size={'1'}
                    />
                    <Text
                      as={'p'}
                      size={'3'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1.5,
                        paddingTop: '0.15rem',
                        marginLeft: '0.25rem',
                      }}
                    >
                      Flashlight recommended
                    </Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0 1rem 0 0',
                    }}
                  >
                    <Icon
                      icon={faCrosshairsSimple}
                      style={{
                        color: '#9BB579',
                      }}
                      size={'1'}
                    />
                    <Text
                      as={'p'}
                      size={'3'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1.5,
                        paddingTop: '0.15rem',
                        marginLeft: '0.25rem',
                      }}
                    >
                      Flashlight
                    </Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0 1rem 0 0',
                    }}
                  >
                    <Icon
                      icon={faSnowflake}
                      style={{
                        color: '#9BB579',
                      }}
                      size={'1'}
                    />
                    <Text
                      as={'p'}
                      size={'3'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1.5,
                        paddingTop: '0.15rem',
                        marginLeft: '0.25rem',
                      }}
                    >
                      Flashlight
                    </Text>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '0 0 1rem',
                    gap: '0.25rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: '0 1rem 0 0',
                    }}
                  >
                    <Icon
                      icon={faFlashlight}
                      style={{
                        color: '#9BB579',
                      }}
                      size={'1'}
                    />
                    <Text
                      as={'p'}
                      size={'3'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1.5,
                        paddingTop: '0.15rem',
                        marginLeft: '0.25rem',
                      }}
                    >
                      Flashlight
                    </Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: '0 1rem 0 0',
                    }}
                  >
                    <Icon
                      icon={faSkull}
                      style={{
                        color: '#9BB579',
                      }}
                      size={'1'}
                    />
                    <Text
                      as={'p'}
                      size={'3'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1.5,
                        paddingTop: '0.15rem',
                        marginLeft: '0.25rem',
                      }}
                    >
                      Flashlight recommended
                    </Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: '0 1rem 0 0',
                    }}
                  >
                    <Icon
                      icon={faCrosshairsSimple}
                      style={{
                        color: '#9BB579',
                      }}
                      size={'1'}
                    />
                    <Text
                      as={'p'}
                      size={'3'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1.5,
                        paddingTop: '0.15rem',
                        marginLeft: '0.25rem',
                      }}
                    >
                      Flashlight
                    </Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: '0 1rem 0 0',
                    }}
                  >
                    <Icon
                      icon={faSnowflake}
                      style={{
                        color: '#9BB579',
                      }}
                      size={'1'}
                    />
                    <Text
                      as={'p'}
                      size={'3'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1.5,
                        paddingTop: '0.15rem',
                        marginLeft: '0.25rem',
                      }}
                    >
                      Flashlight
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Flex>
        </Section>
      </Section>
    </Container>
  );
};

const ListingRow = styled(Flex, {
  backgroundColor: 'rgba(0,0,0,0.01)',
  padding: '0.625rem',
  borderBottom: '1px solid $gray3',
  '&:hover': {
    backgroundColor: '$gray36',
  },
  '&:last-of-type': {
    border: 0,
  },
  '&:nth-of-type(even)': {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
});

export default UserOuting;
