import { useEffect } from 'react';
import { GET_LOCATION } from '../../queries';
import { useLazyQuery } from '@apollo/client';
import { styled } from '../../../stitches.config';

interface SearchProps {
  inputRef: any;
  setSearchedLocation: any;
  searchedLocation: string | number | null;
  setLocation: any;
}

const Search = ({
  inputRef,
  setSearchedLocation,
  searchedLocation,
  setLocation,
  ...props
}: SearchProps) => {
  const [getLocation, result] = useLazyQuery(GET_LOCATION);

  function handleInputChange(event: React.ChangeEvent) {
    getLocation({
      variables: { searchValue: (event.target as HTMLInputElement).value },
    });
  }

  useEffect(() => {
    if (result.data) {
      setLocation(result.data.getLocation);
    }
    console.log('search result useeffect');
  }, [result]);

  return (
    <Input
      name="search"
      onChange={handleInputChange}
      type="text"
      ref={inputRef}
      {...props}
      placeholder="Into the wild..."
      autoComplete="off"
    />
  );
};

const Input = styled('input', {
  background: 'transparent',
  border: 'none',
  color: '$olive5',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '1rem',
  fontWeight: 500,
  padding: 0,
  '&:focus': {
    outline: 'none',
  },
  '&::placeholder': {
    color: '$olive5',
  },
});

export default Search;
