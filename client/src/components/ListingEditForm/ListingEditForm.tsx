import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_LISTING } from '../../queries';
import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { Button } from '../Button';

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

interface ListingEditFormProps {
  setError?: any;
}

const ListingEditForm = (
  listing: Listing | any,
  { setError }: ListingEditFormProps
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

  const [changeListing, result] = useMutation(EDIT_LISTING);

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
      time
    );

    setEdit(false);
  };

  const editButton = () => {
    setEdit(true);
  };

  return (
    <div>
      <h2>change listing</h2>
      <button onClick={editButton}>Edit</button>
      <form
        onSubmit={submit}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
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
          hint="The name of the course"
          value={name}
          inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
        />
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
          hint="A brief description of what to expect at the course"
          value={description}
          textAreaProps={{ pointerEvents: edit ? 'all' : 'none' }}
        />
        <Input
          name="address"
          label="Address"
          placeholder={
            address ? address : '1776 Freedom Way, Mount Vernon, Virginia'
          }
          onChange={(event: React.ChangeEvent) =>
            setAddress((event.target as HTMLInputElement).value)
          }
          hint="The course location"
          value={address}
          inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
        />
        <Input
          name="city"
          label="City"
          placeholder={city ? city : 'Mount Vernon'}
          onChange={(event: React.ChangeEvent) =>
            setCity((event.target as HTMLInputElement).value)
          }
          hint="The course city"
          value={city}
          inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
        />
        <Input
          name="state"
          label="State"
          placeholder={state ? state : 'Virginia'}
          onChange={(event: React.ChangeEvent) =>
            setState((event.target as HTMLInputElement).value)
          }
          hint="The course state"
          value={state}
          inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
        />
        <Input
          name="instructors"
          label="Instructors"
          placeholder={instructors ? instructors : 'George Washington'}
          onChange={(event: React.ChangeEvent) =>
            setInstructors((event.target as HTMLInputElement).value)
          }
          hint="Who is leading the course"
          value={instructors}
          inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
        />
        <Input
          name="available"
          label="Available Slots"
          placeholder={maxCount ? maxCount : '24'}
          onChange={(event: React.ChangeEvent) =>
            setMaxCount((event.target as HTMLInputElement).value)
          }
          hint="How many people may attend"
          value={maxCount}
          inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
        />
        <Input
          name="minimum"
          label="Minimum required"
          placeholder={minCount ? minCount : '2'}
          onChange={(event: React.ChangeEvent) =>
            setMinCount((event.target as HTMLInputElement).value)
          }
          hint="Number of people needed to start the course"
          value={minCount}
          inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
        />
        <Input
          name="equipment"
          label="Equipment Available"
          placeholder={equipment ? equipment : 'Kentucky Longrifle'}
          onChange={(event: React.ChangeEvent) =>
            setEquipment((event.target as HTMLInputElement).value)
          }
          hint="List of equipment available to attendees"
          value={equipment}
          inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
        />
        <Input
          name="requirements"
          label="Requirements"
          placeholder={requirements ? requirements : '18 years old'}
          onChange={(event: React.ChangeEvent) =>
            setRequirements((event.target as HTMLInputElement).value)
          }
          hint="Requirements in order to attend"
          value={requirements}
          inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
        />
        <Input
          name="restrictions"
          label="Restrictions"
          placeholder={restrictions ? restrictions : 'Rifles only'}
          onChange={(event: React.ChangeEvent) =>
            setRestrictions((event.target as HTMLInputElement).value)
          }
          hint="Any restrictions for attending"
          value={restrictions}
          inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
        />
        <div>
          duration{' '}
          <input
            name="duration"
            value={duration}
            style={{ pointerEvents: edit ? 'all' : 'none' }}
            onChange={(event: React.ChangeEvent) =>
              setDuration((event.target as HTMLInputElement).value)
            }
          />
        </div>
        <div>
          courseType{' '}
          <input
            name="course_type"
            value={courseType}
            style={{ pointerEvents: edit ? 'all' : 'none' }}
            onChange={(event: React.ChangeEvent) =>
              setCourseType((event.target as HTMLInputElement).value)
            }
          />
        </div>
        <div>
          skillLevel{' '}
          <input
            name="skill"
            value={skillLevel}
            style={{ pointerEvents: edit ? 'all' : 'none' }}
            onChange={(event: React.ChangeEvent) =>
              setSkillLevel((event.target as HTMLInputElement).value)
            }
          />
        </div>
        <div>
          rating{' '}
          <input
            name="rating"
            value={rating}
            style={{ pointerEvents: edit ? 'all' : 'none' }}
            onChange={(event: React.ChangeEvent) =>
              setRating((event.target as HTMLInputElement).value)
            }
          />
        </div>
        <div>
          price{' '}
          <input
            name="price"
            value={price}
            style={{ pointerEvents: edit ? 'all' : 'none' }}
            onChange={(event: React.ChangeEvent) =>
              setPrice((event.target as HTMLInputElement).value)
            }
          />
        </div>
        <div>
          type{' '}
          <input
            name="type"
            value={type}
            style={{ pointerEvents: edit ? 'all' : 'none' }}
            onChange={(event: React.ChangeEvent) =>
              setType((event.target as HTMLInputElement).value)
            }
          />
        </div>
        <div>
          date{' '}
          <input
            name="date"
            value={date}
            style={{ pointerEvents: edit ? 'all' : 'none' }}
            onChange={(event: React.ChangeEvent) =>
              setDate((event.target as HTMLInputElement).value)
            }
          />
        </div>
        <div>
          time{' '}
          <input
            name="time"
            value={time}
            style={{ pointerEvents: edit ? 'all' : 'none' }}
            onChange={(event: React.ChangeEvent) =>
              setTime((event.target as HTMLInputElement).value)
            }
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            justifySelf: 'end',
          }}
        >
          <Button variant="secondary" outline style={{ marginRight: '2rem' }}>
            Clear
          </Button>
          <Button type="submit" outline>
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ListingEditForm;
