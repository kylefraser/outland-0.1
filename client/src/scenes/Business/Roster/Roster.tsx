import { Button, Text } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/pro-solid-svg-icons';

const BusinessRoster = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <Text
          as={'h2'}
          size={'8'}
          style={{
            fontWeight: 700,
          }}
        >
          Roster
        </Text>
        <Button variant="action" outline small>
          <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '1ch' }} />
          Add member
        </Button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #dedede',
            borderRadius: '6px',
            padding: '1.5rem',
            flex: '0 0 calc(50% - 1rem)',
          }}
        >
          <div
            style={{
              backgroundColor: '#dedede',
              borderRadius: '50%',
              height: '4rem',
              width: '4rem',
              marginRight: '1rem',
            }}
          ></div>
          <div>
            <Text
              as={'h4'}
              size={'6'}
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
            alignItems: 'center',
            border: '1px solid #dedede',
            borderRadius: '6px',
            padding: '1.5rem',
            flex: '0 0 calc(50% - 1rem)',
          }}
        >
          <div
            style={{
              backgroundColor: '#dedede',
              borderRadius: '50%',
              height: '4rem',
              width: '4rem',
              marginRight: '1rem',
            }}
          ></div>
          <div>
            <Text
              as={'h4'}
              size={'6'}
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
            alignItems: 'center',
            border: '1px solid #dedede',
            borderRadius: '6px',
            padding: '1.5rem',
            flex: '0 0 calc(50% - 1rem)',
          }}
        >
          <div
            style={{
              backgroundColor: '#dedede',
              borderRadius: '50%',
              height: '4rem',
              width: '4rem',
              marginRight: '1rem',
            }}
          ></div>
          <div>
            <Text
              as={'h4'}
              size={'6'}
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
            alignItems: 'center',
            border: '1px solid #dedede',
            borderRadius: '6px',
            padding: '1.5rem',
            flex: '0 0 calc(50% - 1rem)',
          }}
        >
          <div
            style={{
              backgroundColor: '#dedede',
              borderRadius: '50%',
              height: '4rem',
              width: '4rem',
              marginRight: '1rem',
            }}
          ></div>
          <div>
            <Text
              as={'h4'}
              size={'6'}
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
    </>
  );
};

export default BusinessRoster;
