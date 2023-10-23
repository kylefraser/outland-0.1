import { useState } from 'react';
import { Input, Text, TextArea } from '../../../components';

interface BusinessSettingsProps {}

const BusinessSettings = () => {
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessCity, setBusinessCity] = useState('');
  const [businessState, setBusinessState] = useState('');
  const [description, setDescription] = useState('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <Text
        as={'h2'}
        size={'8'}
        style={{
          fontWeight: 700,
          marginBottom: '2rem',
        }}
      >
        Settings
      </Text>
      <div style={{ display: 'flex', marginBottom: '4rem' }}>
        <div
          style={{
            flex: '0 0 calc(30% - 4rem)',
            marginRight: '3rem',
            padding: '1rem 3rem 1rem 0',
            borderRight: '1px solid #DFDFDF',
          }}
        >
          <Text
            as={'h6'}
            size={'6'}
            style={{
              fontWeight: 700,
              marginBottom: '0.125rem',
            }}
          >
            Business Profile
          </Text>
          <Text
            as={'p'}
            style={{
              fontWeight: 500,
              lineHeight: 1.3,
              marginBottom: '1.5rem',
            }}
          >
            Information about your Business
          </Text>
        </div>
        <div
          style={{
            padding: '1rem 0',
            width: '100%',
          }}
        >
          <form
            onSubmit={submit}
            style={{
              display: 'grid',
              gap: '2.5rem',
              width: '100%',
            }}
          >
            <Input
              name="name"
              label="Name"
              placeholder={businessName ? businessName : "Roger' Rangers"}
              onChange={(event: React.ChangeEvent) =>
                setBusinessName((event.target as HTMLInputElement).value)
              }
            />

            <Input
              name="address"
              label="Address"
              placeholder={businessAddress ? businessAddress : "Roger' Rangers"}
              onChange={(event: React.ChangeEvent) =>
                setBusinessAddress((event.target as HTMLInputElement).value)
              }
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2.5rem',
              }}
            >
              <Input
                name="city"
                label="City"
                placeholder={businessCity ? businessCity : 'Carbine'}
                onChange={(event: React.ChangeEvent) =>
                  setBusinessCity((event.target as HTMLInputElement).value)
                }
              />
              <Input
                name="state"
                label="State"
                placeholder={businessState ? businessState : 'Carbine'}
                onChange={(event: React.ChangeEvent) =>
                  setBusinessState((event.target as HTMLInputElement).value)
                }
              />
            </div>
            <TextArea
              name="about"
              label="About"
              placeholder={
                description
                  ? description
                  : 'If freedom of speech is taken away, then dumb and silent we may be led, like sheep to the slaughter.'
              }
              onChange={(event: React.ChangeEvent) =>
                setDescription((event.target as HTMLInputElement).value)
              }
            />
          </form>
        </div>
      </div>
      <div style={{ display: 'flex', marginBottom: '4rem' }}>
        <div
          style={{
            flex: '0 0 calc(30% - 4rem)',
            marginRight: '3rem',
            padding: '1rem 3rem 1rem 0',
            borderRight: '1px solid #DFDFDF',
          }}
        >
          <Text
            as={'h6'}
            size={'6'}
            style={{
              fontWeight: 700,
              marginBottom: '0.125rem',
            }}
          >
            Cover photo
          </Text>
          <Text
            as={'p'}
            style={{
              fontWeight: 500,
              lineHeight: 1.3,
              marginBottom: '1.5rem',
            }}
          >
            Upload a cover photo to be shown on your page
          </Text>
        </div>
        <div
          style={{
            padding: '1rem 0',
            width: '100%',
          }}
        >
          <form
            onSubmit={submit}
            style={{
              display: 'grid',
              gap: '2.5rem',
              width: '100%',
            }}
          >
            <TextArea
              name="description"
              placeholder={
                description
                  ? description
                  : 'If freedom of speech is taken away, then dumb and silent we may be led, like sheep to the slaughter.'
              }
              onChange={(event: React.ChangeEvent) =>
                setDescription((event.target as HTMLInputElement).value)
              }
            />
          </form>
        </div>
      </div>
      <div style={{ display: 'flex', marginBottom: '4rem' }}>
        <div
          style={{
            flex: '0 0 calc(30% - 4rem)',
            marginRight: '3rem',
            padding: '1rem 3rem 1rem 0',
            borderRight: '1px solid #DFDFDF',
          }}
        >
          <Text
            as={'h6'}
            size={'6'}
            style={{
              fontWeight: 700,
              marginBottom: '0.125rem',
            }}
          >
            Business
          </Text>
          <Text
            as={'p'}
            style={{
              fontWeight: 500,
              lineHeight: 1.3,
              marginBottom: '1.5rem',
            }}
          >
            Settings for business account
          </Text>
        </div>
        <div
          style={{
            padding: '1rem 0',
            width: '100%',
          }}
        >
          <div
            style={{
              border: '1px solid #c5cbba',
              display: 'inline-block',
              borderRadius: '50px',
              padding: '1.5rem 3rem',
              backgroundColor: '#fafafa',
              position: 'relative',
            }}
          >
            <div
              style={{
                borderRadius: '50%',
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: '#9bb579',
                position: 'absolute',
                right: '0.25rem',
                top: '0.25rem',
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessSettings;
