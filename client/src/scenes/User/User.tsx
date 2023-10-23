import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Avatar, Container, Section, Text } from '../../components';
import { useMatch, Link } from 'react-router-dom';
import { FIND_USER } from '../../queries';
import React from 'react';
const ListingItem = React.lazy(
  () => import('../../components/ListingItem/ListingItem')
);

interface UserProps {
  searchedLocation: any;
  setSearchedLocation: React.Dispatch<React.SetStateAction<any | null>>;
  setError: any;
  setToken: React.Dispatch<React.SetStateAction<string | number | null>>;
  token?: string | number | null;
}

const User = ({
  setSearchedLocation,
  searchedLocation,
  setToken,
  token,
}: UserProps) => {
  const match = useMatch('/user/:id');
  const [findUser, result] = useLazyQuery(FIND_USER);

  useEffect(() => {
    findUser({ variables: { idToSearch: match?.params.id } });
  }, []);

  return (
    <Container>
      <Section size={'3'}>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          <div
            style={{
              backgroundSize: '100%',
              backgroundColor: '#f0f0f0',
              width: '6rem',
              height: '6rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              color: '#959a8a',
            }}
          ></div>
          <div>
            <Text
              as={'h2'}
              size={'8'}
              style={{
                fontWeight: 700,
              }}
            >
              {result?.data?.findUser.username}
            </Text>
            <Text
              as={'h4'}
              size={'5'}
              style={{
                fontWeight: 600,
              }}
            >
              Some stuff maybe
            </Text>
          </div>
        </div>
        <div
          style={{
            marginBottom: '4rem',
          }}
        >
          <Text
            as={'h3'}
            size={'6'}
            style={{
              fontWeight: 600,
            }}
          >
            About
          </Text>
          <Text
            as={'p'}
            size={'5'}
            style={{
              lineHeight: 1.5,
            }}
          >
            Lorem ipsum...
          </Text>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <Text
            as={'h3'}
            size={'6'}
            style={{
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            {result?.data?.findUser.listings.length} listings posted
          </Text>
          <a
            style={{
              color: '#a6cf70',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              fontSize: '1rem',
              textDecoration: 'underline',
            }}
          >
            View previous listings
          </a>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            marginBottom: '4rem',
          }}
        >
          {result?.data?.findUser.listings.map((l: any, i: number) => {
            return <ListingItem data-listing={l._id} listing={l} key={i} />;
          })}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <Text
            as={'h3'}
            size={'6'}
            style={{
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            Feedback
          </Text>
          <a
            style={{
              color: '#a6cf70',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              fontSize: '1rem',
              textDecoration: 'underline',
            }}
          >
            View all feedback
          </a>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              border: '1px solid #dedede',
              borderRadius: '6px',
              padding: '1rem',
              flex: '0 0 calc(50% - 0.5rem)',
            }}
          >
            <div
              style={{
                backgroundColor: '#dedede',
                borderRadius: '50%',
                flexShrink: 0,
                marginRight: '1rem',
                height: '2.5rem',
                width: '2.5rem',
              }}
            ></div>
            <div>
              <Text
                as={'h4'}
                size={'5'}
                style={{
                  fontWeight: 600,
                }}
              >
                First Last
              </Text>
              <Text as={'p'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse venenatis id lorem non vehicula.
              </Text>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              border: '1px solid #dedede',
              borderRadius: '6px',
              padding: '1rem',
              flex: '0 0 calc(50% - 0.5rem)',
            }}
          >
            <div
              style={{
                backgroundColor: '#dedede',
                borderRadius: '50%',
                flexShrink: 0,
                marginRight: '1rem',
                height: '2.5rem',
                width: '2.5rem',
              }}
            ></div>
            <div>
              <Text
                as={'h4'}
                size={'5'}
                style={{
                  fontWeight: 600,
                }}
              >
                First Last
              </Text>
              <Text as={'p'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse venenatis id lorem non vehicula.
              </Text>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              border: '1px solid #dedede',
              borderRadius: '6px',
              padding: '1rem',
              flex: '0 0 calc(50% - 0.5rem)',
            }}
          >
            <div
              style={{
                backgroundColor: '#dedede',
                borderRadius: '50%',
                flexShrink: 0,
                marginRight: '1rem',
                height: '2.5rem',
                width: '2.5rem',
              }}
            ></div>
            <div>
              <Text
                as={'h4'}
                size={'5'}
                style={{
                  fontWeight: 600,
                }}
              >
                First Last
              </Text>
              <Text as={'p'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse venenatis id lorem non vehicula.
              </Text>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              border: '1px solid #dedede',
              borderRadius: '6px',
              padding: '1rem',
              flex: '0 0 calc(50% - 0.5rem)',
            }}
          >
            <div
              style={{
                backgroundColor: '#dedede',
                borderRadius: '50%',
                flexShrink: 0,
                marginRight: '1rem',
                height: '2.5rem',
                width: '2.5rem',
              }}
            ></div>
            <div>
              <Text
                as={'h4'}
                size={'5'}
                style={{
                  fontWeight: 600,
                }}
              >
                First Last
              </Text>
              <Text as={'p'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse venenatis id lorem non vehicula.
              </Text>
            </div>
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default User;
