import { SetStateAction } from 'react';
import { Container, Footer, ListingForm, TopBar } from '../../../../components';
import { useQuery } from '@apollo/client';

interface BusinessAddListingProps {
  setError: any;
  searchedLocation: any;
  setSearchedLocation: React.Dispatch<React.SetStateAction<any | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | number | null>>;
  token?: string | number | null;
}

const BusinessAddListing = ({
  setError,
  setToken,
  token,
}: BusinessAddListingProps) => {
  return (
    <>
      <ListingForm
        setError={setError}
        searchedLocation={undefined}
        setSearchedLocation={function (value: any): void {
          throw new Error('Function not implemented.');
        }}
        setToken={setToken}
        token={token}
      />
    </>
  );
};

export default BusinessAddListing;
