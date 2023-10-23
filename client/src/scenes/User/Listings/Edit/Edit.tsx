import { useLazyQuery } from '@apollo/client';
import { FIND_LISTING_BY_ID } from '../../../../queries';
import { useLocation } from 'react-router-dom';
import { Container, Section } from '../../../../components';
import { useEffect } from 'react';
import { EditListing } from '../../../EditListing';

interface UserEditListingProps {
  notify?: any;
  listings?: any;
  searchedLocation: any;
  setListings?: React.Dispatch<React.SetStateAction<any | null>>;
  setSearchedLocation: React.Dispatch<React.SetStateAction<any | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | number | null>>;
  token: string | number | null;
}

const UserEditListing = ({ setToken, token }: UserEditListingProps) => {
  const location = useLocation();
  let data: any = location.state;
  let listing: any;
  const userListingMatch = location.pathname.split('/').pop();
  const [findListingById, result] = useLazyQuery(FIND_LISTING_BY_ID);

  // const { data, loading } = useQuery(FIND_LISTING_BY_ID, {
  //   variables: { searchIdValue: userListingMatch },
  // });

  useEffect(() => {
    if (!data) {
      findListingById({ variables: { searchIdValue: userListingMatch } });
    }
  }, []);

  // if (result.data) {
  //   listing = result.data.findListingById;
  // }

  return (
    <Container>
      <Section size={'3'}>
        <EditListing listing={data} token={token} />
      </Section>
    </Container>
  );
};

export default UserEditListing;
