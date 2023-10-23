import {
  faFlashlight,
  faSkull,
  faCrosshairsSimple,
  faSnowflake,
  faShieldCross,
  faBolt,
  faBomb,
  faGhost,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '../../../stitches.config';
import GuideExplore from '../../assets/images/guide-explore.webp';
import { Flex } from '../Flex';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Link } from 'react-router-dom';

interface ListingItemProps {
  listing: any | null;
  onMouseEnter?: any;
  onMouseLeave?: any;
}
const ListingItem = ({
  listing,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ListingItemProps) => {
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...props}>
      <Link
        to={'/listings/' + listing._id}
        style={{ textDecoration: 'none' }}
        target="_blank"
      >
        {listing.type == 'course' ? (
          <ListingBoxContainer direction={'column'}>
            <div
              style={{
                backgroundImage: `${
                  listing.listingPhoto
                    ? 'url(' + listing.listingPhoto + ')'
                    : 'url(' + GuideExplore + ')'
                }`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                flexShrink: 0,
              }}
            ></div>
            <div
              style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Text
                as={'h6'}
                size={'3'}
                color={'hiContrast'}
                style={{
                  fontWeight: 600,
                  marginTop: '0.5rem',
                }}
              >
                {listing.date} {listing.time}
              </Text>
              <div style={{ margin: '0 0' }}>
                <Text
                  as={'h3'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                    marginTop: '0.5rem',
                  }}
                >
                  {listing.name}
                </Text>
                <Text
                  as={'p'}
                  size={'4'}
                  style={{
                    margin: '0.5rem 0 1rem',
                    lineHeight: 1.2,
                  }}
                >
                  {listing.description}
                </Text>
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
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto',
                }}
              >
                <Text
                  as={'h3'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                >
                  {listing.city}, {listing.state}
                </Text>
                <Text
                  as={'h3'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                  }}
                >
                  ${listing.price}
                </Text>
              </div>
            </div>
          </ListingBoxContainer>
        ) : listing.type == 'guide' ? (
          <ListingBoxContainer direction={'column'}>
            <div
              style={{
                backgroundImage: `${
                  listing.listingPhoto
                    ? 'url(' + listing.listingPhoto + ')'
                    : 'url(' + GuideExplore + ')'
                }`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                flexShrink: 0,
              }}
            ></div>
            <div
              style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Text
                as={'h6'}
                size={'3'}
                color={'hiContrast'}
                style={{
                  fontWeight: 600,
                  marginTop: '0.5rem',
                }}
              >
                {listing.date} {listing.time}
              </Text>
              <div style={{ margin: '0 0' }}>
                <Text
                  as={'h3'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                    marginTop: '0.5rem',
                  }}
                >
                  Guide {listing.name}
                </Text>
                <Text
                  as={'p'}
                  size={'4'}
                  style={{
                    margin: '0.5rem 0 1rem',
                    lineHeight: 1.2,
                  }}
                >
                  {listing.description}
                </Text>
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
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto',
                }}
              >
                <Text
                  as={'h3'}
                  size={5}
                  style={{
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                >
                  {listing.city}, {listing.state}
                </Text>
                <Text
                  as={'h3'}
                  size={5}
                  style={{
                    fontWeight: 600,
                  }}
                >
                  ${listing.price}
                </Text>
              </div>
            </div>
          </ListingBoxContainer>
        ) : listing.type == 'access' ? (
          <ListingBoxContainer direction={'column'}>
            <div
              style={{
                backgroundImage: `${
                  listing.listingPhoto
                    ? 'url(' + listing.listingPhoto + ')'
                    : 'url(' + GuideExplore + ')'
                }`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                flexShrink: 0,
              }}
            ></div>
            <div
              style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Text
                as={'h6'}
                size={'3'}
                color={'hiContrast'}
                style={{
                  fontWeight: 600,
                  marginTop: '0.5rem',
                }}
              >
                {listing.date} {listing.time}
              </Text>
              <div style={{ margin: '0 0' }}>
                <Text
                  as={'h3'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                    marginTop: '0.5rem',
                  }}
                >
                  Access {listing.name}
                </Text>
                <Text
                  as={'p'}
                  size={'4'}
                  style={{
                    margin: '0.5rem 0 1rem',
                    lineHeight: 1.2,
                  }}
                >
                  {listing.description}
                </Text>
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
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto',
                }}
              >
                <Text
                  as={'h3'}
                  size={5}
                  style={{
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                >
                  {listing.city}, {listing.state}
                </Text>
                <Text
                  as={'h3'}
                  size={5}
                  style={{
                    fontWeight: 600,
                  }}
                >
                  ${listing.price}
                </Text>
              </div>
            </div>
          </ListingBoxContainer>
        ) : listing.type == 'epic' ? (
          <ListingBoxContainer direction={'column'}>
            <div
              style={{
                backgroundImage: `${
                  listing.listingPhoto
                    ? 'url(' + listing.listingPhoto + ')'
                    : 'url(' + GuideExplore + ')'
                }`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                flexShrink: 0,
                height: '100%',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  padding: '1rem',
                  borderRadius: 6,
                  background:
                    'linear-gradient(to bottom, transparent, rgba(0,0,0,0.6)',
                }}
              >
                <Flex
                  align={'center'}
                  justify={'center'}
                  style={{
                    backgroundColor: 'rgba(166, 207, 102, 1)',
                    border: '1px solid rgba(166, 207, 102, 1)',
                    padding: '0.125rem 0.5rem',
                    borderRadius: 9999,
                    marginTop: 'auto',
                    alignSelf: 'flex-start',
                    marginBottom: '1rem',
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
                <Text
                  as={'h6'}
                  size={'3'}
                  color={'white'}
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {listing.date} {listing.time}
                </Text>
                <div style={{ margin: '0 0' }}>
                  <Text
                    as={'h3'}
                    size={'7'}
                    color={'white'}
                    style={{
                      fontWeight: 600,
                      marginTop: '0.5rem',
                    }}
                  >
                    {listing.name}
                  </Text>
                  <Text
                    as={'p'}
                    size={'4'}
                    color={'white'}
                    style={{
                      margin: '0.5rem 0 1rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {listing.description}
                  </Text>
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
                      color={'white'}
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
                      color={'white'}
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
                      color={'white'}
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
                      color={'white'}
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
                  }}
                >
                  <Text
                    as={'h3'}
                    size={5}
                    color={'white'}
                    style={{
                      fontWeight: 600,
                      textTransform: 'capitalize',
                    }}
                  >
                    {listing.city}, {listing.state}
                  </Text>
                  <Text
                    as={'h3'}
                    size={5}
                    color={'white'}
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    ${listing.price}
                  </Text>
                </div>
              </div>
            </div>
          </ListingBoxContainer>
        ) : null}
      </Link>
    </div>
  );
};

export default ListingItem;

const ListingBoxContainer = styled(Flex, {
  padding: '1rem',
  marginLeft: '-1rem',
  width: 'calc(100% + 2rem)',
  height: '100%',
  '& > div:first-of-type': {
    height: '13rem',
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginRight: '1rem',
  },
  '&:hover': {
    backgroundColor: '$gray36',
  },
});
