import React, { useEffect, useState } from 'react';
import { styled } from '../../../stitches.config';
import { Container, Flex, ListingForm, Section, Text } from '../../components';
import { Link, Navigate, useLocation } from 'react-router-dom';

import { BusinessOverview } from './Overview';
import { BusinessSchedule } from './Schedule';
import { BusinessRoster } from './Roster';
import { BusinessFeedback } from './Feedback';
import { BusinessSettings } from './Settings';
import { BusinessListings } from './Listings';

const NavItems = [
  {
    id: 1,
    name: 'overview',
  },
  {
    id: 2,
    name: 'listings',
  },
  {
    id: 3,
    name: 'schedule',
  },
  {
    id: 4,
    name: 'roster',
  },
  {
    id: 5,
    name: 'feedback',
  },
  {
    id: 6,
    name: 'settings',
  },
];

interface BusinessProps {
  searchedLocation: any;
  setSearchedLocation: React.Dispatch<React.SetStateAction<any | null>>;
  setError: any;
  setToken: React.Dispatch<React.SetStateAction<string | number | null>>;
  token?: string | number | null;
  setListings?: React.Dispatch<React.SetStateAction<string | number | null>>;
  isActive?: any;
}

const Business = ({
  setSearchedLocation,
  searchedLocation,
  setError,
  setToken,
  setListings,
  token,
  isActive,
}: BusinessProps) => {
  const [active, setActive] = useState(isActive);
  const location = useLocation();

  if (!token) {
    return (
      <Navigate replace to="/login" state={{ alert: 'Login or Register' }} />
    );
  }

  useEffect(() => {
    // runs on location, i.e. route, change
    console.log('handle route change here', location);
    if (location.pathname.includes('/business/listings')) {
      setActive('listings');
    } else if (location.pathname == '/business/listings/add') {
      setActive('listings_add');
    } else if (location.pathname == '/business/schedule') {
      setActive('schedule');
    } else if (location.pathname == '/business/roster') {
      setActive('roster');
    } else if (location.pathname == '/business/feedback') {
      setActive('feedback');
    } else if (location.pathname == '/business/settings') {
      setActive('settings');
    } else if (location.pathname == '/business') {
      setActive('overview');
    } else {
      setActive('');
    }
  }, [location]);

  return (
    <>
      <Container>
        <Section size={'3'}>
          <BusinessBanner>
            <Text
              as={'h1'}
              size={'9'}
              style={{
                fontWeight: 800,
              }}
            >
              Test Company
            </Text>
          </BusinessBanner>
          <BusinessNav id="businessNav">
            {NavItems.map((i: any) => (
              <BusinessNavItem
                to={i.name == 'overview' ? '/business' : '/business/' + i.name}
                key={i.id}
                active={active == i.name || location.pathname.includes(i.name)}
              >
                {i.name}
              </BusinessNavItem>
            ))}
          </BusinessNav>
          {active == 'overview' && <BusinessOverview />}
          {active == 'listings' && (
            <BusinessListings
              searchedLocation={searchedLocation}
              setSearchedLocation={setSearchedLocation}
              setToken={setToken}
              token={token}
              setListings={setListings}
            />
          )}
          {active == 'listings_add' && (
            <ListingForm
              setError={setError}
              searchedLocation={searchedLocation}
              setSearchedLocation={setSearchedLocation}
              setToken={setToken}
              token={token}
            />
          )}
          {active == 'schedule' && <BusinessSchedule />}
          {active == 'roster' && <BusinessRoster />}
          {active == 'feedback' && <BusinessFeedback />}
          {active == 'settings' && <BusinessSettings />}
        </Section>
      </Container>
    </>
  );
};

const BusinessBanner = styled('div', {
  display: 'flex',
  alignItems: 'flex-end',
  width: '100%',
  position: 'relative',
});

const BusinessNav = styled('ul', {
  display: 'flex',
  alignItems: 'center',
  marginTop: '1rem',
  paddingBottom: '0.5rem',
  borderBottom: '2px solid $gray3',
  margin: '2rem 0',
  width: '100%',
  gap: '2rem',
});

const BusinessNavItem = styled(Link, {
  variants: {
    active: {
      true: {
        color: '$olive4',
        '&::after': {
          width: '100%',
          height: 2,
          backgroundColor: '$olive4',
          position: 'absolute',
          zIndex: 1,
          content: '""',
          left: 0,
          top: '2rem',
        },
      },
    },
  },
  color: '$olive8',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '1.5rem',
  fontWeight: 600,
  textTransform: 'capitalize',
  textDecoration: 'none',
  transform: 'color 150ms ease-in',
  position: 'relative',
  '&:hover': {
    color: '$olive4',
  },
});

export default Business;
