import { useSearchParams } from 'react-router-dom';
import { TopBar, Container, Footer } from '../../../components';

interface SuccessProps {
  searchedLocation: any;
  setSearchedLocation: React.Dispatch<React.SetStateAction<any | null>>;
  setError?: any;
  setToken: React.Dispatch<React.SetStateAction<string | number | null>>;
  token?: string | number | null;
}

const Success = ({
  setSearchedLocation,
  searchedLocation,
  setToken,
  token,
}: SuccessProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  if (searchParams.get('redirect_status') === 'succeeded') {
    localStorage.setItem('outland-checkout-intent', '');
  }

  return (
    <>
      <Container size="sm" style={{ paddingTop: '2rem' }}>
        <h2
          style={{
            fontSize: '4rem',
            color: '#9BB579',
            fontWeight: 700,
            fontFamily: "'Outfit', sans-serif",
            marginBottom: '1rem',
          }}
        >
          Success
        </h2>
      </Container>
    </>
  );
};

export default Success;
