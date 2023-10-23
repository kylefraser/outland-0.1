import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  Suspense,
} from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  Button,
  Container,
  Checkbox,
  Flex,
  Grid,
  Icon,
  Section,
  Select,
  Skeleton,
} from '../../components';
import { styled } from '../../../stitches.config';
import { SEARCH_LISTINGS } from './../../queries';
import GuideExplore from '../../assets/images/guide-explore.webp';
import { faFilter } from '@fortawesome/pro-regular-svg-icons';
import useLocationParams from '../../helpers/useLocationParams';
import { Modal } from '../../components/Modal';
import {
  faCircleXmark,
  faCrosshairsSimple,
  faFlashlight,
  faSkull,
  faSnowflake,
} from '@fortawesome/pro-solid-svg-icons';
import { Text } from '../../components';
import {
  FIREARM_AMENITIES,
  LISTING_TYPES,
  REGIONS,
  SKILL_LEVELS,
} from '../../utils/constants';

const MapView = React.lazy(() => import('../../components/Map/Map'));
const ListingItem = React.lazy(
  () => import('../../components/ListingItem/ListingItem')
);

interface MapSceneProps {
  locationCoords: any | null;
  searchedLocation: any;
  setSearchedLocation: React.Dispatch<React.SetStateAction<any | null>>;
}

