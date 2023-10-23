import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_LISTINGS_BY_USER } from '../../../queries';
import { Link, useLocation } from 'react-router-dom';
import { BusinessListingEdit } from './Edit';
import { styled } from '../../../../stitches.config';
import Biker from '../../../assets/images/sedona-1.webp';
import { BusinessAddListing } from '../Listings/Add';
import { EditListing } from '../../EditListing';
import {
  Button,
  Flex,
  Select,
  Skeleton,
  Text,
  Toast,
} from '../../../components';
import { faCirclePlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface BusinessListingsProps {
  notify?: any;
  listings?: any;
  searchedLocation: any;
  setListings?: React.Dispatch<React.SetStateAction<any | null>>;
  setSearchedLocation: React.Dispatch<React.SetStateAction<any | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | number | null>>;
  token: string | number | null;
}

const BusinessListings = ({
  notify,
  searchedLocation,
  setSearchedLocation,
  setToken,
  token,
}: BusinessListingsProps) => {
  const [active, setActive] = useState('');
  const [listingId, setListingId] = useState();
  const location = useLocation();
  const { state }: any = location;

  useEffect(() => {
    if (location.pathname.includes('add')) {
      setActive('add-listing');
    } else if (location.pathname.split('/').length > 3) {
      setActive('edit-listing');
    } else {
      setActive('');
    }
  }, [location]);

  let { data, loading } = useQuery(ALL_LISTINGS_BY_USER);

  return (
    <>
      {state?.alert && <Toast type={'alert'}>{state?.alert}</Toast>}
      {state?.success && <Toast type={'success'}>{state?.success}</Toast>}
      <div>
        {active != 'edit-listing' && active != 'add-listing' && (
          <>
            <Flex
              align={'center'}
              justify={'between'}
              style={{
                marginBottom: '2rem',
              }}
            >
              {loading ? (
                <Skeleton
                  style={{
                    height: '4rem',
                    width: '12rem',
                    marginBottom: '2rem',
                  }}
                />
              ) : (
                <Text
                  as={'h1'}
                  size={'8'}
                  style={{
                    fontWeight: 700,
                  }}
                >
                  {data?.allListingsByUser?.length} Listings
                </Text>
              )}
              <Button
                variant="action"
                outline
                small
                style={{ marginLeft: '1rem' }}
              >
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  style={{ marginRight: '1ch' }}
                />
                Add listing
              </Button>
            </Flex>
            <Flex
              align={'end'}
              style={{
                marginBottom: '2.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
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
              <Text color={'link'} style={{ flexShrink: 0 }}>
                Sort: Ascending
              </Text>
            </Flex>
            {/* <div
              style={{
                display: 'grid',
                gap: '3rem',
                gridTemplateColumns: 'repeat(5, 1fr)',
              }}
            >
              <Link
                to={'./add'}
                style={{
                  backgroundColor: '#fafbf8',
                  borderRadius: 8,
                  border: '2px dashed #959A8A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '2.25rem',
                  fontWeight: 700,
                  color: '#959A8A',
                  padding: '1rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
              >
                Add New Listing
              </Link>
              {loading ? (
                <>
                  <Skeleton style={{ height: '23.5rem' }} />
                  <Skeleton style={{ height: '23.5rem' }} />
                  <Skeleton style={{ height: '23.5rem' }} />
                  <Skeleton style={{ height: '23.5rem' }} />
                  <Skeleton style={{ height: '23.5rem' }} />
                  <Skeleton style={{ height: '23.5rem' }} />
                  <Skeleton style={{ height: '23.5rem' }} />
                  <Skeleton style={{ height: '23.5rem' }} />
                  <Skeleton style={{ height: '23.5rem' }} />
                </>
              ) : (
                data.allListingsByUser.map((l: any, index: number) => {
                  return (
                    <div key={l._id + index}>
                      <Link
                        to={'./' + l._id}
                        onClick={() => setListingId(l._id)}
                        state={l}
                        style={{
                          textDecoration: 'none',
                        }}
                      >
                        <ListingBlock
                          style={{
                            backgroundImage: l.listingPhoto
                              ? `url(${l.listingPhoto}`
                              : ``,
                            backgroundSize: 'cover',
                          }}
                        >
                          <Text
                            as={'h3'}
                            size={'7'}
                            style={{
                              fontWeight: 700,
                            }}
                          >
                            {l.name}
                          </Text>
                        </ListingBlock>
                      </Link>
                    </div>
                  );
                })
              )}
            </div> */}
            <div>
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
                  <Text style={{ fontWeight: 700 }}>Instructors</Text>
                </Flex>
                <Flex
                  style={{ maxWidth: '25%', width: '100%' }}
                  justify={'center'}
                  align={'center'}
                >
                  <Text style={{ fontWeight: 700 }}>Created date</Text>
                </Flex>
              </ListingRow>
              {data?.allListingsByUser?.map((l: any, index: number) => {
                console.log('l', l);
                return (
                  <ListingRow
                    as={Link}
                    to={'./' + l._id}
                    onClick={() => setListingId(l._id)}
                    state={l}
                    direction={'row'}
                    align={'center'}
                    key={l._id + index}
                  >
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
                        {l.name}
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
                        {l.description}
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
                      <div
                        style={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '9999px',
                          backgroundColor: '#eaeaea',
                          position: 'relative',
                          zIndex: 4,
                        }}
                      ></div>
                      <div
                        style={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '9999px',
                          backgroundColor: '#dadada',
                          position: 'relative',
                          marginLeft: '-1.5rem',
                          zIndex: 3,
                        }}
                      ></div>
                      <div
                        style={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '9999px',
                          backgroundColor: '#cacaca',
                          position: 'relative',
                          marginLeft: '-1.5rem',
                          zIndex: 2,
                        }}
                      ></div>
                      <div
                        style={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '9999px',
                          backgroundColor: '#bababa',
                          position: 'relative',
                          marginLeft: '-1.5rem',
                          zIndex: 1,
                        }}
                      ></div>
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
                        {l.date}
                      </Text>
                    </Flex>
                  </ListingRow>
                );
              })}
            </div>
          </>
        )}
        {active == 'add-listing' && (
          <BusinessAddListing
            setError={notify}
            setSearchedLocation={setSearchedLocation}
            searchedLocation={searchedLocation}
            setToken={setToken}
            token={token}
          />
        )}
        {active == 'edit-listing' && (
          <BusinessListingEdit
            setSearchedLocation={setSearchedLocation}
            searchedLocation={searchedLocation}
            setToken={setToken}
            token={token}
          />
        )}
      </div>
    </>
  );
};

const ListingBlock = styled('div', {
  backgroundColor: '$olive2',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  borderRadius: '0.5rem',
  display: 'flex',
  alignItems: 'flex-end',
  height: '23.5rem',
  width: '100%',
  padding: '1.5rem',
  position: 'relative',
  '> *': {
    zIndex: 1,
  },
});

const ListingRow = styled(Flex, {
  backgroundColor: 'rgba(0,0,0,0.01)',
  padding: '0.625rem',
  borderBottom: '1px solid $gray3',
  textDecoration: 'none',
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

export default BusinessListings;
