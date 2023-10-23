import { useEffect, useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Flex,
  Icon,
  Input,
  Section,
  Text,
} from '../../components';
import { styled } from '../../../stitches.config';
import Gardening from '../../assets/images/gardener.webp';
import Cooking from '../../assets/images/cooking.webp';
import Vegetables from '../../assets/images/vegetables.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCrosshairs,
  faUserCircle,
  faFlashlight,
  faSkull,
  faShieldCross,
  faCrosshairsSimple,
  faBomb,
  faGhost,
  faBolt,
  faSnowflake,
  faRankingStar,
  faHeart,
  faShare,
  faDirections,
} from '@fortawesome/pro-regular-svg-icons';
import {
  faCalendarAlt,
  faHeart as faHeartSolid,
  faLocationDot,
  faStar,
} from '@fortawesome/pro-solid-svg-icons';
import { faAirbnb } from '@fortawesome/free-brands-svg-icons';
import { ADD_FAVORITE, FIND_LISTING_BY_ID, ME } from '../../queries';
import { useLazyQuery, useMutation } from '@apollo/client';
import useComponentVisible from '../../helpers/helpers';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import { useForm } from 'react-hook-form';
interface ListingProps {
  token: any;
}

const Listing = ({ token }: ListingProps) => {
  const [tickets, setTickets] = useState<number | any>(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible('');
  const [dateValue, setDateChange] = useState<any>();
  const [range, setDateRange] = useState(false);
  let navigate = useNavigate();

  function handleChange(e: any) {
    if (e.target.value == '' || Math.sign(e.target.value) == 1) {
      setTickets(e.target.value);
    }
  }

  function addToCart(id: any) {
    localStorage.setItem('outland-item', id + '?tickets=' + tickets);
    navigate('/checkout');
  }

  const match = useMatch('/listings/:id');

  const [me, { data: dataU, loading: loadingU }] = useLazyQuery(ME, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const [findListingById, { loading, data }] = useLazyQuery(
    FIND_LISTING_BY_ID,
    {
      onError: (error) => {
        console.log(error.graphQLErrors[0].message);
      },
    }
  );

  useEffect(() => {
    findListingById({ variables: { searchIdValue: match?.params.id } });
    me();
  }, []);

  useEffect(() => {
    if (dataU?.me) {
      const found = dataU.me.favorites.some(function (item: any) {
        return item._id == data?.findListingById.id;
      });

      if (found) {
        setIsFavorite(true);
      }
    }
  }, [dataU?.me]);

  const [addFavorite] = useMutation(ADD_FAVORITE, {
    onError: (error) => {
      console.log(error);
    },
  });

  const onFavoriteClick = () => {
    if (!token) {
      navigate('/login');
    }
    addFavorite({
      variables: {
        listingId: data?.findListingById.id,
      },
    });

    isFavorite == false ? setIsFavorite(true) : setIsFavorite(false);
  };

  function onDatePickerClick(arg: any) {
    if (isComponentVisible != arg) {
      setIsComponentVisible(arg);
    }
  }

  const onRangeChange = (checked: any) => {
    setDateRange(checked);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  return (
    <>
      <Container>
        <Section size="2">
          <Flex justify={'between'} align={'center'}>
            <Text
              as={'h6'}
              size={'6'}
              style={{
                fontWeight: 500,
              }}
            >
              <Icon
                size={'3'}
                color={'link'}
                icon={faStar}
                style={{ marginRight: '0.5ch' }}
              />
              {data?.findListingById.rating}
            </Text>
            <Text
              as={'h6'}
              size={'6'}
              style={{
                cursor: 'pointer',
                fontWeight: 500,
              }}
              onClick={() => onFavoriteClick()}
            >
              <Icon
                size={'3'}
                color={'link'}
                icon={!isFavorite ? faHeart : faHeartSolid}
                style={{ marginRight: '1ch' }}
              />
              Add to favorites
            </Text>
          </Flex>
          <PhotoGrid>
            <FeaturePhoto
              style={{
                gridArea: 'featured',
                backgroundImage: `url(${Gardening})`,
              }}
            />
            <FeaturePhoto
              style={{ gridArea: 'one', backgroundImage: `url(${Cooking})` }}
            />
            <FeaturePhoto
              style={{ gridArea: 'two', backgroundImage: `url(${Vegetables})` }}
            />
          </PhotoGrid>
          <Flex
            justify={'between'}
            align={'center'}
            style={{
              marginBottom: '2rem',
            }}
          >
            <Flex>
              <Link to="/company" style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 8,
                    backgroundColor: '#221111',
                    marginRight: '1rem',
                  }}
                ></div>
              </Link>
              <Flex direction={'column'}>
                <Link to="/company" style={{ textDecoration: 'none' }}>
                  <Text
                    as={'h2'}
                    size={'9'}
                    color={'link'}
                    style={{
                      fontWeight: 700,
                      marginBottom: '0.25rem',
                    }}
                  >
                    Business Name
                  </Text>
                </Link>
                <Text
                  as={'p'}
                  size={'4'}
                  style={{
                    textTransform: 'uppercase',
                  }}
                >
                  <Icon size={'1'} icon={faLocationDot} />{' '}
                  {data?.findListingById.city}, {data?.findListingById.state}
                </Text>
              </Flex>
            </Flex>
            <Flex gap={'2'} noShrink>
              <a
                href={
                  'https://www.google.com/maps/place/' +
                  data?.findListingById.city +
                  ',+' +
                  data?.findListingById.state
                }
                target="_blank"
                style={{ textDecoration: 'none' }}
              >
                <Button variant="action" small outline>
                  <FontAwesomeIcon
                    icon={faDirections}
                    style={{ marginRight: '0.5rem' }}
                  />
                  Directions
                </Button>
              </a>
              <Button variant="airbnb" small outline>
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
            </Flex>
          </Flex>
          <Flex>
            <Flex
              direction={'column'}
              style={{
                flex: 1,
                marginRight: '4rem',
              }}
            >
              <Text
                as={'h6'}
                size={'5'}
                style={{
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                }}
              >
                Name
              </Text>
              <Text
                as={'h2'}
                size={'8'}
                style={{
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}
              >
                {data?.findListingById.name}
              </Text>
              <Text
                as={'h6'}
                size={'5'}
                style={{
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                }}
              >
                When
              </Text>
              <Text
                as={'h3'}
                size={'5'}
                style={{
                  fontWeight: 500,
                  marginBottom: '1.5rem',
                }}
              >
                {data?.findListingById.date}, {data?.findListingById.time}
              </Text>
              <Text
                as={'h6'}
                size={'5'}
                style={{
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                }}
              >
                Where
              </Text>
              <Text
                as={'h3'}
                size={'5'}
                style={{
                  fontWeight: 500,
                  marginBottom: '1.5rem',
                }}
              >
                {data?.findListingById.address}
              </Text>
              <Flex
                direction={'column'}
                style={{
                  marginBottom: '1.5rem',
                }}
              >
                <Text
                  as={'h6'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                  }}
                >
                  Instructors
                </Text>
                <Flex
                  direction={'row'}
                  align={'center'}
                  style={{
                    border: '1px solid #dedede',
                    borderRadius: 50,
                    padding: '0.5rem 0.75rem',
                    alignSelf: 'flex-start',
                    marginTop: '0.5rem',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#dedede',
                      borderRadius: '50%',
                      flexShrink: 0,
                      marginRight: '0.25rem',
                      height: '2rem',
                      width: '2rem',
                    }}
                  ></div>
                  <Text
                    as={'p'}
                    size={'5'}
                    style={{
                      fontWeight: 500,
                      lineHeight: 1.5,
                    }}
                  >
                    {data?.findListingById.instructor}
                  </Text>
                </Flex>
              </Flex>
              <Flex
                direction={'column'}
                style={{
                  marginBottom: '3rem',
                  width: '100%',
                }}
              >
                <Text
                  as={'h6'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                  }}
                >
                  Description
                </Text>
                <Text
                  size={'4'}
                  style={{
                    lineHeight: 1.4,
                    marginBottom: '3rem',
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  sit amet lacus ante. Nunc pretium maximus lorem vitae varius.
                  Aenean non pharetra purus, id lacinia ante. Morbi sem urna,
                  eleifend eu mattis in, placerat nec velit. Pellentesque eros
                  enim, vestibulum non convallis a, tempor nec tellus. Mauris
                  non tortor sed elit hendrerit posuere ultrices at eros.
                  Aliquam vitae interdum urna. Duis non condimentum sem. Quisque
                  volutpat efficitur faucibus. Duis mauris dui, tristique
                  faucibus ultricies sed, imperdiet in erat. Vivamus sed metus
                  eget nisl pharetra tristique sit amet sit amet dolor. Cras
                  enim ligula, ultricies eget pulvinar at, varius imperdiet
                  nibh.
                  {data?.findListingById.description}
                </Text>
                <Flex justify={'between'} style={{ width: '100%' }}>
                  <Flex direction={'column'} align={'center'}>
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      style={{
                        color: '#9BB579',
                        fontSize: '3.5rem',
                      }}
                    />
                    <Text
                      as={'p'}
                      size={'8'}
                      style={{
                        fontWeight: 600,
                        lineHeight: 1.5,
                      }}
                    >
                      {data?.findListingById.minCount}/
                      {data?.findListingById.maxCount}
                    </Text>
                  </Flex>
                  <Flex direction={'column'} align={'center'}>
                    <FontAwesomeIcon
                      icon={faCrosshairs}
                      style={{
                        color: '#9BB579',
                        fontSize: '3.5rem',
                      }}
                    />
                    <Text
                      as={'p'}
                      size={'8'}
                      style={{
                        fontWeight: 600,
                        lineHeight: 1.5,
                      }}
                    >
                      {data?.findListingById.courseType}
                    </Text>
                  </Flex>
                  <Flex direction={'column'} align={'center'}>
                    <FontAwesomeIcon
                      icon={faRankingStar}
                      style={{ color: '#9BB579', fontSize: '3.5rem' }}
                    />
                    <Text
                      as={'p'}
                      size={'8'}
                      style={{
                        fontWeight: 600,
                        lineHeight: 1.5,
                        textTransform: 'capitalize',
                      }}
                    >
                      {data?.findListingById.skillLevel}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                direction={'column'}
                style={{
                  marginBottom: '3rem',
                }}
              >
                <Text
                  as={'h6'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                  }}
                >
                  Additional Information
                </Text>
                <Flex
                  wrap={'wrap'}
                  style={{
                    marginBottom: '1rem',
                  }}
                >
                  <Flex
                    align={'center'}
                    style={{
                      flex: '0 0 50%',
                      margin: '0.5rem 0',
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faFlashlight}
                      style={{ color: '#9BB579', fontSize: '1.25rem' }}
                    />
                    <Text
                      size={'4'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1.5,
                        marginLeft: '0.5rem',
                      }}
                    >
                      Flashlight recommended
                    </Text>
                  </Flex>
                  <Flex
                    align={'center'}
                    style={{
                      flex: '0 0 50%',
                      margin: '0.5rem 0',
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faSkull}
                      style={{ color: '#9BB579', fontSize: '1.25rem' }}
                    />
                    <Text
                      size={'4'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1.5,
                        marginLeft: '0.5rem',
                      }}
                    >
                      Flashlight recommended
                    </Text>
                  </Flex>
                  <Flex
                    align={'center'}
                    style={{
                      flex: '0 0 50%',
                      margin: '0.5rem 0',
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCrosshairsSimple}
                      style={{ color: '#9BB579', fontSize: '1.25rem' }}
                    />
                    <Text
                      size={'4'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1.5,
                        marginLeft: '0.5rem',
                      }}
                    >
                      Flashlight recommended
                    </Text>
                  </Flex>
                  <Flex
                    align={'center'}
                    style={{
                      flex: '0 0 50%',
                      margin: '0.5rem 0',
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faSnowflake}
                      style={{ color: '#9BB579', fontSize: '1.25rem' }}
                    />
                    <Text
                      size={'4'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1.5,
                        marginLeft: '0.5rem',
                      }}
                    >
                      Flashlight recommended
                    </Text>
                  </Flex>
                  <Flex
                    align={'center'}
                    style={{
                      flex: '0 0 50%',
                      margin: '0.5rem 0',
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faShieldCross}
                      style={{ color: '#9BB579', fontSize: '1.25rem' }}
                    />
                    <Text
                      size={'4'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1.5,
                        marginLeft: '0.5rem',
                      }}
                    >
                      Flashlight recommended
                    </Text>
                  </Flex>
                  <Flex
                    align={'center'}
                    style={{
                      flex: '0 0 50%',
                      margin: '0.5rem 0',
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faBolt}
                      style={{ color: '#9BB579', fontSize: '1.25rem' }}
                    />
                    <Text
                      size={'4'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1.5,
                        marginLeft: '0.5rem',
                      }}
                    >
                      Flashlight recommended
                    </Text>
                  </Flex>
                  <Flex
                    align={'center'}
                    style={{
                      flex: '0 0 50%',
                      margin: '0.5rem 0',
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faBomb}
                      style={{ color: '#9BB579', fontSize: '1.25rem' }}
                    />
                    <Text
                      size={'4'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1.5,
                        marginLeft: '0.5rem',
                      }}
                    >
                      Flashlight recommended
                    </Text>
                  </Flex>
                  <Flex
                    align={'center'}
                    style={{
                      flex: '0 0 50%',
                      margin: '0.5rem 0',
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faGhost}
                      style={{ color: '#9BB579', fontSize: '1.25rem' }}
                    />
                    <Text
                      size={'4'}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1.5,
                        marginLeft: '0.5rem',
                      }}
                    >
                      Flashlight recommended
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                direction={'column'}
                style={{
                  marginBottom: '3rem',
                }}
              >
                <Text
                  as={'h6'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                  }}
                >
                  Prerequisites
                </Text>
                <Text
                  as={'p'}
                  size={'5'}
                  style={{
                    fontWeight: 500,
                    lineHeight: 1.5,
                    marginBottom: '1.5rem',
                  }}
                >
                  {data?.findListingById.requirements}
                </Text>
              </Flex>
              <Flex
                direction={'column'}
                style={{
                  marginBottom: '3rem',
                }}
              >
                <Text
                  as={'h6'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                  }}
                >
                  Equipment
                </Text>
                <Text
                  as={'p'}
                  size={'5'}
                  style={{
                    fontWeight: 500,
                    lineHeight: 1.5,
                    marginBottom: '1.5rem',
                  }}
                >
                  {data?.findListingById.equipment}
                </Text>
              </Flex>
              <Flex
                direction={'column'}
                style={{
                  marginBottom: '3rem',
                }}
              >
                <Text
                  as={'h6'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                  }}
                >
                  Duration: {data?.findListingById.duration}
                </Text>
              </Flex>
              <Flex
                direction={'column'}
                style={{
                  marginBottom: '3rem',
                }}
              >
                <Text
                  as={'h6'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                  }}
                >
                  Restriction: {data?.findListingById.restrictions}
                </Text>
              </Flex>
              <Flex
                direction={'column'}
                style={{
                  marginBottom: '3rem',
                }}
              >
                <Text
                  as={'h6'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                  }}
                >
                  Type: {data?.findListingById.type}
                </Text>
              </Flex>
            </Flex>
            <CheckoutContainer direction={'column'}>
              <p
                style={{
                  color: '#ffffff',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '4rem',
                }}
              >
                ${data?.findListingById.price}
              </p>
              <DatePickerContainer
                onClick={() => onDatePickerClick('calendar')}
              >
                <Flex align={'center'} justify={'between'}>
                  <div>
                    <DatePickerLabel>Course Date</DatePickerLabel>
                    <DatePickerInput>
                      {!dateValue
                        ? data?.findListingById?.date
                        : format(dateValue, 'MMMM do, yyyy')}
                    </DatePickerInput>
                  </div>
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{ color: '#859d65' }}
                  />
                </Flex>
                {isComponentVisible == 'calendar' && (
                  <div
                    ref={ref}
                    style={{
                      backgroundColor: '#fff',
                      boxShadow: '0 2px 3px rgba(0,0,0,0.1)',
                      padding: '1rem',
                      color: '#000',
                      position: 'absolute',
                      left: '50%',
                      top: '5rem',
                      transform: 'translateX(-50%)',
                      borderRadius: '1rem',
                      zIndex: 1,
                      display: 'flex',
                      gap: '2rem',
                    }}
                    data-type={'calendar'}
                  >
                    <Calendar
                      onChange={setDateChange}
                      value={dateValue}
                      calendarType={'US'}
                      defaultActiveStartDate={new Date(2023, 0, 20)}
                    />
                  </div>
                )}
              </DatePickerContainer>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.9rem',
                  color: '#ffffff',
                  textAlign: 'center',
                  marginBottom: '2rem',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                This course has other dates available
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: 'auto 0',
                  width: '100%',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: '#ffffff',
                    fontWeight: 500,
                    fontSize: '1.25rem',
                  }}
                >
                  Tickets
                </p>
                <div
                  style={{
                    height: 1,
                    width: '100%',
                    margin: '0 0.5rem',
                    borderBottom: '2px dashed #a6cf70',
                  }}
                ></div>
                <Input
                  name="tickets"
                  style={{ width: '6rem' }}
                  type="number"
                  value={tickets}
                  inputProps={{
                    min: '1',
                  }}
                  register={register}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onBlur={() => tickets < 1 && setTickets(1)}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '2rem 0 1rem',
                  width: '100%',
                }}
              >
                <p
                  style={{
                    color: '#ffffff',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    fontSize: '1.25rem',
                    marginTop: 'auto',
                    alignSelf: 'flex-end',
                    flexShrink: 0,
                  }}
                >
                  Service fee
                </p>
                <div
                  style={{
                    height: 1,
                    width: '100%',
                    margin: '0 0.5rem',
                    borderBottom: '2px dashed #a6cf70',
                  }}
                ></div>
                <p
                  style={{
                    color: '#ffffff',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    fontSize: '1.5rem',
                    marginTop: 'auto',
                    alignSelf: 'flex-end',
                  }}
                >
                  $
                  {tickets > 0
                    ? Math.round(data?.findListingById.price * tickets * 0.06)
                    : 0}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: 'auto 0',
                  width: '100%',
                }}
              >
                <p
                  style={{
                    color: '#ffffff',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    fontSize: '2rem',
                    marginTop: 'auto',
                    alignSelf: 'flex-end',
                  }}
                >
                  Total before taxes:
                </p>
                <p
                  style={{
                    color: '#ffffff',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    fontSize: '2rem',
                    marginTop: 'auto',
                    alignSelf: 'flex-end',
                  }}
                >
                  $
                  {tickets > 0
                    ? Math.round(data?.findListingById.price * tickets) +
                      Math.round(data?.findListingById.price * 0.06)
                    : 0}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  marginTop: '3rem',
                  alignSelf: 'flex-end',
                }}
              >
                <Button variant="special" medium>
                  Clear
                </Button>
                <Button
                  variant="primary"
                  medium
                  onClick={() => addToCart(data?.findListingById._id)}
                >
                  Checkout
                </Button>
              </div>
            </CheckoutContainer>
          </Flex>
          <Text
            as={'h6'}
            size={'5'}
            style={{
              fontWeight: 700,
              marginTop: '3rem',
              marginBottom: '1rem',
            }}
          >
            Location
          </Text>
          <div
            style={{
              backgroundImage: `url('https://api.mapbox.com/styles/v1/fraserkc/ckw77lvdq0m0n15rzje21kgri/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B${data?.findListingById.lng}%2C${data?.findListingById.lat}%5D%7D)/${data?.findListingById.lng},${data?.findListingById.lat},10/1184x480?access_token=pk.eyJ1IjoiZnJhc2Vya2MiLCJhIjoiY2t3Nzc2bmZoMTVzcDJ3bGo5eGNwMmx1ZiJ9.4BVSoGs4xQ3bsMsbBW6ABQ')`,
              backgroundColor: '#f0f0f0',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              width: '100%',
              height: '36rem',
              marginBottom: '3rem',
            }}
          ></div>
          <Flex
            align={'center'}
            justify={'between'}
            style={{
              marginBottom: '1rem',
            }}
          >
            <Text
              as={'h6'}
              size={'5'}
              style={{
                fontWeight: 700,
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
          </Flex>
          <Flex wrap={'wrap'} gap={'2'}>
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
                <Text as={'h4'} size={'5'} style={{ fontWeight: 600 }}>
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
                <Text as={'h4'} size={'5'} style={{ fontWeight: 600 }}>
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
                <Text as={'h4'} size={'5'} style={{ fontWeight: 600 }}>
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
                <Text as={'h4'} size={'5'} style={{ fontWeight: 600 }}>
                  First Last
                </Text>
                <Text as={'p'}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse venenatis id lorem non vehicula.
                </Text>
              </div>
            </div>
          </Flex>
        </Section>
      </Container>
    </>
  );
};

