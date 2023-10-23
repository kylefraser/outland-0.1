import { HTMLAttributes, useState, useRef, useEffect } from 'react';
import { styled } from '../../../stitches.config';
import useComponentVisible from '../../helpers/helpers';
import { useNavigate, useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';

import { Button, Search, Switch, Text } from '../';

interface SearchBarProps extends HTMLAttributes<HTMLDivElement> {
  setSearchedLocation: any;
  searchedLocation: string | number | null;
  shadow?: boolean;
}

const SearchBar = ({
  setSearchedLocation,
  searchedLocation,
  shadow,
  ...props
}: SearchBarProps) => {
  const [location, setLocation] = useState<Array<string> | null>(null);
  const history = useNavigate();
  const locationParam = useLocation();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible('');
  const [dateValue, setDateChange] = useState<any>();
  const [typeValue, setTypeChange] = useState<any>([]);
  const [range, setDateRange] = useState(false);
  const inputRef = useRef<any>();

  const searchHistory = localStorage.getItem('outland-search-history');

  function onClickLocation(city: string, state_id: string) {
    setSearchedLocation(city);

    inputRef.current.value = '';
    setLocation(null);

    if (searchHistory == null) {
      localStorage.setItem(
        'outland-search-history',
        `${JSON.stringify([{ city: city, state_id: state_id }])}`
      );
    }

    if (typeof searchHistory === 'string') {
      let newSearchHistory = JSON.parse(searchHistory);

      if (newSearchHistory.length >= 6) {
        newSearchHistory = newSearchHistory.slice(0, 5);
      }

      var found = newSearchHistory.some(function (
        item: { city: any },
        index: any
      ) {
        index;
        return item.city == city;
      });

      !found
        ? newSearchHistory.unshift({ city: city, state_id: state_id })
        : newSearchHistory.unshift(
            newSearchHistory.splice(
              newSearchHistory.indexOf({ city: city }),
              1
            )[0]
          );

      localStorage.setItem(
        'outland-search-history',
        JSON.stringify(newSearchHistory)
      );
    }

    if (locationParam.pathname != '/map') {
      history({ pathname: '/map', search: '?location=' + city });
    } else {
      history({
        pathname: locationParam.pathname,
        search: '?location=' + city,
      });
    }
    setIsComponentVisible('');
  }

  function onClickType(type: string) {
    if (typeValue.includes(type)) {
      setTypeChange(typeValue.filter((i: any) => i !== type));
    } else {
      setTypeChange((typeValue: any) => [...typeValue, type]);
    }
  }

  function onSearchClick(arg: any) {
    if (isComponentVisible != arg) {
      setIsComponentVisible(arg);
    }
  }

  const onRangeChange = (checked: any) => {
    setDateRange(checked);
  };

  return (
    <SearchBarContainer {...props}>
      <SearchBarItem onClick={() => onSearchClick('location')}>
        <SearchLabel>Location</SearchLabel>
        <Input>
          <Search
            setSearchedLocation={setSearchedLocation}
            searchedLocation={searchedLocation}
            setLocation={setLocation}
            inputRef={inputRef}
          />
        </Input>
        {isComponentVisible == 'location' && (
          <ResultsBox ref={ref}>
            <div
              style={{
                flex: '0 0 calc(40% - 0.5rem)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {!searchHistory && !location && (
                <>
                  <div
                    style={{
                      backgroundColor: '#fafbf8',
                      borderRadius: 8,
                      border: '2px dashed #959A8A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      fontFamily: "'Outfit', sans-serif",
                      color: '#959A8A',
                      padding: '2rem',
                      textAlign: 'center',
                      textDecoration: 'none',
                      height: '100%',
                    }}
                  >
                    <h4
                      style={{
                        color: '#2b331a',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '1rem',
                        fontWeight: 700,
                        marginBottom: '1rem',
                      }}
                    >
                      Previously searched locations will show here.
                    </h4>
                  </div>
                </>
              )}
              {location && (
                <>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                    }}
                  >
                    Locations
                  </h3>
                  {location.map((i: any) => {
                    return (
                      <ResultListing key={i.id}>
                        <div
                          style={{
                            backgroundColor: '#DFDFDF',
                            borderRadius: 4,
                            marginRight: '1rem',
                            width: 32,
                            height: 32,
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {i.state_id}
                        </div>
                        <h4 onClick={() => onClickLocation(i.city, i.state_id)}>
                          {i.city}
                        </h4>
                      </ResultListing>
                    );
                  })}
                </>
              )}
              {searchHistory && !location && (
                <>
                  <Text
                    size={'5'}
                    style={{
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                    }}
                  >
                    Recently searched
                  </Text>
                  {JSON.parse(searchHistory)
                    .slice(0, 5)
                    .map((i: any, index: number) => {
                      return (
                        <ResultListing key={index}>
                          <div
                            style={{
                              backgroundColor: '#DFDFDF',
                              borderRadius: 4,
                              marginRight: '0.5rem',
                              width: 32,
                              height: 32,
                              fontSize: '1rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {i.state_id}
                          </div>
                          <Text
                            onClick={() => onClickLocation(i.city, i.state_id)}
                          >
                            {i.city}
                          </Text>
                        </ResultListing>
                      );
                    })}
                </>
              )}
              {location?.length == 0 && (
                <>
                  <div
                    style={{
                      backgroundColor: '#fafbf8',
                      borderRadius: 8,
                      border: '2px dashed #959A8A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      fontFamily: "'Outfit', sans-serif",
                      color: '#959A8A',
                      padding: '3rem',
                      textAlign: 'center',
                      textDecoration: 'none',
                      height: '100%',
                    }}
                  >
                    <h4
                      style={{
                        color: '#2b331a',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        marginBottom: '1rem',
                      }}
                    >
                      No results found
                    </h4>
                  </div>
                </>
              )}
            </div>
            <div>
              <Text
                size={'5'}
                style={{
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                Regions
              </Text>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#fafbf8',
                    borderRadius: 8,
                    border: '2px solid #959A8A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    fontFamily: "'Outfit', sans-serif",
                    color: '#959A8A',
                    padding: '1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    height: '100%',
                  }}
                >
                  <Text
                    size={'4'}
                    style={{
                      color: '#2b331a',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    New England
                  </Text>
                </div>
                <div
                  style={{
                    backgroundColor: '#fafbf8',
                    borderRadius: 8,
                    border: '2px solid #959A8A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    fontFamily: "'Outfit', sans-serif",
                    color: '#959A8A',
                    padding: '1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    height: '100%',
                  }}
                >
                  <Text
                    size={'4'}
                    style={{
                      color: '#2b331a',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Mid-Atlantic
                  </Text>
                </div>
                <div
                  style={{
                    backgroundColor: '#fafbf8',
                    borderRadius: 8,
                    border: '2px solid #959A8A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    fontFamily: "'Outfit', sans-serif",
                    color: '#959A8A',
                    padding: '1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    height: '100%',
                  }}
                >
                  <Text
                    size={'4'}
                    style={{
                      color: '#2b331a',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    South
                  </Text>
                </div>
                <div
                  style={{
                    backgroundColor: '#fafbf8',
                    borderRadius: 8,
                    border: '2px solid #959A8A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    fontFamily: "'Outfit', sans-serif",
                    color: '#959A8A',
                    padding: '1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    height: '100%',
                  }}
                >
                  <Text
                    size={'4'}
                    style={{
                      color: '#2b331a',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Rockies
                  </Text>
                </div>
                <div
                  style={{
                    backgroundColor: '#fafbf8',
                    borderRadius: 8,
                    border: '2px solid #959A8A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    fontFamily: "'Outfit', sans-serif",
                    color: '#959A8A',
                    padding: '1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    height: '100%',
                  }}
                >
                  <Text
                    size={'4'}
                    style={{
                      color: '#2b331a',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Midwest
                  </Text>
                </div>
                <div
                  style={{
                    backgroundColor: '#fafbf8',
                    borderRadius: 8,
                    border: '2px solid #959A8A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    fontFamily: "'Outfit', sans-serif",
                    color: '#959A8A',
                    padding: '1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    height: '100%',
                  }}
                >
                  <Text
                    size={'4'}
                    style={{
                      color: '#2b331a',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Pacific
                  </Text>
                </div>
                <div
                  style={{
                    backgroundColor: '#fafbf8',
                    borderRadius: 8,
                    border: '2px solid #959A8A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    fontFamily: "'Outfit', sans-serif",
                    color: '#959A8A',
                    padding: '1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    height: '100%',
                  }}
                >
                  <Text
                    size={'4'}
                    style={{
                      color: '#2b331a',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    South West
                  </Text>
                </div>
                <div
                  style={{
                    backgroundColor: '#fafbf8',
                    borderRadius: 8,
                    border: '2px solid #959A8A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    fontFamily: "'Outfit', sans-serif",
                    color: '#959A8A',
                    padding: '1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    height: '100%',
                  }}
                >
                  <Text
                    size={'4'}
                    style={{
                      color: '#2b331a',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Appalachia
                  </Text>
                </div>
              </div>
            </div>
          </ResultsBox>
        )}
      </SearchBarItem>
      <SearchBarItem onClick={() => onSearchClick('calendar')}>
        <SearchLabel>Date</SearchLabel>
        <Input>{!dateValue ? 'Any' : format(dateValue, 'MMMM do, yyyy')}</Input>
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
          >
            <Calendar
              onChange={setDateChange}
              value={dateValue}
              calendarType={'US'}
              selectRange={range}
              showDoubleView={range && true}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                flexShrink: 0,
              }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <label
                  htmlFor="range"
                  style={{
                    fontSize: '1.25rem',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Select date range
                </label>
                <Switch
                  id="range"
                  checked={range}
                  onChange={onRangeChange}
                  style={{ marginTop: '0.5rem' }}
                />
              </div>
              <div>
                <h6
                  style={{
                    fontSize: '1.25rem',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Extend search
                </h6>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    marginTop: '.5rem',
                  }}
                >
                  <Button outline mini>
                    + 1 Day
                  </Button>
                  <Button outline mini>
                    + 2 Days
                  </Button>
                  <Button outline mini>
                    + Week
                  </Button>
                  <Button outline mini>
                    + Month
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </SearchBarItem>
      <SearchBarItem onClick={() => onSearchClick('type')}>
        <SearchLabel>Type</SearchLabel>
        <Input>{typeValue.length ? typeValue.join(', ') : 'Any'}</Input>
        {isComponentVisible == 'type' && (
          <div
            ref={ref}
            style={{
              backgroundColor: '#fff',
              boxShadow: '0 2px 3px rgba(0,0,0,0.1)',
              padding: '1rem',
              color: '#000',
              position: 'absolute',
              left: 0,
              top: '5rem',
              borderRadius: '1rem',
              width: '100%',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div
              onClick={() => onClickType('course')}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: typeValue.includes('course') && '#ccc',
              }}
            >
              <div
                style={{
                  backgroundColor: '#DFDFDF',
                  borderRadius: 4,
                  marginRight: '1rem',
                  width: 48,
                  height: 48,
                }}
              ></div>
              <h3
                style={{
                  fontSize: '1.5rem',
                  color: '#596248',
                  fontWeight: 600,
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Course
              </h3>
            </div>
            <div
              onClick={() => onClickType('guide')}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: typeValue.includes('guide') && '#ccc',
              }}
            >
              <div
                style={{
                  backgroundColor: '#DFDFDF',
                  borderRadius: 4,
                  marginRight: '1rem',
                  width: 48,
                  height: 48,
                }}
              ></div>
              <h3
                style={{
                  fontSize: '1.5rem',
                  color: '#596248',
                  fontWeight: 600,
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Guide
              </h3>
            </div>
            <div
              onClick={() => onClickType('epic')}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: typeValue.includes('epic') && '#ccc',
              }}
            >
              <div
                style={{
                  backgroundColor: '#DFDFDF',
                  borderRadius: 4,
                  marginRight: '1rem',
                  width: 48,
                  height: 48,
                }}
              ></div>
              <h3
                style={{
                  fontSize: '1.5rem',
                  color: '#596248',
                  fontWeight: 600,
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Epic
              </h3>
            </div>
            <div
              onClick={() => onClickType('access')}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: typeValue.includes('access') && '#ccc',
              }}
            >
              <div
                style={{
                  backgroundColor: '#DFDFDF',
                  borderRadius: 4,
                  marginRight: '1rem',
                  width: 48,
                  height: 48,
                }}
              ></div>
              <h3
                style={{
                  fontSize: '1.5rem',
                  color: '#596248',
                  fontWeight: 600,
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Access
              </h3>
            </div>
            {/* <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  backgroundColor: '#DFDFDF',
                  borderRadius: 4,
                  marginRight: '1rem',
                  width: 32,
                  height: 32,
                }}
              ></div>
              <h3
                style={{
                  fontSize: '1.5rem',
                  color: '#596248',
                  fontWeight: 600,
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                Equipment
              </h3>
            </div> */}
          </div>
        )}
      </SearchBarItem>
      <SearchBarItem style={{ display: 'flex', justifyContent: 'center' }}>
        <Button outline inline small>
          Search
        </Button>
      </SearchBarItem>
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled('div', {
  maxWidth: '52rem',
  width: '100%',
  padding: '0.5rem',
  backgroundColor: '#ffffff',
  border: '1px solid $gray4',
  margin: '0 auto',
  borderRadius: 4,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  boxShadow: `${(props: any) =>
    props.shadow && '0 4px 4px rgba(0,0,0,0.1), 0 -4px 4px rgba(0,0,0,0.1)'}`,
  '&:before': {
    outline: `${(props: any) => props.outline && '6px solid #ffffff'}`,
    borderRadius: 4,
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    mixBlendMode: 'soft-light',
    zIndex: 0,
    boxShadow: `${(props: any) =>
      props.shadow &&
      '0px 0px 20px rgba(0,0,0,0.7), 0px 2px 5px rgba(0,0,0,0.3)'}`,
  },
});

const SearchBarItem = styled('div', {
  cursor: 'pointer',
  padding: '0.5rem 1rem',
  position: 'relative',
  transition: 'background-color 150ms cubic-bezier(.79,.29,0,.97)',
  width: '100%',
  zIndex: 1,
  '&:last-of-type': {
    borderLeft: '1px solid rgba(0,0,0,0.2)',
    cursor: 'default',
  },
  '&:first-of-type': {
    '&:hover + div': {
      borderLeftColor: 'transparent',
    },
  },
  '&:nth-of-type(2),&:nth-of-type(3)': {
    borderRight: 0,
    borderLeft: '1px solid rgba(0,0,0,0.2)',
    '&:hover': {
      borderLeftColor: 'transparent',
      '& + div': {
        borderLeftColor: 'transparent',
      },
    },
  },
  '&:focus, &:not(:last-of-type):hover': {
    borderRadius: '0.25rem',
    backgroundColor: '#f4f9f3',
  },
  '&:focus ~ &, &:hover ~ &': {
    borderRightColor: 0,
  },
});

const SearchLabel = styled('h6', {
  color: '#A7AC9C',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '12px',
  fontWeight: 600,
  textTransform: 'uppercase',
  margin: 0,
});

const Input = styled('div', {
  color: '#596248',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: 'normal',
  marginTop: '0.25rem',
  textTransform: 'capitalize',
});

const ResultsBox = styled('div', {
  fontFamily: "'Outfit', sans-serif",
  position: 'absolute',
  left: '50%',
  top: '5rem',
  transform: 'translateX(-50%)',
  width: '42rem',
  borderRadius: '1rem',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2), 0 -2px 10px rgba(0, 0, 0, 0.2)',
  cursor: 'pointer',
  padding: '1rem',
  display: 'flex',
  gap: '1rem',
  color: '#596248',
});

const ResultListing = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem',
  '&:hover': {
    backgroundColor: '$gray36',
  },
  '& > h4': {
    fontSize: '1.25rem',
  },
});

export default SearchBar;
