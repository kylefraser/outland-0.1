import { Link, useLocation } from 'react-router-dom';
import {
  Container,
  Flex,
  Icon,
  Logo,
  SearchBar,
  Section,
  Text,
  ThemeToggle,
} from '..';
import { useOutsideClicker } from '../../helpers/helpers';
import { faChevronDown, faUser } from '@fortawesome/pro-solid-svg-icons';
import { styled } from '../../../stitches.config';
import { faCircleUser } from '@fortawesome/pro-solid-svg-icons';
import { useRef, useState } from 'react';

interface TopBarProps {
  setSearchedLocation?: React.Dispatch<React.SetStateAction<any | null>>;
  searchedLocation?: any;
  token?: string | number | null;
  innerRef?: any;
  style?: object;
  logout: any;
}

const TopBar = ({
  setSearchedLocation,
  searchedLocation,
  innerRef,
  token,
  logout,
  style,
  ...props
}: TopBarProps) => {
  const { pathname, search } = useLocation();
  const userAvatar = localStorage.getItem('outland-avatar');

  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => setDropdownVisible((visible) => !visible);
  const closeDropdown = () => setDropdownVisible(false);

  useOutsideClicker(wrapperRef, buttonRef, closeDropdown);

  return (
    <TopBarOuterContainer
      id="topbar"
      ref={innerRef}
      style={{ position: 'sticky', top: 0, zIndex: 10 }}
      size={'fullWidth'}
      noPadding
      {...props}
    >
      <Container size={pathname == '/map' ? 'fullWidth' : '4'}>
        <Section size="1">
          <Flex align={'center'}>
            <Link to="/home">
              <Logo
                size={'8'}
                style={{ paddingTop: '0.5rem', marginRight: '1rem' }}
              />
            </Link>
            <SearchBar
              setSearchedLocation={setSearchedLocation}
              searchedLocation={searchedLocation}
            />
            <Flex
              align={'center'}
              style={{ flexShrink: 0, marginLeft: '1rem' }}
            >
              <ThemeToggle />
              <Text
                as={Link}
                to="/addbusiness"
                style={{
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Start listing today
              </Text>
              {token ? (
                <Flex
                  align={'center'}
                  justify={'around'}
                  style={{
                    border: '1px solid #dfdfdf',
                    borderRadius: 9999,
                    boxShadow:
                      '0 0px 1px rgba(0,0,0,0.1), 0 0px 1px rgba(0,0,0,0.1)',
                    // width: '5rem',
                    height: '2.5rem',
                    cursor: 'pointer',
                    marginLeft: '2rem',
                    position: 'relative',
                    padding: '0 0.5rem',
                  }}
                  onClick={toggleDropdown}
                  ref={buttonRef}
                >
                  <Text
                    size="3"
                    style={{
                      marginRight: '1ch',
                      marginLeft: '1ch',
                      fontWeight: 600,
                    }}
                  >
                    <Icon color={'hiContrast'} icon={faChevronDown} />
                  </Text>
                  <div
                    style={{
                      backgroundImage: userAvatar
                        ? `url('https://cdn.gooutland.com/${userAvatar}`
                        : '',
                      backgroundSize: '100%',
                      borderRadius: '50%',
                      height: '2rem',
                      width: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {!userAvatar && (
                      <Icon color={'hiContrast'} size={2} icon={faCircleUser} />
                    )}
                  </div>
                  {dropdownVisible && (
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: 4,
                        boxShadow:
                          '0 3px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.2)',
                        position: 'absolute',
                        top: 'calc(100% + 0.25rem)',
                        width: '16rem',
                        padding: '1rem',
                        cursor: 'default',
                        right: 0,
                        color: '#283320',
                        fontFamily: "'Outfit', sans-serif",
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 20,
                      }}
                      ref={wrapperRef}
                    >
                      <Link
                        to="/user/outing"
                        style={{
                          cursor: 'pointer',
                          textDecoration: 'none',
                        }}
                      >
                        <Text
                          size={'4'}
                          color={'link'}
                          style={{
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                          }}
                        >
                          Outing
                        </Text>
                        <Text
                          size={'4'}
                          color={'link'}
                          style={{
                            fontWeight: 600,
                          }}
                        >
                          Inbox
                        </Text>
                      </Link>
                      {/* <Link
                        to="/user/profile"
                        style={{
                          cursor: 'pointer',
                          textDecoration: 'none',
                        }}
                      >
                        <Text
                          size={'4'}
                          color={'link'}
                          style={{
                            fontWeight: 600,
                          }}
                        >
                          Profile
                        </Text>
                      </Link> */}
                      <hr
                        style={{
                          borderBottom: '1px solid #dfdfdf',
                          borderTop: 0,
                          margin: '1rem 0',
                        }}
                      />
                      <Link
                        to="/addbusiness"
                        style={{
                          cursor: 'pointer',
                          textDecoration: 'none',
                        }}
                      >
                        <Text
                          size={'4'}
                          color={'link'}
                          style={{
                            fontWeight: 600,
                          }}
                        >
                          Add business
                        </Text>
                      </Link>
                      <hr
                        style={{
                          borderBottom: '1px solid #dfdfdf',
                          borderTop: 0,
                          margin: '1rem 0',
                        }}
                      />
                      <Link
                        to="/user/profile"
                        style={{
                          cursor: 'pointer',
                          textDecoration: 'none',
                        }}
                      >
                        <Text
                          size={'4'}
                          color={'link'}
                          style={{
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                          }}
                        >
                          Profile
                        </Text>
                      </Link>
                      <a
                        style={{
                          cursor: 'pointer',
                          textDecoration: 'none',
                        }}
                        onClick={logout}
                      >
                        <Text
                          size={'4'}
                          color={'link'}
                          style={{
                            fontWeight: 600,
                          }}
                        >
                          Logout
                        </Text>
                      </a>
                    </div>
                  )}
                </Flex>
              ) : (
                <Link
                  to="/login"
                  style={{
                    marginLeft: '2rem',
                    textDecoration: 'none',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    padding: '0.5rem 1rem',
                    border: '1px solid #9bb579',
                    borderRadius: '9999px',
                  }}
                >
                  Login
                </Link>
              )}
            </Flex>
          </Flex>
        </Section>
      </Container>
    </TopBarOuterContainer>
  );
};

const TopBarOuterContainer = styled(Container, {
  backgroundColor: '$olive1',
});

export default TopBar;
