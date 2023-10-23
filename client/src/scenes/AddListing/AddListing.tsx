import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  ALL_LISTINGS,
  CREATE_LISTING,
  ALL_LISTINGS_BY_USER,
} from '../../queries';
import {
  Button,
  Container,
  Flex,
  Input,
  Section,
  Text,
  TextArea,
  TypeBlock,
  Upload,
} from '../../components';
import { styled } from '../../../stitches.config';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LISTING_TYPES, SKILL_LEVELS } from '../../utils/constants';

interface AddListingProps {
  setError: any;
  searchedLocation: any;
  setSearchedLocation: React.Dispatch<React.SetStateAction<any | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | number | null>>;
  token?: string | number | null;
}

const AddListing = ({ setError, token }: AddListingProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [instructor, setInstructor] = useState('');
  const [maxCount, setMaxCount] = useState('');
  const [minCount, setMinCount] = useState('');
  const [equipment, setEquipment] = useState('');
  const [requirements, setRequirements] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [duration, setDuration] = useState('');
  const [courseType, setCourseType] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [rating, setRating] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [listingPhoto, setListingPhoto] = useState<any>();
  const [filePath, setFilePath] = useState<any>();
  const [imageId, setImageId] = useState<any>();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const [createListing] = useMutation(CREATE_LISTING, {
    refetchQueries: [{ query: ALL_LISTINGS_BY_USER }],
    onError: (error) => {
      setError(error);
    },
    onCompleted: () => {
      navigate('/business/listings', {
        state: { alert: 'Your listing has been created' },
      });
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_LISTINGS_BY_USER });
      store.writeQuery({
        query: ALL_LISTINGS_BY_USER,
        data: {
          ...(dataInStore as any),
          allListingsByUser: [
            ...(dataInStore as any).allListingsByUser,
            response.data.addListing,
          ],
        },
      });
    },
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (filePath) {
      fetch(filePath, {
        body: listingPhoto,
        mode: 'cors',
        method: 'PUT',
        headers: {
          'x-amz-acl': 'public-read',
        },
      });
    }

    createListing({
      variables: {
        name: name,
        description: description,
        address: address,
        city: city,
        state: state,
        instructor: instructor,
        maxCount: maxCount,
        minCount: minCount,
        equipment: equipment,
        requirements: requirements,
        restrictions: restrictions,
        duration: duration,
        courseType: courseType,
        skillLevel: skillLevel,
        rating: rating,
        price: price,
        type: type,
        date: date,
        time: time,
        listingPhoto: imageId && 'https://cdn.gooutland.com/' + imageId,
      },
    });

    setName('');
    setDescription('');
    setAddress('');
    setCity('');
    setState('');
    setInstructor('');
    setMaxCount('');
    setMinCount('');
    setEquipment('');
    setRequirements('');
    setRestrictions('');
    setDuration('');
    setCourseType('');
    setSkillLevel('');
    setRating('');
    setPrice('');
    setType('');
    setDate('');
    setTime('');
  };

  if (!token) {
    return (
      <Navigate
        replace
        to="/login"
        state={{ alert: 'Login or Register to add a listing' }}
      />
    );
  }

  return (
    <Container>
      <Section size={3}>
        <Text
          as={'h2'}
          size={'9'}
          style={{
            fontWeight: 700,
            marginBottom: '4rem',
          }}
        >
          Add new listing
        </Text>
        <form onSubmit={submit}>
          <div style={{ display: 'flex', marginBottom: '4rem' }}>
            <div
              style={{
                flex: '0 0 calc(30% - 4rem)',
                marginRight: '3rem',
                padding: '1rem 3rem 1rem 0',
                borderRight: '1px solid #DFDFDF',
              }}
            >
              <Label as={'h6'} size={'6'}>
                Type of listing
              </Label>
              <Description as={'p'} size={'4'}>
                What type of listing would you like to create
              </Description>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '2.5rem',
                width: '100%',
                padding: '1rem 0',
              }}
            >
              {LISTING_TYPES.map((listing_type) => (
                <TypeBlock
                  align={'center'}
                  justify={'center'}
                  active={type == listing_type}
                  onClick={() => setType(listing_type)}
                >
                  {listing_type}
                </TypeBlock>
              ))}
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
              <Label as={'h6'} size={'6'}>
                About the listing
              </Label>
              <Description as={'p'} size={'4'}>
                When filling out the description, try to add as many details as
                possible and include things such as...
              </Description>
            </div>
            <div
              style={{
                padding: '1rem 0',
                width: '100%',
              }}
            >
              <div
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
                  placeholder={name ? name : 'Musket 101'}
                  onChange={(event: React.ChangeEvent) =>
                    setName((event.target as HTMLInputElement).value)
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
                    name="course_type"
                    label="Course Type"
                    placeholder={courseType ? courseType : 'Firearms'}
                    onChange={(event: React.ChangeEvent) =>
                      setCourseType((event.target as HTMLInputElement).value)
                    }
                  />
                  {/* <Input
                label="Course Sub-Type"
                placeholder={minCount ? minCount : 'Carbine'}
                onChange={(event: React.ChangeEvent) =>
                  setMinCount((event.target as HTMLInputElement).value)
                }
              /> */}
                </div>
                <TextArea
                  name="description"
                  label="Description"
                  placeholder={
                    description
                      ? description
                      : 'If freedom of speech is taken away, then dumb and silent we may be led, like sheep to the slaughter.'
                  }
                  onChange={(event: React.ChangeEvent) =>
                    setDescription((event.target as HTMLInputElement).value)
                  }
                />
                <Input
                  name="address"
                  label="Address"
                  placeholder={
                    address
                      ? address
                      : '1776 Freedom Way, Mount Vernon, Virginia'
                  }
                  onChange={(event: React.ChangeEvent) =>
                    setAddress((event.target as HTMLInputElement).value)
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
                    placeholder={city ? city : 'Mount Vernon'}
                    onChange={(event: React.ChangeEvent) =>
                      setCity((event.target as HTMLInputElement).value)
                    }
                  />
                  <Input
                    name="state"
                    label="State"
                    placeholder={state ? state : 'Virginia'}
                    onChange={(event: React.ChangeEvent) =>
                      setState((event.target as HTMLInputElement).value)
                    }
                  />
                </div>
              </div>
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
              <Label as={'h6'} size={'6'}>
                Photo
              </Label>
              <Description as={'p'} size={'4'}>
                Upload a photo for your listing
              </Description>
            </div>
            <div style={{ padding: '1rem 0', width: '100%' }}>
              <div
                onSubmit={submit}
                style={{
                  width: '100%',
                }}
              >
                <Upload
                  name="cover_photo"
                  style={{ gridArea: 'photo', height: '18.75rem' }}
                  register={register}
                  setCoverPhoto={setListingPhoto}
                  setFilePath={setFilePath}
                  setImageId={setImageId}
                ></Upload>
              </div>
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
              <Label as={'h6'} size={'6'}>
                Schedule
              </Label>
              <Description as={'p'} size={'4'}>
                Choose when the listing begins and when the listing expires
              </Description>
            </div>
            <div
              style={{
                padding: '1rem 0',
                width: '100%',
              }}
            >
              <div
                onSubmit={submit}
                style={{
                  display: 'grid',
                  gap: '2.5rem',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2.5rem',
                  }}
                >
                  <Input
                    name="date"
                    label="Date"
                    placeholder={date ? date : 'July 4th'}
                    onChange={(event: React.ChangeEvent) =>
                      setDate((event.target as HTMLInputElement).value)
                    }
                    type="date"
                  />
                  <Input
                    name="time"
                    label="Time"
                    placeholder={time ? time : '4:20pm'}
                    onChange={(event: React.ChangeEvent) =>
                      setTime((event.target as HTMLInputElement).value)
                    }
                    type="time"
                  />
                </div>
              </div>
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
              <Label as={'h6'} size={'6'}>
                Price
              </Label>
              <Description as={'p'} size={'4'}>
                How much does the listing cost
              </Description>
            </div>
            <div
              style={{
                padding: '1rem 0',
                width: '100%',
              }}
            >
              <div
                onSubmit={submit}
                style={{
                  display: 'grid',
                  gap: '2.5rem',
                  width: '100%',
                }}
              >
                <Input
                  name="price"
                  placeholder={price ? price : '$250'}
                  onChange={(event: React.ChangeEvent) =>
                    setPrice((event.target as HTMLInputElement).value)
                  }
                />
              </div>
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
              <Label as={'h6'} size={'6'}>
                Instructors
              </Label>
              <Description as={'p'} size={'4'}>
                Choose the instructors who are going to lead the course
              </Description>
            </div>
            <div
              style={{
                padding: '1rem 0',
                width: '100%',
              }}
            >
              <div
                onSubmit={submit}
                style={{
                  display: 'grid',
                  gap: '2.5rem',
                  width: '100%',
                }}
              >
                <Input
                  name="instructor"
                  placeholder={instructor ? instructor : 'George Washington'}
                  onChange={(event: React.ChangeEvent) =>
                    setInstructor((event.target as HTMLInputElement).value)
                  }
                />
              </div>
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
              <Label as={'h6'} size={'6'}>
                Skill Level
              </Label>
              <Description as={'p'} size={'4'}>
                Who is this listing intended for?
              </Description>
            </div>
            <div
              style={{
                padding: '1rem 0',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '2.5rem',
                  width: '100%',
                }}
              >
                {SKILL_LEVELS.map((level) => (
                  <TypeBlock
                    align={'center'}
                    justify={'center'}
                    active={skillLevel == level}
                    onClick={() => setSkillLevel(level)}
                  >
                    {level}
                  </TypeBlock>
                ))}
              </div>
              {/* <Input
                label="Skill Level"
                placeholder={skillLevel ? skillLevel : 'Patriot'}
                onChange={(event: React.ChangeEvent) =>
                  setSkillLevel((event.target as HTMLInputElement).value)
                }
              /> */}
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
              <Label as={'h6'} size={'6'}>
                Attendance
              </Label>
              <Description as={'p'} size={'4'}>
                How many people can attend the course and what is the minimum
                required to begin
              </Description>
            </div>
            <div style={{ padding: '1rem 0', width: '100%' }}>
              <div
                onSubmit={submit}
                style={{
                  display: 'grid',
                  gap: '2.5rem',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2.5rem',
                  }}
                >
                  <Input
                    name="available"
                    label="Available Slots"
                    placeholder={maxCount ? maxCount : '24'}
                    onChange={(event: React.ChangeEvent) =>
                      setMaxCount((event.target as HTMLInputElement).value)
                    }
                    type="number"
                  />
                  <Input
                    name="minimum"
                    label="Minimum required"
                    placeholder={minCount ? minCount : '2'}
                    onChange={(event: React.ChangeEvent) =>
                      setMinCount((event.target as HTMLInputElement).value)
                    }
                    type="number"
                  />
                </div>
              </div>
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
              <Label as={'h6'} size={'6'}>
                Equipment
              </Label>
              <Description as={'p'} size={'4'}>
                What equipment should a student have when attending the course
              </Description>
            </div>
            <div style={{ padding: '1rem 0', width: '100%' }}>
              <div
                onSubmit={submit}
                style={{
                  display: 'grid',
                  gap: '2.5rem',
                  width: '100%',
                }}
              >
                <TextArea
                  name="equipment"
                  placeholder={equipment ? equipment : 'Kentucky Longrifle'}
                  onChange={(event: React.ChangeEvent) =>
                    setEquipment((event.target as HTMLInputElement).value)
                  }
                />
              </div>
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
              <Label as={'h6'} size={'6'}>
                Requirements
              </Label>
              <Description as={'p'} size={'4'}>
                What is required to register for this listing
              </Description>
            </div>
            <div style={{ padding: '1rem 0', width: '100%' }}>
              <div
                onSubmit={submit}
                style={{
                  display: 'grid',
                  gap: '2.5rem',
                  width: '100%',
                }}
              >
                <TextArea
                  name="requirements"
                  placeholder={requirements ? requirements : '18 years old'}
                  onChange={(event: React.ChangeEvent) =>
                    setRequirements((event.target as HTMLInputElement).value)
                  }
                />
              </div>
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
              <Label as={'h6'} size={'6'}>
                Restrictions
              </Label>
              <Description as={'p'} size={'4'}>
                Are there any restrictions to register for this listing
              </Description>
            </div>
            <div style={{ padding: '1rem 0', width: '100%' }}>
              <div
                onSubmit={submit}
                style={{
                  display: 'grid',
                  gap: '2.5rem',
                  width: '100%',
                }}
              >
                <TextArea
                  name="restrictions"
                  placeholder={restrictions ? restrictions : '18 years old'}
                  onChange={(event: React.ChangeEvent) =>
                    setRestrictions((event.target as HTMLInputElement).value)
                  }
                />
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Button variant="secondary" outline style={{ marginRight: '2rem' }}>
              Clear
            </Button>
            <Button variant="primary" outline type="submit">
              Add Listing
            </Button>
          </div>
        </form>
      </Section>
    </Container>
  );
};

const Label = styled(Text, {
  fontWeight: 700,
  marginBottom: '0.125rem',
});

const Description = styled(Text, {
  fontWeight: 500,
  lineHeight: 1.3,
  marginBottom: '1.5rem',
});

export default AddListing;