const MapScene = ({
  locationCoords,
  setSearchedLocation,
  searchedLocation,
}: MapSceneProps) => {
  const [locationListings, setListings] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [originalColor, setOriginalColor] = useState(false);
  const [inBounds, setInBounds] = useState<any>(null);
  const [filterType, setFilterType] = useState<any>([]);
  const [skillLevel, setSkillLevel] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<any>(false);

  const location = useLocationParams();

  const locationParam = location.get('location');
  const locationType = location.get('type');

  const [searchListings, listings] = useLazyQuery(SEARCH_LISTINGS, {
    onCompleted: (data) => {
      console.log('data', data);
      setListings(data?.searchListings);
    },
  });

  useEffect(() => {
    if (inBounds) {
      searchListings({
        variables: {
          swLat: inBounds._sw.lat,
          swLng: inBounds._sw.lng,
          neLat: inBounds._ne.lat,
          neLng: inBounds._ne.lng,
          filterType: filterType,
        },
      });
    }

    if (locationParam) {
      setSearchedLocation(locationParam);
    }
  }, [inBounds, filterType, locationParam]);

  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<number>(0);

  useLayoutEffect(() => {
    if (ref.current) {
      setDimensions(ref.current.offsetHeight);
    }

    if (locationType) {
      setFilterType(locationType.split(','));
    }
  }, []);

  const onMouseHoverLocation = (id: string) => {
    let markers: any = [];
    markers = [...document.querySelectorAll('.marker')];

    markers.filter((markerId: any) => {
      if (
        markerId.style.backgroundColor != 'rgb(0, 0, 0)' &&
        markerId.dataset.listing == id
      ) {
        setOriginalColor(markerId.style.backgroundColor);
      }

      if (isHovered != markerId.dataset.listing) {
        if (markerId.dataset.listing == id) {
          setIsHovered(markerId.dataset.listing);
          markerId.style.backgroundColor = 'rgb(0, 0, 0)';
          markerId.style.zIndex = 10;
        }
      }
    });
  };

  const onMouseLeaveLocation = (id: string) => {
    let markers: any = [];
    markers = [...document.querySelectorAll('.marker')];

    markers.filter((markerId: any) => {
      if (markerId.dataset.listing === id) {
        markerId.style.backgroundColor = originalColor;
        markerId.style.zIndex = 'initial';
      }
    });

    setIsHovered(false);
  };

  const onTypeSwitch = (type: string) => {
    if (filterType.includes(type)) {
      setFilterType(filterType.filter((i: any) => i !== type));
    } else {
      setFilterType((filterType: any) => [...filterType, type]);
    }
  };

  const onSkillLevelSwitch = (skill_level: string) => {
    if (skillLevel.includes(skill_level)) {
      setSkillLevel(skillLevel.filter((i: any) => i !== skill_level));
    } else {
      setSkillLevel((skillLevel: any) => [...skillLevel, skill_level]);
    }
  };

  return (
    <>
      <Grid
        style={{
          gridTemplateColumns: '45vw 55vw',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <div
          style={{
            zIndex: 1,
          }}
        >
          <ListingsContainer>
            <Section size={'1'}>
              {/* <input type="search" onChange={(e) => handleInputChange(e)} /> */}
              <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <FilterModalHeader justify={'between'} align={'center'}>
                  <Text color={'text'} as="h2" size={'7'}>
                    Filter
                  </Text>
                  {''}
                  <Icon
                    size={'3'}
                    color={'text'}
                    icon={faCircleXmark}
                    onClick={() => setModalOpen(!modalOpen)}
                    style={{ cursor: 'pointer' }}
                  />
                </FilterModalHeader>
                <Text
                  color={'text'}
                  as="h4"
                  size={'6'}
                  style={{
                    fontWeight: 700,
                  }}
                >
                  Type
                </Text>
                <div
                  style={{
                    marginTop: '1rem',
                    width: '100%',
                  }}
                >
                  <Grid
                    columns={4}
                    gap={8}
                    style={{
                      width: '100%',
                    }}
                  >
                    {LISTING_TYPES.map((type, i) => (
                      <TypeBlock
                        key={i}
                        active={filterType.includes(type)}
                        onClick={() => onTypeSwitch(type)}
                      >
                        {type}
                      </TypeBlock>
                    ))}
                  </Grid>
                  {/* <Input
                label="Skill Level"
                placeholder={skillLevel ? skillLevel : 'Patriot'}
                onChange={(event: React.ChangeEvent) =>
                  setSkillLevel((event.target as HTMLInputElement).value)
                }
              /> */}
                </div>
                <Text
                  color={'text'}
                  as="h4"
                  size={'6'}
                  style={{
                    fontWeight: 700,
                    marginBottom: '1.5rem',
                    marginTop: '4rem',
                  }}
                >
                  Price
                </Text>

                <Select small selectProps={{ defaultValue: 'price' }}>
                  <option value="price" disabled>
                    Price
                  </option>
                  <option value="one">One</option>
                  <option value="two">Two</option>
                  <option value="three">Three</option>
                  <option value="four">Four</option>
                </Select>
                <Text
                  color={'text'}
                  size={'6'}
                  as="h4"
                  style={{
                    fontWeight: 700,
                    marginTop: '4rem',
                  }}
                >
                  Skill Level
                </Text>
                <div
                  style={{
                    marginTop: '1rem',
                    width: '100%',
                  }}
                >
                  <Grid
                    columns={5}
                    gap={8}
                    style={{
                      width: '100%',
                    }}
                  >
                    {SKILL_LEVELS.map((skill_level, i) => (
                      <TypeBlock
                        key={i}
                        active={skillLevel.includes(skill_level)}
                        onClick={() => onSkillLevelSwitch(skill_level)}
                      >
                        {skill_level}
                      </TypeBlock>
                    ))}
                  </Grid>
                  {/* <Input
                label="Skill Level"
                placeholder={skillLevel ? skillLevel : 'Patriot'}
                onChange={(event: React.ChangeEvent) =>
                  setSkillLevel((event.target as HTMLInputElement).value)
                }
              /> */}
                </div>
                <Text
                  color={'text'}
                  as="h4"
                  size={'6'}
                  style={{
                    fontWeight: 700,
                    marginBottom: '1.5rem',
                    marginTop: '4rem',
                  }}
                >
                  Amenities
                </Text>
                <Grid columns={4} gap={4}>
                  {FIREARM_AMENITIES.map((amenity, i) => (
                    <Checkbox key={i}>
                      <Text
                        color={'text'}
                        as="p"
                        size={'4'}
                        style={{
                          color: '$olive6',
                          fontWeight: 700,
                        }}
                      >
                        {amenity}
                      </Text>
                    </Checkbox>
                  ))}
                </Grid>
                <Text
                  color={'text'}
                  style={{
                    fontSize: '1.75rem',
                    color: '#2b331b',
                    fontWeight: 700,
                    fontFamily: "'Outfit', sans-serif",
                    marginBottom: '1.5rem',
                    marginTop: '4rem',
                  }}
                >
                  Region
                </Text>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2rem',
                    width: '100%',
                  }}
                >
                  {REGIONS.map((region, i) => (
                    <RegionButton
                      key={i}
                      align={'center'}
                      justify={'center'}
                      direction={'column'}
                    >
                      <Text
                        color={'text'}
                        size={'6'}
                        style={{
                          fontWeight: 700,
                        }}
                      >
                        {region}
                      </Text>
                    </RegionButton>
                  ))}
                </div>
                <FilterModalFooter justify={'between'} align={'center'}>
                  <h2>{''}</h2>
                  <h2>{''}</h2>
                  <div style={{ display: 'flex', gap: '2rem' }}>
                    <Button
                      variant={'secondary'}
                      outline
                      onClick={() => setModalOpen(!modalOpen)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setModalOpen(!modalOpen)}>
                      Apply
                    </Button>
                  </div>
                </FilterModalFooter>
              </Modal>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Text
                  as={'h2'}
                  size={'8'}
                  style={{
                    fontWeight: 700,
                  }}
                >
                  Narrow your search results
                </Text>
                <Button
                  variant="action"
                  outline
                  small
                  onClick={() => setModalOpen(!modalOpen)}
                >
                  <Icon
                    size={'3'}
                    icon={faFilter}
                    style={{
                      marginRight: '0.5ch',
                    }}
                  />{' '}
                  Filter
                </Button>
              </div>
              {(listings?.data?.searchListings?.length < 1 &&
                !listings.loading) ||
              listings.error ? (
                <Flex
                  align={'center'}
                  justify={'center'}
                  direction={'column'}
                  style={{
                    backgroundColor: '#fafbf8',
                    borderRadius: 8,
                    border: '2px dashed #959A8A',
                    padding: '5rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                  }}
                >
                  <Text
                    as={'h4'}
                    color={'text'}
                    size={7}
                    style={{
                      fontWeight: 700,
                      marginBottom: '1rem',
                    }}
                  >
                    No results found
                  </Text>
                  <Text as={'h5'} size={6} color={'text'}>
                    Zoom and move around the map to search new areas or search a
                    new location.
                  </Text>
                </Flex>
              ) : (
                <ListingsGrid gapX={7} gapY={7}>
                  {listings?.data?.searchListings?.length > 4 && (
                    <ListingBoxContainer direction={'column'}>
                      <Flex
                        justify={'between'}
                        style={{
                          marginBottom: '0.5rem',
                          height: '100%',
                          marginRight: 0,
                          backgroundColor: 'transparent',
                          flex: 0,
                          alignItems: 'center',
                          width: '100%',
                        }}
                      >
                        <Text
                          as={'h5'}
                          size={'6'}
                          style={{
                            fontWeight: 700,
                          }}
                        >
                          Top rated
                        </Text>
                        <Flex align={'center'} justify={'center'}>
                          <div
                            style={{
                              width: '0.5rem',
                              height: '0.5rem',
                              backgroundColor: '#2b331a',
                              borderRadius: '50%',
                              marginRight: '0.5rem',
                            }}
                          ></div>
                          <div
                            style={{
                              width: '0.5rem',
                              height: '0.5rem',
                              backgroundColor: '#dadada',
                              borderRadius: '50%',
                              marginRight: '0.5rem',
                            }}
                          ></div>
                          <div
                            style={{
                              width: '0.5rem',
                              height: '0.5rem',
                              backgroundColor: '#dadada',
                              borderRadius: '50%',
                              marginRight: '0.5rem',
                            }}
                          ></div>
                        </Flex>
                      </Flex>
                      <Flex
                        style={{
                          cursor: 'pointer',
                          height: '100%',
                          width: '100%',
                        }}
                      >
                        <div
                          style={{
                            backgroundImage: `url('${GuideExplore}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            height: '100%',
                            flexGrow: 1,
                            flex: '0 0 calc(50% - 1rem)',
                            backgroundColor: '#e0e0e0',
                            borderRadius: 6,
                            marginRight: '1rem',
                          }}
                        ></div>
                        <Flex
                          direction={'column'}
                          style={{
                            height: '100%',
                            position: 'relative',
                            width: '100%',
                          }}
                        >
                          <Text
                            as={'h6'}
                            size={'3'}
                            style={{
                              fontWeight: 600,
                              marginTop: '0.5rem',
                            }}
                          >
                            Date Time
                          </Text>
                          <Text
                            as={'h3'}
                            size={'6'}
                            style={{
                              fontWeight: 700,
                              marginTop: '0.5rem',
                              marginBottom: '0.25rem',
                            }}
                          >
                            Name
                          </Text>
                          <Text
                            as={'p'}
                            style={{
                              margin: '0.5rem 0 1rem',
                              lineHeight: 1.2,
                            }}
                          >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse venenatis id lorem non vehicula.
                          </Text>
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
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginTop: 'auto',
                              width: '100%',
                            }}
                          >
                            <Text
                              as={'h3'}
                              size={'6'}
                              style={{
                                fontWeight: 600,
                              }}
                            >
                              Kennebunkport, Maine
                            </Text>
                            <Text
                              as={'h3'}
                              size={'6'}
                              style={{
                                fontWeight: 600,
                              }}
                            >
                              $250
                            </Text>
                          </div>
                        </Flex>
                      </Flex>
                    </ListingBoxContainer>
                  )}
                  {listings.loading ? (
                    <>
                      <Skeleton variant={'map_listing'} />
                      <Skeleton variant={'map_listing'} />
                      <Skeleton variant={'map_listing'} />
                      <Skeleton variant={'map_listing'} />
                      <Skeleton variant={'map_listing'} />
                      <Skeleton variant={'map_listing'} />
                      <Skeleton variant={'map_listing'} />
                      <Skeleton variant={'map_listing'} />
                    </>
                  ) : (
                    <Suspense fallback={''}>
                      {listings?.data?.searchListings?.map((l: any, i: any) => (
                        <ListingItem
                          data-listing={l._id}
                          listing={l}
                          key={i}
                          onMouseEnter={() => onMouseHoverLocation(l._id)}
                          onMouseLeave={() => onMouseLeaveLocation(l._id)}
                        />
                      ))}
                    </Suspense>
                  )}
                </ListingsGrid>
              )}
            </Section>
          </ListingsContainer>
        </div>
        <Suspense fallback={''}>
          <MapView
            style={{
              height: 'calc(100vh - 62px)',
              right: 0,
              width: '100%',
              top: 62,
              position: 'sticky',
            }}
            listings={locationListings}
            setSearchedLocation={setSearchedLocation}
            searchedLocation={searchedLocation}
            locationCoords={locationCoords}
            setInBounds={setInBounds}
          />
        </Suspense>
      </Grid>
    </>
  );
};

export default MapScene;

const ListingsContainer = styled(Container, {
  marginBottom: '20rem',
});

const ListingBoxContainer = styled(Flex, {
  backgroundColor: '$olive2',
  gridArea: 'top',
  padding: '1rem',
  marginLeft: '-1rem',
  width: 'calc(100% + 2rem)',
  '& > div:first-of-type': {
    flex: '0 0 33%',
    height: '15rem',
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginRight: '1rem',
  },
  '&:hover': {
    backgroundColor: '$gray36',
  },
});

const ListingsGrid = styled(Grid, {
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateAreas: `'. .'
                      '. .'
                      'top top'
                      '. .'`,
  '@media screen and (min-width: 1440px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridAutoRows: 'minmax(25rem, auto)',
    gridTemplateAreas: `'. . .'
                      '. top top'
                      '. . .'`,
  },
});

const GuideCategories = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 15%)',
  gap: '1rem',
  marginBottom: '1rem',
  '& > div': {
    background: 'linear-gradient(95.7deg, #535F3C 19.28%, #424B30 82.74%)',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '7rem',
    '& > h2': {
      color: '#ffffff',
      fontFamily: "'Outfit', sans-serif",
      fontSize: '1.25rem',
      fontWeight: 800,
      textShadow: '0px 1px 2px rgba(0,0,0,0.2)',
    },
  },
});

const TypeBlock = styled('div', {
  height: '8rem',
  width: '100%',
  borderRadius: 4,
  border: '1px solid $gray5',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: "'Outfit', sans-serif",
  color: '$hiContrast',
  backgroundColor: '$olive1',
  fontSize: '1.5rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  position: 'relative',
  transition: 'background-color 150ms cubic-bezier(.79,.29,0,.97',
  boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02)',
  '&:hover': {
    backgroundColor: '$olive3',
  },
  variants: {
    active: {
      true: {
        backgroundColor: '$olive5',
        color: '$white',
        '&:hover': {
          backgroundColor: '$olive6',
        },
      },
    },
  },
});

const RegionButton = styled(Flex, {
  backgroundColor: '#fafbf8',
  borderRadius: 8,
  border: '2px solid #959A8A',
  padding: '$6 $4',
  textAlign: 'center',
  textDecoration: 'none',
  height: '100%',
});

const FilterModalHeader = styled(Flex, {
  position: 'sticky',
  top: 0,
  height: '$10',
  backgroundColor: '#fff',
  width: 'calc(100% + $10)',
  padding: '$7',
  boxShadow: '0px 2px 0px rgba(0,0,0,0.1)',
  zIndex: 1,
  transform: 'translateX(-3rem) translateY(-3rem)',
  fontWeight: 800,
});

const FilterModalFooter = styled(Flex, {
  position: 'sticky',
  bottom: 0,
  height: '$10',
  backgroundColor: '#fff',
  width: 'calc(100% + $10)',
  padding: '$7',
  boxShadow: '0px -2px 2px rgba(0,0,0,0.1)',
  zIndex: 1,
  transform: 'translateX(-3rem) translateY(3rem)',
});
