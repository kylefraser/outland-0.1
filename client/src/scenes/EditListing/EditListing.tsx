import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_LISTING } from '../../queries';
import {
  Button,
  Input,
  Switch,
  Text,
  TextArea,
  Toast,
  TypeBlock,
  Upload,
} from '../../components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { LISTING_TYPES, SKILL_LEVELS } from '../../utils/constants';

type Listing = {
  id: number | string | null;
  name: string | null;
  description: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  instructors: string | null;
  maxCount: string | null;
  minCount: string | null;
  equipment: string | null;
  requirements: string | null;
  restrictions: string | null;
  duration: string | null;
  courseType: string | null;
  skillLevel: string | null;
  rating: string | null;
  price: string | null;
  type: string | null;
  date: string | null;
  time: string | null;
};

interface EditListingProps {
  setError?: any;
  token?: any;
}

const EditListing = (
  listing: Listing | any,
  { setError, token }: EditListingProps
) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [instructors, setInstructors] = useState('');
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
  const [edit, setEdit] = useState(false);
  const [listingPhoto, setListingPhoto] = useState<any>();
  const [filePath, setFilePath] = useState<any>();
  const [imageId, setImageId] = useState<any>();
  const [visible, setVisible] = useState(false);

  let navigate = useNavigate();

  console.log(listing);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const [changeListing, result] = useMutation(EDIT_LISTING, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: () => {
      setVisible(true);
    },
  });

  // const userListingMatch = queryString.parse(location.search).location;

  // useEffect(() => {
  //   findListingById({
  //     variables: { searchIdValue: userListingMatch },
  //   });
  // }, []);

  useEffect(() => {
    if (listing.listing) {
      setId(listing.listing.id);
      setName(listing.listing.name);
      setDescription(listing.listing.description);
      setAddress(listing.listing.address);
      setCity(listing.listing.city);
      setState(listing.listing.state);
      setInstructors(listing.listing.instructor);
      setMaxCount(listing.listing.maxCount);
      setMinCount(listing.listing.minCount);
      setEquipment(listing.listing.equipment);
      setRequirements(listing.listing.requirements);
      setRestrictions(listing.listing.restrictions);
      setDuration(listing.listing.duration);
      setCourseType(listing.listing.type);
      setSkillLevel(listing.listing.skillLevel);
      setRating(listing.listing.rating);
      setPrice(listing.listing.price);
      setType(listing.listing.type);
      setDate(listing.listing.date);
      setTime(listing.listing.time);
      setListingPhoto(listing.listing.listingPhoto);
    }
  }, [listing]);

  useEffect(() => {
    if (result.data && result.data.editListing === null) {
      setError('listing not found');
    }
  }, [result.data]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    changeListing({
      variables: {
        id,
        name,
        description,
        address,
        city,
        state,
        instructors,
        maxCount,
        minCount,
        equipment,
        requirements,
        restrictions,
        duration,
        courseType,
        skillLevel,
        rating,
        price,
        type,
        date,
        time,
        listingPhoto,
      },
    });

    console.log(
      id,
      name,
      description,
      address,
      city,
      state,
      instructors,
      maxCount,
      minCount,
      equipment,
      requirements,
      restrictions,
      duration,
      courseType,
      skillLevel,
      rating,
      price,
      type,
      date,
      time,
      listingPhoto
    );

    setEdit(false);
  };

  const onEditChange = (checked: any) => {
    setEdit(checked);
  };

  return (
    <>
      {visible && <Toast type={'success'}>Your listing has been updated</Toast>}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Text
          as={'h2'}
          size={'8'}
          style={{
            fontWeight: 700,
            marginBottom: '4rem',
          }}
        >
          Edit listing
        </Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Text as={'label'} htmlFor="edit">
            {!edit ? 'Locked' : 'Unlocked'}
          </Text>
          <Switch id="edit" checked={edit} onChange={onEditChange} />
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
            Type of listing
          </Text>
          <Text
            as={'p'}
            style={{
              fontWeight: 500,
              lineHeight: 1.3,
              marginBottom: '1.5rem',
            }}
          >
            What type of listing would you like to create?
          </Text>
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
          {LISTING_TYPES.map((listing_type, i) => (
            <TypeBlock
              key={'listing_types_' + i}
              align={'center'}
              justify={'center'}
              active={type == listing_type}
              onClick={() => setType(listing_type)}
            >
              {listing_type}
            </TypeBlock>
          ))}
          {/* <TypeBlock onClick={() => setType('equipment')}>Equipment</TypeBlock> */}
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
            About the listing
          </Text>
          <Text
            as={'p'}
            style={{
              fontWeight: 500,
              lineHeight: 1.3,
              marginBottom: '1.5rem',
            }}
          >
            When filling out the description, try and be as descriptive as
            possible and include things such as...
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
              inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
              placeholder={name ? name : 'Musket 101'}
              onChange={(event: React.ChangeEvent) =>
                setName((event.target as HTMLInputElement).value)
              }
              value={name}
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
                inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
                placeholder={courseType ? courseType : 'Firearms'}
                onChange={(event: React.ChangeEvent) =>
                  setCourseType((event.target as HTMLInputElement).value)
                }
                value={courseType}
              />
              <Input
                name="course_sub_type"
                label="Course Sub-Type"
                inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
                placeholder={minCount ? minCount : 'Carbine'}
                onChange={(event: React.ChangeEvent) =>
                  setMinCount((event.target as HTMLInputElement).value)
                }
                value={minCount}
              />
            </div>
            <TextArea
              name="description"
              label="Description"
              placeholder={
                description
                  ? description
                  : 'If freedom of speech is taken away, then dumb and silent we may be led, like sheep to the slaughter.'
              }
              textAreaStyles={{ pointerEvents: edit ? 'all' : 'none' }}
              onChange={(event: React.ChangeEvent) =>
                setDescription((event.target as HTMLInputElement).value)
              }
              value={description}
            />
            <Input
              name="address"
              label="Address"
              inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
              placeholder={
                address ? address : '1776 Freedom Way, Mount Vernon, Virginia'
              }
              onChange={(event: React.ChangeEvent) =>
                setAddress((event.target as HTMLInputElement).value)
              }
              value={address}
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
                inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
                placeholder={city ? city : 'Mount Vernon'}
                onChange={(event: React.ChangeEvent) =>
                  setCity((event.target as HTMLInputElement).value)
                }
                value={city}
              />
              <Input
                name="state"
                label="State"
                inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
                placeholder={state ? state : 'Virginia'}
                onChange={(event: React.ChangeEvent) =>
                  setState((event.target as HTMLInputElement).value)
                }
                value={state}
              />
            </div>
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
            Photo
          </Text>
          <Text
            as={'p'}
            style={{
              fontWeight: 500,
              lineHeight: 1.3,
              marginBottom: '1.5rem',
            }}
          >
            Upload a photo for your listing
          </Text>
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
              currentPhoto={listingPhoto}
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
          <Text
            as={'h6'}
            size={'6'}
            style={{
              fontWeight: 700,
              marginBottom: '0.125rem',
            }}
          >
            Schedule
          </Text>
          <Text
            as={'p'}
            style={{
              fontWeight: 500,
              lineHeight: 1.3,
              marginBottom: '1.5rem',
            }}
          >
            Choose when the listing begins and when the listing expires.
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
                inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
                placeholder={date ? date : 'July 4th'}
                onChange={(event: React.ChangeEvent) =>
                  setDate((event.target as HTMLInputElement).value)
                }
                type="date"
                value={date}
              />
              <Input
                name="time"
                label="Time"
                inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
                placeholder={time ? time : '4:20pm'}
                onChange={(event: React.ChangeEvent) =>
                  setTime((event.target as HTMLInputElement).value)
                }
                type="time"
                value={time}
              />
            </div>
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
            Price
          </Text>
          <Text
            as={'p'}
            style={{
              fontWeight: 500,
              lineHeight: 1.3,
              marginBottom: '1.5rem',
            }}
          >
            How much does the listing cost.
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
              name="price"
              placeholder={price ? price : '$250'}
              inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
              onChange={(event: React.ChangeEvent) =>
                setPrice((event.target as HTMLInputElement).value)
              }
              value={price}
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
            Instructors
          </Text>
          <Text
            as={'p'}
            style={{
              fontWeight: 500,
              lineHeight: 1.3,
              marginBottom: '1.5rem',
            }}
          >
            Choose the instructors who are going to lead the course.
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
              name="instructors"
              inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
              placeholder={instructors ? instructors : 'George Washington'}
              onChange={(event: React.ChangeEvent) =>
                setInstructors((event.target as HTMLInputElement).value)
              }
              value={instructors}
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
            Skill Level
          </Text>
          <Text
            as={'p'}
            style={{
              fontWeight: 500,
              lineHeight: 1.3,
              marginBottom: '1.5rem',
            }}
          >
            Who is this listing intended for?
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
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2.5rem',
              width: '100%',
            }}
          >
            {SKILL_LEVELS.map((level, i) => (
              <TypeBlock
                key={'skill_level_' + i}
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
                inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
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
          <Text
            as={'h6'}
            size={'6'}
            style={{
              fontWeight: 700,
              marginBottom: '0.125rem',
            }}
          >
            Attendance
          </Text>
          <Text
            as={'p'}
            style={{
              fontWeight: 500,
              lineHeight: 1.3,
              marginBottom: '1.5rem',
            }}
          >
            How many people can attend the course and what is the minimum
            required to begin.
          </Text>
        </div>
        <div style={{ padding: '1rem 0', width: '100%' }}>
          <form
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
                inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
                placeholder={maxCount ? maxCount : '24'}
                onChange={(event: React.ChangeEvent) =>
                  setMaxCount((event.target as HTMLInputElement).value)
                }
                type="number"
                value={maxCount}
              />
              <Input
                name="minimum"
                label="Minimum required"
                inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
                placeholder={minCount ? minCount : '2'}
                onChange={(event: React.ChangeEvent) =>
                  setMinCount((event.target as HTMLInputElement).value)
                }
                type="number"
                value={minCount}
              />
            </div>
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
            Equipment
          </Text>
          <Text
            as={'p'}
            style={{
              fontWeight: 500,
              lineHeight: 1.3,
              marginBottom: '1.5rem',
            }}
          >
            What equipment should a student have when attending the course.
          </Text>
        </div>
        <div style={{ padding: '1rem 0', width: '100%' }}>
          <form
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
              textAreaStyles={{ pointerEvents: edit ? 'all' : 'none' }}
              onChange={(event: React.ChangeEvent) =>
                setEquipment((event.target as HTMLInputElement).value)
              }
              value={equipment}
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
            Requirements
          </Text>
          <Text
            as={'p'}
            style={{
              fontWeight: 500,
              lineHeight: 1.3,
              marginBottom: '1.5rem',
            }}
          >
            What is required to register for this listing.
          </Text>
        </div>
        <div style={{ padding: '1rem 0', width: '100%' }}>
          <form
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
              textAreaStyles={{ pointerEvents: edit ? 'all' : 'none' }}
              onChange={(event: React.ChangeEvent) =>
                setRequirements((event.target as HTMLInputElement).value)
              }
              value={requirements}
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
            Restrictions
          </Text>
          <Text
            as={'p'}
            style={{
              fontWeight: 500,
              lineHeight: 1.3,
              marginBottom: '1.5rem',
            }}
          >
            Are there any restrictions to register for this listing.
          </Text>
        </div>
        <div style={{ padding: '1rem 0', width: '100%' }}>
          <form
            onSubmit={submit}
            style={{
              display: 'grid',
              gap: '2.5rem',
              width: '100%',
            }}
          >
            <TextArea
              name="restrictions"
              placeholder={restrictions ? restrictions : 'Rifles only'}
              textAreaStyles={{ pointerEvents: edit ? 'all' : 'none' }}
              onChange={(event: React.ChangeEvent) =>
                setRestrictions((event.target as HTMLInputElement).value)
              }
              value={restrictions}
            />
          </form>
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
          Save Listing
        </Button>
      </div>
    </>
  );
};

export default EditListing;
