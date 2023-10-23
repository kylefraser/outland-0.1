import { Container, Flex, Logo, Section, Text } from '../../components';
import { Link } from 'react-router-dom';

interface NotFoundProps {
  token?: string | number | null;
  setToken: React.Dispatch<React.SetStateAction<string | number | null>>;
}

const NotFound = ({ token, setToken }: NotFoundProps) => {
  return (
    <Container>
      <Section size={'3'}>
        <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          style={{ minHeight: '50vh' }}
        >
          <Text
            size={'3'}
            style={{
              marginBottom: '2rem',
              maxWidth: '20vw',
              textAlign: 'center',
            }}
          >
            “How little do my countrymen know what precious blessings they are
            in possession of, and which no other people on Earth enjoy!”
          </Text>
          <Logo size={'3'} />
          <Text as="h1" size="404" style={{ margin: '3rem 0' }}>
            404
          </Text>
          <Link
            to="/"
            style={{
              color: '#9BB579',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Return Home
          </Link>
        </Flex>
      </Section>
    </Container>
  );
};

export default NotFound;
