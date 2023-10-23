import { Container, Section } from '../../../../components';
import { AddListing } from '../../../AddListing';

interface UserAddListingProps {
  setError: any;
  setToken: React.Dispatch<React.SetStateAction<string | number | null>>;
  searchedLocation: any;
  setSearchedLocation: React.Dispatch<React.SetStateAction<any | null>>;
  token?: string | number | null;
}

const UserAddListing = ({
  searchedLocation,
  setSearchedLocation,
  setError,
  setToken,
  token,
}: UserAddListingProps) => {
  return (
    <>
      <Container>
        <Section size={'3'}>
          <AddListing
            token={token}
            setError={setError}
            searchedLocation={searchedLocation}
            setSearchedLocation={setSearchedLocation}
            setToken={setToken}
          />
        </Section>
      </Container>
    </>
  );
};

export default UserAddListing;
