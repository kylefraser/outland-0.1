import { styled } from '../../../stitches.config';
import {
  Button,
  Checkbox,
  Container,
  Input,
  Logo,
  Section,
  Text,
  TextArea,
  Upload,
} from '../../components';
import { Link, Navigate } from 'react-router-dom';
import Noise from '../../assets/images/black-noise.webp';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { CREATE_BUSINESS } from '../../queries';

interface AddBusinessProps {
  setError?: any;
  setToken?: React.Dispatch<React.SetStateAction<string | number | null>>;
  token: string | number | null;
}

const AddBusiness = ({ token, setError, setToken }: AddBusinessProps) => {
  const [createBusiness] = useMutation(CREATE_BUSINESS, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });
  const [coverPhoto, setCoverPhoto] = useState<any>();
  const [filePath, setFilePath] = useState<any>();
  const [imageId, setImageId] = useState<any>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data: any) => {
    if (filePath) {
      fetch(filePath, {
        body: coverPhoto,
        mode: 'cors',
        method: 'PUT',
        headers: {
          'x-amz-acl': 'public-read',
        },
      });
    }

    createBusiness({
      variables: {
        business_name: data['business_name'],
        email: data['email'],
        cover_photo: imageId && 'https://cdn.gooutland.com/' + imageId,
      },
    });
  };

  if (!token) {
    return (
      <Navigate
        replace
        to="/login"
        state={{ alert: 'Login or Register to add your business' }}
      />
    );
  }

  return (
    <>
      <Container>
        <Section size={'3'} style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div
            style={{
              height: '100%',
              background:
                'linear-gradient(95.7deg, #859D65 19.28%, #A6CF70 82.74%)',
              padding: '4rem 5rem',
              borderRadius: 8,
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              position: 'relative',
              margin: '0 auto 6rem',
            }}
          >
            <div
              style={{
                content: '""',
                position: 'absolute',
                backgroundImage: `url('${Noise}')`,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.05,
                zIndex: 0,
              }}
            ></div>
            <h5
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '3.25rem',
                fontWeight: 800,
                lineHeight: 1.4,
                marginBottom: '2rem',
                zIndex: 1,
              }}
            >
              List your business on{' '}
              <Logo fontSize={'3.25rem'} color={'white'} />
            </h5>
            <Text
              as={'p'}
              size={'5'}
              color={'white'}
              style={{
                fontWeight: 500,
                lineHeight: 1.3,
                marginBottom: '2rem',
                zIndex: 1,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse venenatis id lorem non vehicula. Pellentesque sed
              metus non magna ullamcorper facilisis. Pellentesque convallis
              bibendum augue sed finibus.
            </Text>
            <Text
              as={'p'}
              size={'5'}
              color={'white'}
              style={{
                fontWeight: 500,
                lineHeight: 1.3,
                marginBottom: '2rem',
                zIndex: 1,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse venenatis id lorem non vehicula. Pellentesque sed
              metus non magna ullamcorper facilisis. Pellentesque convallis
              bibendum augue sed finibus.
            </Text>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InnerContainer>
              <Input
                style={{ gridArea: 'business' }}
                name="business_name"
                label="Business Name"
                placeholder="Philadelphia Press"
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.name, e.target.value)
                }
                register={register}
                required
              />
              <Input
                style={{ gridArea: 'email' }}
                name="email"
                label="Email Address"
                placeholder="Ben@Franklin.com"
                register={register}
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.name, e.target.value)
                }
                required
              />
              <Input
                style={{ gridArea: 'first' }}
                name="first_name"
                label="First Name"
                placeholder="Benjamin"
                register={register}
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.name, e.target.value)
                }
              />
              <Input
                style={{ gridArea: 'last' }}
                name="last_name"
                label="Last Name"
                placeholder="Franklin"
                register={register}
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.name, e.target.value)
                }
              />

              <Input
                style={{ gridArea: 'address' }}
                name="address"
                label="Address"
                placeholder="1776 Main Street"
                register={register}
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.name, e.target.value)
                }
              />
              <Input
                name="city"
                label="City"
                placeholder="Philadelphia"
                register={register}
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.name, e.target.value)
                }
              />
              <Input
                name="state"
                label="State"
                placeholder="Pennsylvania"
                register={register}
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.name, e.target.value)
                }
              />
              <Input
                name="zipcode"
                label="Zipcode"
                placeholder="01776"
                register={register}
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.name, e.target.value)
                }
              />
              <Input
                name="phone"
                label="Phone"
                placeholder="555-555-5555"
                register={register}
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.name, e.target.value)
                }
              />
              <Upload
                name="cover_photo"
                label="Cover photo"
                style={{ gridArea: 'photo', marginBottom: '1.5rem' }}
                register={register}
                setCoverPhoto={setCoverPhoto}
                setFilePath={setFilePath}
                setImageId={setImageId}
              ></Upload>
              <TextArea
                name="description"
                style={{ gridArea: 'description' }}
                label="Description"
                placeholder="About the business..."
                textAreaStyles={{ height: 'calc(100% - 1.5rem)' }}
                register={register}
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.name, e.target.value)
                }
              />
            </InnerContainer>
            <Checkbox
              style={{ marginTop: '4rem', maxWidth: '65%' }}
              label="Acknowledgement"
            >
              <Text
                as={'p'}
                style={{
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse venenatis id lorem non vehicula. Pellentesque sed
                metus non magna ullamcorper facilisis. Pellentesque convallis
                bibendum augue sed finibus.
              </Text>
            </Checkbox>
            <div style={{ display: 'flex', marginTop: '4rem' }}>
              <Button
                variant="secondary"
                outline
                style={{ marginRight: '2rem' }}
              >
                Clear
              </Button>
              <Button outline>Submit</Button>
            </div>
          </form>
        </Section>
      </Container>
    </>
  );
};

const InnerContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridTemplateAreas: `'business business photo photo'
                     'email email photo photo'
                     'first last photo photo'
                     'address address description description'
                     '. . description description'
                     '. . description description'`,
  gap: '2rem',
});

export default AddBusiness;
