import { DateTime } from 'luxon';
import { Flex, ListingCarousel, Text, Weather } from '../../../components';
import Cooking from '../../../assets/images/cooking.webp';
import { Link } from 'react-router-dom';

const BusinessOverview = () => {
  return (
    <div>
      <Text
        as={'h2'}
        size={'8'}
        style={{
          fontWeight: 700,
          lineHeight: 1.4,
        }}
      >
        Today
      </Text>
      <Text
        as={'h2'}
        size={'7'}
        style={{
          fontWeight: 600,
        }}
      >
        {DateTime.now().toLocaleString(DateTime.DATE_HUGE)}
      </Text>
      <div style={{ margin: '4rem 0' }}>
        <Text>Weather</Text>
        <Weather />
      </div>
      <Text
        as={'h2'}
        size={'8'}
        style={{
          fontWeight: 700,
          lineHeight: 1.4,
        }}
      >
        Scheduled listings
      </Text>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            venenatis id lorem non vehicula.
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
                  left: '-2.75rem',
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
                  left: '-5.5rem',
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
                  left: '-8.25rem',
                  zIndex: 1,
                }}
              ></div>
            </div>
            <Link
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            venenatis id lorem non vehicula.
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
                  left: '-2.75rem',
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
                  left: '-5.5rem',
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
                  left: '-8.25rem',
                  zIndex: 1,
                }}
              ></div>
            </div>
            <Link
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            venenatis id lorem non vehicula.
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
                  left: '-2.75rem',
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
                  left: '-5.5rem',
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
                  left: '-8.25rem',
                  zIndex: 1,
                }}
              ></div>
            </div>
            <Link
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            venenatis id lorem non vehicula.
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
                  left: '-2.75rem',
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
                  left: '-5.5rem',
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
                  left: '-8.25rem',
                  zIndex: 1,
                }}
              ></div>
            </div>
            <Link
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
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
      <div style={{ margin: '4rem 0' }}>
        <Text>This month stats</Text>
      </div>
      <div style={{ margin: '4rem 0' }}>
        <Text>Attendance chart</Text>
      </div>
    </div>
  );
};

export default BusinessOverview;
