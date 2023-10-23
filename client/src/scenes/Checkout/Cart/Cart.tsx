import { Container, TopBar } from '../../../components';

interface CartProps {
  searchedLocation: any;
  setSearchedLocation: React.Dispatch<React.SetStateAction<any | null>>;
  setError: any;
  setToken: React.Dispatch<React.SetStateAction<string | number | null>>;
  token?: string | number | null;
}

const Cart = ({
  setSearchedLocation,
  searchedLocation,
  setToken,
  token,
}: CartProps) => {
  return (
    <>
      <Container size="lg" style={{ paddingTop: '2rem' }}>
        <h2>Cart</h2>
      </Container>
    </>
  );
};

export default Cart;
