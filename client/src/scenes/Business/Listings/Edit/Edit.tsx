import { useQuery, useLazyQuery } from '@apollo/client';
import { FIND_LISTING_BY_ID } from '../../../../queries';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Footer,
  ListingEditForm,
  TopBar,
} from '../../../../components';
import { useEffect } from 'react';
import { EditListing } from '../../../EditListing';

interface BusinessListingEditProps {
  notify?: any;
  listings?: any;
  searchedLocation: any;
  setListings?: React.Dispatch<React.SetStateAction<any | null>>;
  setSearchedLocation: React.Dispatch<React.SetStateAction<any | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | number | null>>;
  token: string | number | null;
}

const BusinessListingEdit = ({ setToken, token }: BusinessListingEditProps) => {
  const location = useLocation();
  let data: any = location.state;
  let listing: any;
  const userListingMatch = location.pathname.split('/').pop();
  const [findListingById, result] = useLazyQuery(FIND_LISTING_BY_ID);

  // const { data, loading } = useQuery(FIND_LISTING_BY_ID, {
  //   variables: { searchIdValue: userListingMatch },
  // });
  console.log('data', data);
  useEffect(() => {
    if (!data) {
      findListingById({ variables: { searchIdValue: userListingMatch } });
    }
  }, []);

  return <EditListing listing={data} token={token} />;
};

export default BusinessListingEdit;