const PhotoGrid = styled('div', {
  display: 'grid',
  gridTemplateAreas: `'featured featured featured featured one'
                      'featured featured featured featured two'`,
  height: '24rem',
  gap: '0.5rem',
  marginTop: '1rem',
  marginBottom: '2rem',
});

const FeaturePhoto = styled('div', {
  backgroundColor: '#efefef',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  borderRadius: 8,
  width: '100%',
});

const DatePickerContainer = styled('div', {
  backgroundColor: '#ffffff',
  boxShadow: '0 0 4px rgba(0,0,0,0.1), 0 0 12px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  padding: '0.5rem 1rem',
  position: 'relative',
  transition: 'background-color 150ms cubic-bezier(.79,.29,0,.97)',
  width: '80%',
  margin: '2rem auto 0.75rem',
  borderRadius: 6,
  zIndex: 1,
  '&:last-of-type': {
    borderLeft: '1px solid rgba(0,0,0,0.2)',
    '&:hover': {
      borderLeftColor: 'transparent',
    },
  },
  '&:first-of-type': {
    '&:hover + div': {
      borderLeftColor: 'transparent',
    },
  },
  '&:nth-of-type(2)': {
    borderRight: 0,
    borderLeft: '1px solid rgba(0,0,0,0.2)',
    '&:hover': {
      borderLeftColor: 'transparent',
      '& + div': {
        borderLeftColor: 'transparent',
      },
    },
  },
  '&:focus, &:hover': {
    backgroundColor: '#f4f9f3',
  },
  '&:focus ~ &, &:hover ~ &': {
    borderRightColor: 0,
  },
});

const DatePickerLabel = styled('h6', {
  color: '#859d65',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '0.9rem',
  fontWeight: 500,
  textTransform: 'uppercase',
  margin: '0.5ch 0 0',
});

const DatePickerInput = styled('div', {
  color: '#596248',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '1.375rem',
  fontWeight: 500,
  lineHeight: 'normal',
  marginTop: '0.25rem',
  textTransform: 'capitalize',
});

const CheckoutContainer = styled(Flex, {
  backgroundColor: '$olive4',
  width: '30rem',
  flex: '0 0 30rem',
  borderRadius: 8,
  padding: '3rem',
  position: 'sticky',
  top: 'calc(95px + 3rem)',
  marginBottom: 'auto',
  marginLeft: '2rem',
  boxShadow:
    '0 0px 12px rgba(0,0,0,0.05), 0 0px 24px rgba(0,0,0,0.05), 0 0px 64px rgba(0,0,0,0.05)',
});

export default Listing;
